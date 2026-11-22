# Scheda Alberto

App di allenamento installabile sul telefono (web app con icona): mostra a che giorno e settimana si è arrivati, l'esercizio da fare con la figura, le serie da spuntare, il recupero con timer e la progressione mese per mese della scheda del trainer.

- `index.html`: l'app (tutta la scheda e le figure sono dentro)
- `manifest.webmanifest`, `icons/`: nome e icona per l'installazione
- `sw.js`: la fa funzionare anche senza rete
- `tests/collaudo.js` + `.github/workflows/collaudo.yml`: collaudo automatico a ogni caricamento

I progressi restano sul telefono di chi la usa (pulsante "Copia backup" per spostarli).
