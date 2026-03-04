# Roman Calendar (Calendario Romano)

Un'applicazione web interattiva costruita con **Next.js** e **Tailwind CSS** che permette di esplorare le date secondo il sistema dell'antico Calendario Romano.

## 🌟 Funzionalità

- **Conversione Date:** Visualizza il giorno corrente e qualsiasi data selezionata nel formato romano classico (Calende, None, Idi, e giorni prima di questi traguardi).
- **Sistema di Numerazione:** I giorni e gli anni sono presentati utilizzando i Numeri Romani storicamente accurati.
- **Calcolo Anno AUC:** Mostra parallelamente l'anno *Ab Urbe Condita* (dalla fondazione di Roma, fissata convenzionalmente al 753 a.C.).
- **Esplorazione Dinamica:**
  - Navigazione mensile tramite selettore drop-down o frecce direzionali.
  - Navigazione annuale con limite storico imposto tra il **1900 AD** e il **2100 AD** per evitare disallineamenti di sistema.
- **Festività Romane (Feriae):** Evidenzia e descrive i numerosi giorni di festa pubblici dell'antica Roma incrociandoli con il calendario moderno (es. *Saturnalia, Lupercalia, Agonalia*).
- **Dettaglio Giorno:** Cliccando su qualsiasi cella del calendario, si apre un modal che espande i dettagli della data in latino, evidenziando se è associata a una festività.

## 🛠️ Tecnologie Utilizzate

- **Framework:** Next.js (App Router)
- **UI/Styling:** React, Tailwind CSS
- **Icone:** Lucide React
- **Logica Core:** Modulo custom per calcoli su base Giuliana/Gregoriana in formato Romano pre-riforma completa.

## 📂 Struttura del Progetto

```text
src/
├── app/
│   └── page.js               # Main Entry Point & Layout state-manager
├── components/
│   ├── Header.js             # Gestione anno/mese e controlli calendario
│   ├── CalendarGrid.js       # Griglia responsiva dei giorni
│   ├── DayCell.js            # Singola cella interattiva con logica festività
│   └── DayDetailModal.js     # Finestra modale con dettagli approfonditi
└── lib/
    ├── roman-utils.js        # Libreria interna per conversioni latine/romane
    └── festivals.json        # Database esteso e centralizzato delle festività
```

## 🚀 Getting Started

Per eseguire questo progetto localmente:

1. **Clona la repository**
2. **Installa le dipendenze:**
   ```bash
   npm install
   ```
3. **Avvia il server di sviluppo:**
   ```bash
   npm run dev
   ```
4. Apri [http://localhost:3000](http://localhost:3000) nel tuo browser per visualizzare il risultato.

---

> Dies fasti et nefasti in calendario Iuliano.
