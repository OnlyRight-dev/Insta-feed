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

La cartella `images/` contiene le immagini dei post. Ogni post può avere una cartella dedicata:
- `images/01-post/` - immagini per il post 01
- `images/02-post/` - immagini per il post 02
- ecc.

**Formato nomi file supportati:**
- `1Post.png`, `1post.png`, `1.png`
- `1Post.jpg`, `1post.jpg`, `1.jpg`
- `1Post.jpeg`, `1post.jpeg`, `1.jpeg`
- E così via per i numeri da 1 a 20

**Come funziona:**
1. Il sistema cerca automaticamente immagini nella cartella `images/XX-post/`
2. Se trova immagini, le usa come sfondo del div del post
3. Se trova più immagini, crea un carosello automatico
4. Se non trova immagini, carica il contenuto HTML dal file `posts/XX-post.html`

## Note Importanti

### Server Locale (OBBLIGATORIO per le immagini)
⚠️ **IMPORTANTE:** Se apri il file `index.html` direttamente nel browser (file://), le immagini **NON si caricheranno** a causa delle restrizioni CORS del browser.

**Soluzione: Usa un server HTTP locale**

1. **Metodo più semplice - Script automatico:**
   - **Windows:** Doppio click su `start-server.bat` (o esegui `start-server.ps1` in PowerShell)
   - Il server si avvierà su `http://localhost:8000`
   - Apri il browser e vai su `http://localhost:8000/index.html`

2. **Metodo manuale:**
   - Apri il terminale nella cartella del progetto
   - Esegui: `python -m http.server 8000`
   - Apri il browser su `http://localhost:8000/index.html`

3. **Con VS Code:**
   - Installa l'estensione "Live Server"
   - Click destro su `index.html` → "Open with Live Server"

**Per fermare il server:** Premi `CTRL+C` nel terminale

### Caricamento Immagini
Il sistema carica automaticamente le immagini dai post se esistono nella cartella `images/`:
- Struttura: `images/01-post/1Post.png`, `images/02-post/2Post.png`, ecc.
- Se trova immagini per un post, le usa come sfondo del div
- Se non trova immagini, carica il contenuto HTML del post
- Pattern supportati: `1Post.png`, `1post.png`, `1.png`, `1Post.jpg`, ecc.

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

