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
Mha {strict:false} kan man använda `npm run build`.

### python -m http.server

Lackmustest för att visa att server ej används. Fungerar ej ännu.

### Till dig som vill läsa yaml med tabbar.

YAML tillåter inte tabbar för indentering.  
Här är ett hack som tillåter det.  
Tillåter dessutom mellanslag. Men blanda inte i samma fil.

* npm install -D @modyfi/vite-plugin-yaml
* Redigera `node_modules/@modyfi/vite-plugin-yaml/dist/index.js`
* Kodraden nedan byter ut alla tabbar mot mellanslag, hehe.

Gammal kod:
```c
8	async transform(code, id) {
9		if (yamlExtension.test(id)) {
```
Ny kod:
```c
8	async transform(code, id) {
+		code = code.replaceAll('\t',' ')
9		if (yamlExtension.test(id)) {
```
