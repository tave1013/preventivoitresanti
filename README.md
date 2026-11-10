# Preventivo Trattoria I Tre Santi 2026

Pagina di preventivo interattiva (Next.js) per Trattoria I Tre Santi:
Servizio 1, Avvio Online (€ 600 + IVA, una tantum) e Servizio 2, All in One (€ 500 + IVA al mese, contratto di 6 mesi).
Preventivo emesso il 09/11/2026, valido fino al 16/11/2026.

## Avvio in locale

```bash
npm install
npm run dev
```

Poi apri http://localhost:3000 nel browser.

## Dove modificare i contenuti

Tutto è in **`app/data.js`**:

- `cliente`, `fornitore`, `contatto`: dati del cliente, di Tavella Distribuzione e numero WhatsApp
- `date`: data di emissione e scadenza (la pagina mostra il conto alla rovescia e, dopo la scadenza, "Preventivo scaduto")
- `intro`: testo iniziale e i 3 step
- `plans`: i due servizi (prezzo, prezzo pieno barrato, servizi divisi per area)
- `investimento`: trasferte, risparmio e testo dello sconto
- `nonIncluso`, `noteFinali`: non incluso e note
- `condizioni`: le 18 condizioni contrattuali
- `accettazione`: testo di accettazione e ringraziamento

La grafica è in `app/page.jsx`.

## Caricarlo su GitHub

```bash
git init
git add .
git commit -m "Preventivo Trattoria I Tre Santi 2026"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/preventivo-tre-santi-2026.git
git push -u origin main
```

(prima crea il repository vuoto `preventivo-tre-santi-2026` su github.com)

## Pubblicarlo online

Su [vercel.com](https://vercel.com) fai "Add New Project", scegli il repository da GitHub e premi Deploy.
