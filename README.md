# Mana - L'Oracolo 🌙

Gioco "Indovina Chi" in stile Art Nouveau / tarocchi, con Mana, la giovane oracolo apprendista che parla con Isabel attraverso le sue visioni nel cristallo. Pensato per Isabel (8-10 anni).

## 🌙 Chi è Mana?

Mana è una giovane maga apprendista — capelli scuri, mantello viola con cappuccio orlato d'oro, palla di cristallo tra le mani. Vive nelle pagine del gioco: ti guarda con gli occhi che ti seguono, ammicca, sorride quando indovina, è triste quando perde, dorme se la lasci da sola troppo a lungo.

## 🎮 Come si gioca

### Modalità 1 — Mana indovina
Isabel pensa a un personaggio (reale, fittizio, umano, animale o creatura inventata, da film/cartoni/videogiochi). Mana fa domande chiuse a cui Isabel risponde con: Sì / No / Forse sì / Forse no / Non lo so. Quando Mana crede di sapere chi è, tenta di indovinare. Se finisce le 20 domande (configurabili) senza azzeccarci, **Isabel vince**! 🏆

### Modalità 2 — Isabel indovina
Mana sceglie segretamente un personaggio adatto a un'età 8-10 anni. Isabel scrive domande libere e Mana risponde con Sì / No / Forse sì / Forse no / Non lo so, talvolta accompagnata da una frase mistica in carattere. Quando Isabel pensa di avere capito chi è, può tentare di indovinare scrivendo il nome.

## 📁 Contenuto del pacchetto

```
index.html          → il gioco (file principale)
manifest.json       → manifest PWA per installazione
sw.js               → service worker
icon.png            → icona dell'app (512x512, luna crescente)
apple-touch-icon.png → icona per iOS (180x180)
README.md           → questo file
```

## 🚀 Deploy su Vercel (consigliato, gratis, 2 minuti)

1. Vai su https://vercel.com e accedi (puoi usare GitHub o email)
2. Clicca **"Add New" → "Project"**
3. Scegli **"Browse"** e carica TUTTI i file del pacchetto (anche le icone!)
4. Lascia tutte le impostazioni di default e clicca **"Deploy"**
5. Dopo ~30 secondi ricevi un URL tipo `https://mana-xxx.vercel.app`

**Alternativa drag & drop:** vai su https://app.netlify.com/drop e trascina la cartella con tutti i file. Più veloce, hosting gratuito.

## 📱 Setup sull'iPad di Isabel

### Passo 1 — Sblocca l'URL in "Tempo di Utilizzo"
1. **Impostazioni → Tempo di Utilizzo → Restrizioni Contenuti e Privacy → Restrizioni Contenuti → Contenuto Web**
2. Se è impostato su "Limita siti web per adulti", aggiungi l'URL del gioco in **"Consenti sempre questi siti"**
3. Se è su "Solo siti web consentiti", aggiungi lì l'URL

### Passo 2 — Installa come app sulla home
1. Apri Safari su iPad e vai all'URL del gioco
2. Tocca il pulsante **Condividi** (quadrato con freccia in alto)
3. Scorri e tocca **"Aggiungi alla schermata Home"**
4. Conferma → l'icona di Mana (luna crescente dorata) appare sulla home
5. Da quel momento, Isabel può aprirla **come un'app normale**, anche se Safari resta bloccato

### Passo 3 — Configura l'API key
1. Apri l'app, tocca **Il Grimorio** (le impostazioni)
2. Incolla la tua API key di Anthropic (formato `sk-ant-...`)
   - Per ottenerla: https://console.anthropic.com/ → Account Settings → API Keys
3. Tocca **Salva**

L'API key è salvata **solo localmente** sull'iPad (in `localStorage`). Non viene inviata a nessuno tranne all'API di Anthropic stessa.

## 🛠️ Configurazione

Tutto dal **Grimorio** dentro l'app:
- **Chiave dell'Oracolo (API Key)** — necessaria per giocare
- **Numero di Domande** — default 20, va da 5 a 50
- **Lingua** — Italiano / Inglese
- **Azzera Cronache** — resetta le statistiche

## 💸 Costi

L'API di Anthropic ha un costo a uso. Una partita tipica con Claude Opus 4.5 costa pochi centesimi. Suggerimento: aggiungi un limite di spesa nel tuo account Anthropic dalla console.

## 🧠 Come funziona dentro

### Modalità 1 (Mana indovina)
Ad ogni turno il gioco invia all'API di Claude:
- **System prompt**: regole del gioco, personalità di Mana, strategia, formato output JSON
- **Messaggio utente**: cronologia completa di tutte le domande/risposte
- Claude restituisce un JSON con `{action, text, manaLine, expression}` e il gioco lo mostra

### Modalità 2 (Isabel indovina)
- Al primo turno Mana sceglie un personaggio e lo annuncia in JSON (`{action: "start", character: "..."}`)
- Lo storico della conversazione (con il personaggio "ricordato") viene passato ad ogni chiamata
- Mana risponde con `{action: "answer", answer, manaLine, expression}` per domande normali
- Per i tentativi di indovinare: `{action: "answer", isGuess: true, correct: true/false}`

## 🐛 Risoluzione problemi

**"Errore API. Controlla la chiave"**
- Verifica che la key sia copiata interamente (include `sk-ant-`)
- Controlla che il tuo account Anthropic abbia credito disponibile
- Controlla che il dispositivo abbia connessione internet

**Il service worker dà errore in Safari iOS**
- Normale al primo avvio offline, basta ricaricare con connessione attiva una volta

**L'app si chiude / mostra schermo bianco**
- Tieni premuto sull'icona → Rimuovi app → reinstalla seguendo il Passo 2

**Mana non si muove / animazioni lente**
- Controlla che l'iPad non sia in modalità risparmio energetico (limita le animazioni)

## 📜 Licenza

Personalizzato per Isabel. Modifica e adatta come preferisci.

---

✦ Che le visioni di Mana ti guidino ✦
