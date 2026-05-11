// Vercel Serverless Function - proxy per Anthropic API
// L'API key sta solo qui (variabile d'ambiente), mai nel browser

export default async function handler(req, res) {
  // CORS (per sicurezza limitiamo agli stessi origin in produzione)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  try {
    const body = req.body;

    // Validazione base: il client può solo richiedere certi modelli e parametri
    const allowedModels = ['claude-opus-4-5', 'claude-sonnet-4-5', 'claude-haiku-4-5'];
    const model = allowedModels.includes(body.model) ? body.model : 'claude-opus-4-5';
    const maxTokens = Math.min(parseInt(body.max_tokens) || 1024, 2048);

    if (!body.messages || !Array.isArray(body.messages)) {
      return res.status(400).json({ error: 'Invalid messages' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model,
        max_tokens: maxTokens,
        system: body.system || '',
        messages: body.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Anthropic API error',
        status: response.status,
      });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
