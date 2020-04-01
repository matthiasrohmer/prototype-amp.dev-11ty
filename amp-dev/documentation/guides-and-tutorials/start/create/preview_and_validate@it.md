---
$title: Anteprima e convalida
---

Visualizza l’anteprima della pagina AMP esattamente come faresti con qualsiasi altro sito HTML statico. Non sono necessarie fasi di build o di pre-elaborazione. Puoi scegliere tra:

  - **Aprire la pagina direttamente nel browser dal file system** (è possibile che alcuni elementi non funzionino a causa di un errore XMLHttpRequests).
  - **Usare un server web locale come Apache 2 o Nginx**.
    *(Suggerimento. Per attivare rapidamente un server web esegui il comando `python -m SimpleHTTPServer`.)*

Successivamente assicurati che la pagina AMP **sia effettivamente valida**, in caso contrario non sarà individuata e distribuita da piattaforme di terzi come Ricerca Google. Per la convalida:

  1. Apri la pagina nel tuo browser.
  1. Aggiungi "`#development=1`" all’URL, ad esempio, `http://localhost:8000/released.amp.html#development=1`.
  1. Apri la [Chrome DevTools console](https://developers.google.com/web/tools/chrome-devtools/debug/console/) e verifica se sono presenti errori di convalida.

[Consulta ulteriori informazioni sulla convalida](../../../../documentation/guides-and-tutorials/learn/validation-workflow/validate_amp.md) e scopri cosa fare se vengono rilevati errori.
