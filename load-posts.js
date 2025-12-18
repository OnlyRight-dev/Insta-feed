// Contenuti dei post (fallback quando fetch non funziona)
const postsContent = {
    'post-01.html': `<div class="feed-item quote-post">
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
    'post-02.html': `<div class="feed-item info-post">
    <div class="info-post-content">
        <div class="info-title">COME FUNZIONA?</div>
        <div class="info-feature">
            <div class="info-icon">?</div>
            <div class="info-feature-text">QUIZ DI COMPATIBILITA'</div>
        </div>
        <div class="info-feature">
            <div class="info-icon">👥</div>
            <div class="info-feature-text">MATCHING INTELLIGENTE</div>
        </div>
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
    'post-03.html': `<div class="feed-item carousel-post">
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
    'post-04.html': `<div class="feed-item quote-post">
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
    'post-05.html': `<div class="feed-item quote-post">
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
    'post-06.html': `<div class="feed-item quote-post">
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
    'post-07.html': `<div class="feed-item quote-post">
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
    'post-08.html': `<div class="feed-item quote-post">
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
    'post-09.html': `<div class="feed-item special-post">
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
    
    const postsDirectory = 'posts/';
    const timestamp = new Date().getTime();
    let postFiles = [];
    let useFallback = false;
    
    // Prova prima a caricare la configurazione JSON (se esiste)
    try {
        const configResponse = await fetch(`posts-config.json?t=${timestamp}`, {
            cache: 'no-cache'
        });
        
        if (configResponse.ok) {
            const config = await configResponse.json();
            console.log('📋 Configurazione trovata, uso ordine dal file JSON');
            
            // Carica i post nell'ordine specificato nel JSON
            for (const postFile of config.posts) {
                const postPath = `${postsDirectory}${postFile}?t=${timestamp}`;
                try {
                    const response = await fetch(postPath, { cache: 'no-cache' });
                    if (response.ok) {
                        const content = await response.text();
                        if (content && content.trim().length > 0) {
                            const match = postFile.match(/post-(\d+)\.html/);
                            const number = match ? parseInt(match[1]) : 0;
                            
                            postFiles.push({
                                number: number,
                                filename: postFile,
                                path: postPath,
                                content: content
                            });
                            console.log(`✓ ${postFile} caricato`);
                        }
                    }
                } catch (error) {
                    // Se fetch fallisce, usa il fallback
                    if (postsContent[postFile]) {
                        useFallback = true;
                        const match = postFile.match(/post-(\d+)\.html/);
                        const number = match ? parseInt(match[1]) : 0;
                        postFiles.push({
                            number: number,
                            filename: postFile,
                            path: postPath,
                            content: postsContent[postFile]
                        });
                        console.log(`✓ ${postFile} caricato (fallback)`);
                    }
                }
            }
        } else {
            throw new Error('Config non trovato');
        }
    } catch (error) {
        console.log('📋 Configurazione non trovata o fetch fallito, uso auto-rilevamento...');
        useFallback = true;
        
        // Auto-rilevamento: cerca tutti i file post-*.html
        const maxPosts = 50;
        
        for (let i = 1; i <= maxPosts; i++) {
            const postNumber = i.toString().padStart(2, '0');
            const postFile = `post-${postNumber}.html`;
            const postPath = `${postsDirectory}${postFile}?t=${timestamp}`;
            
            // Prova prima con fetch
            try {
                const response = await fetch(postPath, { cache: 'no-cache' });
                if (response.ok) {
                    const content = await response.text();
                    if (content && content.trim().length > 0) {
                        postFiles.push({
                            number: i,
                            filename: postFile,
                            path: postPath,
                            content: content
                        });
                        console.log(`✓ ${postFile} caricato`);
                        continue;
                    }
                }
            } catch (error) {
                // Fetch fallito, usa fallback se disponibile
            }
            
            // Usa fallback se disponibile
            if (postsContent[postFile]) {
                postFiles.push({
                    number: i,
                    filename: postFile,
                    path: postPath,
                    content: postsContent[postFile]
                });
                console.log(`✓ ${postFile} caricato (fallback)`);
            }
        }
    }
    
    // Ordina per numero
    postFiles.sort((a, b) => a.number - b.number);
    
    // Carica i post nel feed nell'ordine corretto
    if (postFiles.length === 0) {
        console.error('❌ Nessun post trovato!');
        feedGrid.innerHTML = '<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: #8e8e8e;"><p>Nessun post trovato</p><p style="font-size: 12px; margin-top: 10px;">Verifica che i file post-XX.html esistano nella cartella posts/</p></div>';
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
    
    const orderList = postFiles.map(p => `${p.filename} (#${p.number})`).join(' → ');
    console.log(`✅ Caricati ${postFiles.length} post nel feed`);
    console.log(`📋 Ordine attuale: ${orderList}`);
    if (useFallback) {
        console.log('💡 Nota: Uso contenuti inline (fallback) - funziona anche senza server');
    }
    
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
