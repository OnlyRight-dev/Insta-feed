# Instagram Feed - OnlyRight

Struttura modulare per il feed Instagram con post separati e ordinamento numerico.

## Struttura del Progetto

```
Instafeed/
├── index.html          # File HTML principale (struttura)
├── styles.css          # File CSS separato con tutti gli stili
├── load-posts.js       # JavaScript per caricare i post dinamicamente
├── images/             # Cartella per le immagini
└── posts/              # Cartella per i file HTML dei post
    ├── post-01.html
    ├── post-02.html
    ├── post-03.html
    └── ...
```

## Come Funziona

### 1. File HTML Principale (`index.html`)
- Contiene solo la struttura base del feed (header, profilo, tabs)
- Il feed viene popolato dinamicamente tramite JavaScript
- Linka il file CSS esterno `styles.css`

### 2. File CSS Separato (`styles.css`)
- Contiene tutti gli stili del feed
- Facilmente modificabile senza toccare l'HTML

### 3. File JavaScript (`load-posts.js`)
- **Prima** cerca il file `posts-config.json` e usa l'ordine specificato lì
- **Se non trova il JSON**, carica automaticamente tutti i file `post-XX.html` dalla cartella `posts/`
- Ordina i post per numero nel nome del file (01, 02, 03...)
- Inserisce i post nel feed nell'ordine corretto

### 4. File Post (`posts/post-XX.html`)
- Ogni post è un file HTML separato
- Il numero nel nome del file determina l'ordine nel feed
- Formato: `post-01.html`, `post-02.html`, `post-03.html`, ecc.

### 5. File di Configurazione (`posts-config.json`) - Opzionale
- Se esiste, definisce l'ordine esatto dei post
- Ha **priorità** sui numeri nei nomi dei file
- Puoi modificarlo manualmente per cambiare l'ordine senza rinominare i file

## Come Modificare l'Ordine dei Post

### Metodo 1: Rinominare i File (Consigliato)
Per cambiare l'ordine dei post nel feed, basta rinominare i file:

**Esempio:**
- Se vuoi che `post-05.html` appaia per primo, rinominalo in `post-01.html`
- E rinomina l'attuale `post-01.html` in `post-05.html` (o un altro numero)

**Importante:** 
- Usa sempre il formato a 2 cifre (01, 02, 03...) per mantenere l'ordinamento corretto
- Dopo aver rinominato, **ricarica la pagina** (F5 o Ctrl+R)
- Se non funziona, prova a fare **Hard Refresh** (Ctrl+Shift+R o Ctrl+F5)

### Metodo 2: Modificare il File di Configurazione
Puoi anche modificare direttamente il file `posts-config.json` per cambiare l'ordine:

```json
{
    "posts": [
        "post-09.html",  // Questo sarà il primo
        "post-01.html",  // Questo sarà il secondo
        "post-02.html",
        ...
    ]
}
```

**Nota:** Se modifichi il JSON, l'ordine nel JSON ha la priorità sui numeri nei nomi dei file.

## Come Aggiungere un Nuovo Post

1. Crea un nuovo file nella cartella `posts/`
2. Usa il formato: `post-XX.html` (dove XX è il numero a 2 cifre)
3. Il contenuto del file deve essere un `<div class="feed-item">` con il contenuto del post
4. Il post apparirà automaticamente nel feed nell'ordine corretto

## Esempi di Post

### Post Speciale (con telefono)
Usa la classe `special-post` per il primo post con il mockup del telefono.

### Post Citazione
Usa la classe `quote-post` per post con citazioni.

### Post Informativo
Usa la classe `info-post` per post con informazioni e icone.

### Post CTA (Call to Action)
Usa la classe `cta-post` per post con pulsanti di azione.

## Cartella Immagini

La cartella `images/` è pronta per contenere tutte le immagini dei post. 
Per usare un'immagine in un post, usa:
```html
<img src="images/nome-immagine.jpg" alt="Descrizione">
```

## Note Importanti

### Server Locale (Consigliato)
⚠️ **IMPORTANTE:** Se apri il file `index.html` direttamente nel browser (file://), potrebbe non funzionare a causa delle restrizioni di sicurezza del browser.

**Soluzioni:**
1. **Usa un server locale** (consigliato):
   - Se usi VS Code, installa l'estensione "Live Server"
   - Oppure usa Python: `python -m http.server 8000`
   - Oppure usa Node.js: `npx http-server`

2. **Hard Refresh dopo modifiche:**
   - Premi `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)
   - Oppure `Ctrl+F5` per forzare il ricaricamento senza cache

### Funzionamento
- I post vengono caricati in ordine numerico crescente (01, 02, 03...)
- Il sistema cerca automaticamente i file da `post-01.html` a `post-50.html`
- Se un file non esiste, viene semplicemente saltato
- Se esiste `posts-config.json`, viene usato quello per l'ordine (ha priorità)
- Per modificare il numero massimo di post, modifica la variabile `maxPosts` in `load-posts.js`

### Debug
Se i post non si caricano:
1. Apri la console del browser (F12)
2. Controlla i messaggi di errore
3. Verifica che i file esistano nella cartella `posts/`
4. Prova a chiamare `reloadPosts()` nella console per forzare il ricaricamento

