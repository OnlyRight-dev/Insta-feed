// Funzione per verificare se esistono immagini per un post (usa Image loading invece di fetch)
async function checkPostImages(postNumber) {
    try {
        const postNumberStr = postNumber.toString().padStart(2, '0');
        const imagesDirectory = `images/${postNumberStr}-post/`;
        const foundImages = [];
        
        console.log(`🔍 [Post ${postNumber}] Cercando immagini in: ${imagesDirectory}`);
        
        // Funzione per testare se un'immagine esiste usando Image loading (con timeout veloce)
        const testImageExists = (imagePath) => {
            return new Promise((resolve) => {
                const img = new Image();
                let resolved = false;
                
                // Timeout velocissimo: se non carica in 20ms, considera non trovata
                const timeout = setTimeout(() => {
                    if (!resolved) {
                        resolved = true;
                        resolve(false);
                    }
                }, 20);
                
                img.onload = () => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeout);
                        console.log(`  ✅ IMMAGINE TROVATA: ${imagePath}`);
                        resolve(true);
                    }
                };
                img.onerror = () => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeout);
                        resolve(false);
                    }
                };
                // Imposta il path e inizia il caricamento
                img.src = imagePath;
            });
        };
        
        // Cerca IMMEDIATAMENTE solo 1Post.png (pattern più comune - 99% dei casi)
        // Controlla solo i primi 5 numeri in parallelo per velocità MASSIMA
        const imageChecks = [];
        for (let num = 1; num <= 5; num++) {
            const imagePath = `${imagesDirectory}${num}Post.png`;
            imageChecks.push(
                testImageExists(imagePath).then(exists => ({ exists, path: imagePath, num }))
            );
        }
        
        // Esegui tutti i controlli in parallelo (velocissimo)
        const results = await Promise.all(imageChecks);
        
        // Aggiungi solo le immagini trovate, ordinate per numero
        for (const result of results) {
            if (result.exists) {
                foundImages.push(result.path);
            }
        }
        
        // Ordina per numero
        foundImages.sort((a, b) => {
            const numA = parseInt(a.match(/(\d+)/)?.[1] || '999');
            const numB = parseInt(b.match(/(\d+)/)?.[1] || '999');
            return numA - numB;
        });
        
        // Ordina per numero
        foundImages.sort((a, b) => {
            const numA = parseInt(a.match(/(\d+)[^\/]*\.(jpg|jpeg|png|gif|webp)/i)?.[1] || '999');
            const numB = parseInt(b.match(/(\d+)[^\/]*\.(jpg|jpeg|png|gif|webp)/i)?.[1] || '999');
            return numA - numB;
        });
        
        if (foundImages.length > 0) {
            console.log(`✅ [Post ${postNumber}] Trovate ${foundImages.length} immagini in ${imagesDirectory}`);
            console.log(`📋 Lista immagini trovate:`, foundImages);
        } else {
            console.log(`❌ [Post ${postNumber}] Nessuna immagine trovata in ${imagesDirectory}`);
        }
        
        return foundImages;
    } catch (error) {
        console.error(`❌ [Post ${postNumber}] Errore checkPostImages:`, error);
        return [];
    }
}

// Funzione per creare un post con immagini come sfondo
function createImagePost(imageUrls, postNumber) {
    if (imageUrls.length === 0) {
        return null;
    }
    
    // Se c'è una sola immagine, crea un post semplice con immagine come sfondo
    if (imageUrls.length === 1) {
        return `
<div class="feed-item image-post" style="background-image: url('${imageUrls[0]}'); background-size: cover; background-position: center;">
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>0</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>0</span>
        </div>
    </div>
</div>`;
    }
    
    // Se ci sono più immagini (2+), crea un carosello con immagini come sfondo
    console.log(`🎠 Creo carosello con ${imageUrls.length} immagini per post ${postNumber}`);
    console.log(`📸 Immagini nel carosello:`, imageUrls);
    
    // Crea esattamente uno slide per ogni immagine trovata
    const slides = imageUrls.map((url, index) => {
        console.log(`  📷 Slide ${index + 1}/${imageUrls.length}: ${url}`);
        return `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${url}'); background-size: cover; background-position: center; position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
            </div>
        `;
    }).join('');
    
    // Crea esattamente un dot per ogni immagine trovata
    const dots = imageUrls.map((_, index) => `
            <span class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `).join('');
    
    console.log(`✅ Creati ${imageUrls.length} slide e ${imageUrls.length} dots per il carosello`);
    
    return `
<div class="feed-item carousel-post image-post">
    <div class="carousel-container">
        <div class="carousel-slides">
            ${slides}
        </div>
        
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
            ${dots}
        </div>
        
        <!-- Navigation Arrows -->
        <button class="carousel-arrow carousel-prev" aria-label="Previous slide">‹</button>
        <button class="carousel-arrow carousel-next" aria-label="Next slide">›</button>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>0</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>0</span>
        </div>
    </div>
</div>`;
}

// Contenuti dei post (fallback quando fetch non funziona)
const postsContent = {
    '01-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            Costruisci relazioni autentiche e durature.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>92</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>18</span>
        </div>
    </div>
</div>`,
    '02-post.html': `<div class="feed-item carousel-post">
    <div class="carousel-container">
        <div class="carousel-slides">
            <!-- Slide 1 -->
            <div class="carousel-slide active">
                <div class="info-post-content">
                    <div class="info-title">COME FUNZIONA?</div>
                    <div class="info-feature">
                        <div class="info-icon">?</div>
                        <div class="info-feature-text">QUIZ DI COMPATIBILITA'</div>
                    </div>
                </div>
            </div>
            
            <!-- Slide 2 -->
            <div class="carousel-slide">
                <div class="info-post-content">
                    <div class="info-title">COME FUNZIONA?</div>
                    <div class="info-feature">
                        <div class="info-icon">👥</div>
                        <div class="info-feature-text">MATCHING INTELLIGENTE</div>
                    </div>
                </div>
            </div>
            
            <!-- Slide 3 -->
            <div class="carousel-slide">
                <div class="info-post-content">
                    <div class="info-title">COME FUNZIONA?</div>
                    <div class="info-feature">
                        <div class="info-icon">💜</div>
                        <div class="info-feature-text">RELAZIONI AUTENTICHE</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
            <span class="carousel-dot active" data-slide="0"></span>
            <span class="carousel-dot" data-slide="1"></span>
            <span class="carousel-dot" data-slide="2"></span>
        </div>
        
        <!-- Navigation Arrows -->
        <button class="carousel-arrow carousel-prev" aria-label="Previous slide">‹</button>
        <button class="carousel-arrow carousel-next" aria-label="Next slide">›</button>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>189</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>52</span>
        </div>
    </div>
</div>`,
    '03-post.html': `<div class="feed-item carousel-post">
    <div class="carousel-container">
        <div class="carousel-slides">
            <!-- Slide 1 -->
            <div class="carousel-slide active">
                <div class="quote-post-content">
                    <div class="quote-text">
                        PER CHI E' STANCO DI INCONTRI VELOCI E VUOLE QUALCOSA DI VERO
                    </div>
                </div>
            </div>
            
            <!-- Slide 2 -->
            <div class="carousel-slide">
                <div class="quote-post-content">
                    <div class="quote-text">
                        RELAZIONI AUTENTICHE<br>BASATE SU VALORI COMUNI
                    </div>
                </div>
            </div>
            
            <!-- Slide 3 -->
            <div class="carousel-slide">
                <div class="quote-post-content">
                    <div class="quote-text">
                        MATCHMAKING INTELLIGENTE<br>PER TROVARE LA PERSONA GIUSTA
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
            <span class="carousel-dot active" data-slide="0"></span>
            <span class="carousel-dot" data-slide="1"></span>
            <span class="carousel-dot" data-slide="2"></span>
        </div>
        
        <!-- Navigation Arrows -->
        <button class="carousel-arrow carousel-prev" aria-label="Previous slide">‹</button>
        <button class="carousel-arrow carousel-next" aria-label="Next slide">›</button>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>234</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>67</span>
        </div>
    </div>
</div>`,
    '04-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            L'amore vero non chiede perfezione, chiede presenza.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>156</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>38</span>
        </div>
    </div>
</div>`,
    '05-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            Non accontentarti di meno di ciò che meriti.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>203</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>44</span>
        </div>
    </div>
</div>`,
    '06-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            La persona giusta non è quella che ti completa, ma quella che ti accetta per come sei.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>267</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>63</span>
        </div>
    </div>
</div>`,
    '07-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            L'amore è un viaggio, non una destinazione.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>145</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>29</span>
        </div>
    </div>
</div>`,
    '08-post.html': `<div class="feed-item quote-post">
    <div class="quote-post-content">
        <div class="quote-text">
            Trova la tua anima gemella con OnlyRight.
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>167</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>41</span>
        </div>
    </div>
</div>`,
    '09-post.html': `<div class="feed-item special-post">
    <div class="special-post-content">
        <div class="special-post-text-top">
            TI AIUTIAMO A<br>TROVARE
        </div>
        <div class="phone-mockup">
            <div class="phone-screen">
                <div class="phone-status-bar">
                    <span>10:35</span>
                    <div class="phone-status-icons">
                        <span>📶</span>
                        <span>🔋</span>
                    </div>
                </div>
                <div class="phone-content">
                    <div class="phone-title">CALCOLO COMPATIBILITA'</div>
                    <button class="phone-button">
                        INIZIA IL QUIZ
                        <span class="phone-button-arrow">↓</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="special-post-text-bottom">
            RELAZIONI<br>AUTENTICHE<br>BASATE SU VALORI COMUNI
        </div>
    </div>
    <div class="feed-overlay">
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.053 2.8-3.303 2.8-.25 0-.79-.557-3.303-2.8C6.652 14.081 4 12.194 4 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"/>
            </svg>
            <span>123</span>
        </div>
        <div class="feed-stat">
            <svg class="feed-stat-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22l-1.344-4.992zM10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm6-10a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <span>45</span>
        </div>
    </div>
</div>`
};

// Funzione per caricare e ordinare i post dinamicamente
async function loadPosts() {
    const feedGrid = document.getElementById('feed-grid');
    if (!feedGrid) {
        console.error('Feed grid non trovato!');
        return;
    }
    
    // Pulisci il feed prima di ricaricare
    feedGrid.innerHTML = '';
    
    let postFiles = [];
    let postNumbers = [];
    
    // Prova prima a caricare la configurazione JSON (solo per l'ordine, non per limitare i post)
    let configOrder = null;
    try {
        const configResponse = await fetch(`posts-config.json?t=${new Date().getTime()}`, {
            cache: 'no-cache'
        });
        
        if (configResponse.ok) {
            const config = await configResponse.json();
            console.log('📋 Configurazione trovata, userò l\'ordine dal JSON se disponibile');
            configOrder = config.posts.map(postFile => {
                const match = postFile.match(/(\d+)-post\.html/);
                return match ? parseInt(match[1]) : null;
            }).filter(num => num !== null);
        }
    } catch (error) {
        console.log('📋 Configurazione non trovata, userò rilevamento dinamico completo');
    }
    
    // SEMPRE fai rilevamento dinamico per trovare TUTTI i post esistenti
    if (!configOrder || configOrder.length === 0) {
        
        // Rilevamento dinamico VELOCE: controlla solo HTML fallback (no fetch lento)
        // In file://, assumiamo che tutti i file esistano fino a un certo limite
        const isFileProtocol = window.location.protocol === 'file:';
        const maxPosts = 50; // Limite massimo
        
        if (isFileProtocol) {
            // In file://, assumiamo che i file esistano (non possiamo verificare con fetch)
            // Controlla solo HTML fallback hardcoded, poi assume che gli altri esistano
            console.log('📋 Rilevamento veloce (file://): controllo HTML fallback, poi assumo che gli altri file esistano');
            
            for (let i = 1; i <= maxPosts; i++) {
                const postNumberStr = i.toString().padStart(2, '0');
                const postFile = `${postNumberStr}-post.html`;
                
                // Se c'è HTML fallback, aggiungilo
                if (postsContent[postFile]) {
                    postNumbers.push(i);
                } else {
                    // Se non c'è fallback, assumiamo che il file esista (verificato durante il caricamento)
                    postNumbers.push(i);
                }
            }
        } else {
            // Con server HTTP (produzione), verifica i file esistenti SEQUENZIALMENTE (più veloce)
            console.log('📋 Rilevamento veloce (server HTTP/produzione): controllo sequenziale');
            
            let consecutiveEmpty = 0;
            const maxConsecutiveEmpty = 5; // Ridotto per fermarsi prima
            
            // Controlla sequenzialmente e fermati dopo pochi vuoti (più veloce)
            for (let i = 1; i <= maxPosts; i++) {
                const postNumberStr = i.toString().padStart(2, '0');
                const postFile = `${postNumberStr}-post.html`;
                
                let hasContent = false;
                
                // Controlla HTML fallback hardcoded (veloce, no fetch)
                if (postsContent[postFile]) {
                    hasContent = true;
                } else {
                    // Controlla se esiste il file HTML con timeout veloce
                    try {
                        const htmlPath = `posts/${postFile}`;
                        const controller = new AbortController();
                        const timeoutId = setTimeout(() => controller.abort(), 200); // Timeout 200ms
                        
                        const response = await fetch(htmlPath, { 
                            method: 'HEAD',
                            cache: 'no-cache',
                            signal: controller.signal
                        });
                        clearTimeout(timeoutId);
                        if (response.ok) {
                            hasContent = true;
                        }
                    } catch (error) {
                        // Ignora errori (timeout o file non trovato)
                    }
                }
                
                if (hasContent) {
                    postNumbers.push(i);
                    consecutiveEmpty = 0;
                } else {
                    consecutiveEmpty++;
                    if (consecutiveEmpty >= maxConsecutiveEmpty) {
                        console.log(`🛑 Fermato dopo ${i - maxConsecutiveEmpty} post trovati (${consecutiveEmpty} vuoti consecutivi)`);
                        break;
                    }
                }
            }
        }
    } else {
        // Se c'è un config, usa quello come base e verifica velocemente i post successivi
        console.log('📋 Config trovato, verifico anche post aggiuntivi...');
        postNumbers = [...configOrder];
        
        const lastConfigPost = Math.max(...configOrder);
        const maxAdditionalCheck = 5; // Controlla solo i prossimi 5 post
        
        // Verifica velocemente i post successivi (solo se non in file://)
        if (window.location.protocol !== 'file:') {
            // Controlla in parallelo per velocità
            const additionalChecks = [];
            for (let i = lastConfigPost + 1; i <= lastConfigPost + maxAdditionalCheck; i++) {
                const postNumberStr = i.toString().padStart(2, '0');
                const postFile = `${postNumberStr}-post.html`;
                const htmlPath = `posts/${postFile}`;
                
                additionalChecks.push(
                    fetch(htmlPath, { 
                        method: 'HEAD', 
                        cache: 'no-cache'
                    })
                    .then(response => ({ number: i, exists: response.ok }))
                    .catch(() => ({ number: i, exists: false }))
                );
            }
            
            const results = await Promise.all(additionalChecks);
            console.log(`📋 Risultati controlli post aggiuntivi:`, results);
            for (const result of results) {
                if (result.exists) {
                    postNumbers.push(result.number);
                    console.log(`✅ Post ${result.number} trovato e aggiunto`);
                } else {
                    console.log(`❌ Post ${result.number} non trovato`);
                }
            }
        } else {
            // In file://, aggiungi i prossimi post (verificati durante il caricamento)
            for (let i = lastConfigPost + 1; i <= lastConfigPost + maxAdditionalCheck; i++) {
                postNumbers.push(i);
            }
        }
        
        console.log(`📋 Config: ${configOrder.length} post, trovati ${postNumbers.length - configOrder.length} aggiuntivi`);
    }
    
    console.log(`📋 Caricherò ${postNumbers.length} post: ${postNumbers.join(', ')}`);
    
    // Carica tutti i post in PARALLELO per velocità massima
    const postLoadPromises = postNumbers.map(async (postNumber) => {
        const postNumberStr = postNumber.toString().padStart(2, '0');
        const postFile = `${postNumberStr}-post.html`;

        // Controlla se ci sono immagini
        const images = await checkPostImages(postNumber);

        if (images && images.length > 0) {
            // CI SONO IMMAGINI: crea post con immagini
            const imageContent = createImagePost(images, postNumber);
            if (imageContent) {
                return {
                    number: postNumber,
                    filename: postFile,
                    content: imageContent,
                    isImage: true
                };
            }
        } else {
            // NON CI SONO IMMAGINI: prova prima HTML fallback, poi file HTML
            let htmlContent = null;

            // Prima prova HTML fallback hardcoded
            if (postsContent[postFile]) {
                htmlContent = postsContent[postFile];
                console.log(`📄 [Post ${postNumber}] Usato HTML fallback hardcoded`);
            } else {
                // Se non c'è fallback, prova a caricare il file HTML dalla cartella posts/
                try {
                    const htmlPath = `posts/${postFile}`;
                    console.log(`📄 [Post ${postNumber}] Tentativo caricamento da: ${htmlPath}`);
                    const response = await fetch(htmlPath, { 
                        method: 'GET',
                        cache: 'no-cache'
                    });
                    console.log(`📄 [Post ${postNumber}] Response status: ${response.status}`);
                    if (response.ok) {
                        htmlContent = await response.text();
                        if (htmlContent && htmlContent.trim().length > 0) {
                            console.log(`✅ [Post ${postNumber}] HTML caricato con successo (${htmlContent.length} caratteri)`);
                        } else {
                            htmlContent = null;
                            console.log(`⚠️ [Post ${postNumber}] HTML vuoto o non valido`);
                        }
                    } else {
                        console.log(`❌ [Post ${postNumber}] Response non OK: ${response.status}`);
                    }
                } catch (error) {
                    console.error(`❌ [Post ${postNumber}] Errore fetch HTML:`, error.message);
                }
            }
            
            if (htmlContent) {
                // Rimuovi classi hardcoded e aggiungi solo feed-item
                htmlContent = htmlContent.replace(
                    /class="feed-item[^"]*"/g,
                    'class="feed-item"'
                );
                
                // Analizza il contenuto e aggiungi la classe appropriata dinamicamente
                let postClass = 'feed-item';
                
                if (htmlContent.includes('carousel-container') || htmlContent.includes('carousel-slide')) {
                    postClass += ' carousel-post';
                } else if (htmlContent.includes('quote-post-content') || htmlContent.includes('quote-text')) {
                    postClass += ' quote-post';
                } else if (htmlContent.includes('info-post-content') || htmlContent.includes('info-title')) {
                    postClass += ' info-post';
                } else if (htmlContent.includes('cta-post-content') || htmlContent.includes('cta-button')) {
                    postClass += ' cta-post';
                } else if (htmlContent.includes('special-post-content') || htmlContent.includes('phone-mockup')) {
                    postClass += ' special-post';
                }
                
                // Sostituisci la classe nel contenuto
                htmlContent = htmlContent.replace(
                    /class="feed-item"/g,
                    `class="${postClass}"`
                );
                
                return {
                    number: postNumber,
                    filename: postFile,
                    content: htmlContent,
                    isImage: false
                };
            }
        }
        
        return null; // Post non trovato
    });
    
    // Attendi tutti i post in parallelo
    const loadedPosts = await Promise.all(postLoadPromises);
    postFiles = loadedPosts.filter(post => post !== null);
    
    // Ordina per numero
    postFiles.sort((a, b) => a.number - b.number);
    
    // Carica i post nel feed nell'ordine corretto
    if (postFiles.length === 0) {
        console.error('❌ Nessun post trovato!');
        feedGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #8e8e8e;"><p>Nessun post trovato</p><p style="font-size: 12px; margin-top: 10px;">Aggiungi immagini in images/XX-post/ o verifica posts-config.json</p></div>';
        return;
    }
    
    postFiles.forEach((post, index) => {
        try {
            const postContainer = document.createElement('div');
            postContainer.innerHTML = post.content.trim();
            
            const postElement = postContainer.firstElementChild;
            if (postElement) {
                postElement.setAttribute('data-post-number', post.number);
                postElement.setAttribute('data-post-filename', post.filename);
                feedGrid.appendChild(postElement);
            } else {
                console.error(`Errore: ${post.filename} non ha contenuto valido`);
            }
        } catch (error) {
            console.error(`Errore nel caricare ${post.filename}:`, error);
        }
    });
    
    const imageCount = postFiles.filter(p => p.isImage).length;
    const htmlCount = postFiles.filter(p => !p.isImage).length;
    const orderList = postFiles.map(p => {
        const type = p.isImage ? '🖼️' : '📄';
        return `${type} ${p.filename} (#${p.number})`;
    }).join(' → ');
    
    console.log(`\n✅ Caricati ${postFiles.length} post nel feed`);
    console.log(`   🖼️ ${imageCount} post con immagini`);
    console.log(`   📄 ${htmlCount} post con HTML fallback`);
    console.log(`📋 Ordine attuale: ${orderList}`);
    
    // Reinizializza i caroselli dopo il caricamento dei post
    if (typeof reinitCarousels === 'function') {
        setTimeout(() => {
            reinitCarousels();
        }, 100);
    }
}

// Carica i post quando la pagina è pronta
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPosts);
} else {
    loadPosts();
}

// Funzione per ricaricare i post (utile per debug)
window.reloadPosts = function() {
    console.log('🔄 Ricarico i post...');
    loadPosts();
};
