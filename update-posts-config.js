// Script Node.js per aggiornare automaticamente posts-config.json
// Esegui con: node update-posts-config.js

const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts');
const configFile = path.join(__dirname, 'posts-config.json');

// Leggi tutti i file nella cartella posts
const files = fs.readdirSync(postsDir)
    .filter(file => file.startsWith('post-') && file.endsWith('.html'))
    .map(file => {
        // Estrai il numero dal nome del file
        const match = file.match(/post-(\d+)\.html/);
        return {
            filename: file,
            number: match ? parseInt(match[1]) : 999
        };
    })
    .sort((a, b) => a.number - b.number) // Ordina per numero
    .map(item => item.filename); // Prendi solo i nomi dei file

// Crea la configurazione
const config = {
    posts: files
};

// Salva il file JSON
fs.writeFileSync(configFile, JSON.stringify(config, null, 4));

console.log(`✅ Configurazione aggiornata!`);
console.log(`📋 Trovati ${files.length} post:`);
files.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
});

