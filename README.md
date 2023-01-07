### href vs goto vs link

* href är segt och tömmer store. BIG NO NO!
* goto är skonsamt och store töms ej
* `<a>` är skonsamt och tömmer ej store
* Back fungerar, stör inte store.

goto är bäst. page innehåller det som behövs.  
params, slug, stack och path onödiga.

Se src\routes\[...slug]\+page.svelte

### Zipning av bilder.json

Minskar från 4.6M till 1.6M, 3.0M  
Ej genomfört.

### Problem

`npm run build` skapar inte någon index.html  
Mha {strict:false} kan man använda `npm run build`, med måste visa med `npm run preview`.

### python -m http.server

Lackmustest för att visa att server ej används. Fungerar ej ännu.


