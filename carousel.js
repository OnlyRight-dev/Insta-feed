// Inizializza tutti i caroselli quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
});

// Funzione per inizializzare tutti i caroselli
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        initCarousel(carousel);
    });
}

// Funzione per inizializzare un singolo carosello
function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Funzione per mostrare uno slide specifico
    function showSlide(index) {
        // Rimuovi active da tutti gli slide e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Aggiungi active allo slide e dot corrente
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Funzione per andare allo slide successivo
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Funzione per andare allo slide precedente
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners per i bottoni
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
    }
    
    // Event listeners per i dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
        });
    });
    
    // Supporto per swipe su mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    // Supporto per tastiera (opzionale)
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Inizializza il primo slide
    showSlide(0);
}

// Funzione per reinizializzare i caroselli dopo che i post vengono caricati dinamicamente
function reinitCarousels() {
    initCarousels();
}

// Esponi la funzione globalmente per poterla chiamare dopo il caricamento dei post
window.reinitCarousels = reinitCarousels;

