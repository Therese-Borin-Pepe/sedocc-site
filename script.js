// ==========================================
// Typographie française - espaces insécables avant ? ! : ;
// (évite que la ponctuation se retrouve seule en début de ligne sur mobile)
// ==========================================
function fixFrenchTypography(root) {
    const elements = (root || document).querySelectorAll('h1, h2, h3, h4, h5, h6, .hero-subtitle, .scroll-text, p, li, button, a, figcaption, label');
    elements.forEach(function(el) {
        // Parcourt uniquement les nœuds texte pour ne pas casser le HTML interne
        for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
                node.nodeValue = node.nodeValue
                    .replace(/ ([?!:;»])/g, ' $1')
                    .replace(/(« ) /g, '« ');
            }
        }
    });
}

// Appliquer dès le chargement
document.addEventListener('DOMContentLoaded', function() { fixFrenchTypography(); });

// ==========================================
// Partage sur les réseaux sociaux (actualités de l'association)
// ==========================================
function shareRowHTML(shareUrl, title) {
    const u = encodeURIComponent(shareUrl);
    const t = encodeURIComponent(title);
    return `
        <div class="actu-share">
            <span class="actu-share-label">Partager :</span>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${u}" target="_blank" rel="noopener" class="actu-share-btn" aria-label="Partager sur Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://api.whatsapp.com/send?text=${t}%20${u}" target="_blank" rel="noopener" class="actu-share-btn" aria-label="Partager sur WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.83 14.19c-.24.68-1.4 1.31-1.94 1.36-.5.05-1.11.07-1.79-.11-.41-.11-.94-.29-1.62-.57-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.72-2.09.98-2.38c.24-.26.53-.32.71-.32h.51c.16 0 .38-.06.6.46.24.57.81 1.97.88 2.11.07.14.11.31.02.5-.08.19-.13.31-.26.48-.13.16-.28.36-.4.48-.13.13-.27.28-.12.55.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.2 1.37.28.14.44.12.6-.07.16-.19.7-.81.89-1.09.19-.28.38-.23.63-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.33.07.12.07.68-.17 1.36z"/></svg>
            </a>
            <button type="button" class="actu-share-btn actu-share-copy" onclick="copyShareLink('${shareUrl.replace(/'/g, "\\'")}', this)" aria-label="Copier le lien">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.42 1.42"/><path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.41-1.41"/></svg>
            </button>
            ${typeof navigator !== 'undefined' && navigator.share ? `
            <button type="button" class="actu-share-btn" onclick="nativeShare('${shareUrl.replace(/'/g, "\\'")}', '${title.replace(/'/g, "\\'")}')" aria-label="Plus d'options de partage (Instagram, Messages...)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            </button>` : ''}
        </div>`;
}

function nativeShare(url, title) {
    if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function() {});
    }
}

function copyShareLink(url, btn) {
    navigator.clipboard.writeText(url).then(function() {
        btn.classList.add('copied');
        const original = btn.innerHTML;
        btn.innerHTML = 'Lien copié !';
        setTimeout(function() { btn.innerHTML = original; btn.classList.remove('copied'); }, 2000);
    });
}
// Et après le chargement complet (au cas où du contenu serait injecté plus tard)
window.addEventListener('load', function() { fixFrenchTypography(); });
// Réobserver les contenus injectés dynamiquement (sed.html, evenement.html, etc.)
const typographyObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
        m.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) fixFrenchTypography(node);
        });
    });
});
typographyObserver.observe(document.body, { childList: true, subtree: true });

// ==========================================
// Navigation Mobile Toggle
// ==========================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        // Don't close menu if it's the dropdown toggle (mobile)
        if (window.innerWidth <= 1380 && link.closest('.nav-dropdown')) {
            return;
        }
        navMenu.classList.remove('active');

        // Reset hamburger icon
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// ==========================================
// Navbar Scroll Effect
// ==========================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

// Créer la barre de progression au scroll
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// ==========================================
// Curseur lumineux qui suit la souris
// ==========================================
(function initCursorFollower() {
    // Ne pas activer sur écrans tactiles
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    dot.textContent = '🦓';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Le zèbre apparaît un peu en bas à droite du curseur natif (offset)
        dot.style.transform = 'translate(' + (mouseX + 16) + 'px, ' + (mouseY + 16) + 'px)';
        follower.classList.add('visible');
        dot.classList.add('visible');
    });

    document.addEventListener('mouseleave', function() {
        follower.classList.remove('visible');
        dot.classList.remove('visible');
    });

    // Le halo suit avec un léger retard (effet de traîne)
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.transform = 'translate(' + followerX + 'px, ' + followerY + 'px) translate(-50%, -50%)';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Effet "hover" sur les éléments cliquables — agrandit le zèbre + le halo
    const interactiveSelector = 'a, button, .btn, input, textarea, select, [role="button"], .nav-link, .evenement-card';
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest(interactiveSelector)) {
            follower.classList.add('hover');
            dot.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest(interactiveSelector)) {
            follower.classList.remove('hover');
            dot.classList.remove('hover');
        }
    });
})();

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Mettre à jour la barre de progression
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (currentScroll / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    lastScroll = currentScroll;
});

// ==========================================
// Smooth Scroll
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Ignore empty anchors
        if (href === '#' || href === '#!') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Fade-in Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
const elementsToAnimate = document.querySelectorAll('.mission-card, .team-member, .partner-logo, .stat-card');
elementsToAnimate.forEach(function(element) {
    observer.observe(element);
});

// ==========================================
// Scroll Reveal Animations
// ==========================================

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.card-modern, .support-banner, .tab-content, .bilan-item, .quote-modern, section.page-content > .container > *').forEach(function(el) {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Animation des sections, titres, photos, événements
document.querySelectorAll('section h2, .mission-text, .actions-text, .warning-box, .team-member, .partner-logo').forEach(function(el) {
    el.classList.add('scroll-reveal');
    revealObserver.observe(el);
});

// Livret enfant : animation du contenu de chaque rubrique
document.querySelectorAll('.livret-row, .livret-energy-grid, .livret-equip-row, .livret-pact-box, .livret-draw-box, .livret-scroll-strip, .livret-parents-box').forEach(function(el, index) {
    el.classList.add('scroll-reveal');
    if (el.classList.contains('livret-equip-row')) {
        el.classList.add('delay-' + ((index % 3) + 1));
    }
    revealObserver.observe(el);
});

// Livret enfant : sélection de la carte "niveau de super-énergie"
document.querySelectorAll('.livret-energy-card').forEach(function(card) {
    card.addEventListener('click', function() {
        document.querySelectorAll('.livret-energy-card').forEach(function(c) {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
    });
});

// Livret enfant : signature interactive du "Pacte des Supers Copains"
const pactInput = document.getElementById('pact-signature-input');
if (pactInput) {
    const pactBox = pactInput.closest('.livret-pact-box');
    const pactConfirm = document.getElementById('pact-signature-confirm');
    pactInput.addEventListener('input', function() {
        const name = pactInput.value.trim();
        if (name) {
            pactConfirm.textContent = '🎉 Merci ' + name + ', tu es un super copain !';
            pactBox.classList.add('signed');
        } else {
            pactConfirm.textContent = '';
            pactBox.classList.remove('signed');
        }
    });
}

// Livret enfant : coloriage interactif de la silhouette super-héros
const coloringCanvas = document.getElementById('coloring-canvas');
if (coloringCanvas) {
    const ctx = coloringCanvas.getContext('2d');
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let currentColor = '#E63946';
    let brushSize = 14;
    let isErasing = false;
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const palette = document.getElementById('coloring-palette');
    if (palette) {
        palette.querySelectorAll('.livret-color-swatch').forEach(function(btn) {
            btn.addEventListener('click', function() {
                palette.querySelectorAll('.livret-color-swatch').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                isErasing = btn.dataset.color === 'eraser';
                if (!isErasing) currentColor = btn.dataset.color;
            });
        });
    }

    const brushSizes = document.getElementById('coloring-brush-sizes');
    if (brushSizes) {
        brushSizes.querySelectorAll('.livret-brush-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                brushSizes.querySelectorAll('.livret-brush-btn').forEach(function(b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                brushSize = parseInt(btn.dataset.size, 10);
            });
        });
    }

    const clearBtn = document.getElementById('coloring-clear');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            ctx.clearRect(0, 0, coloringCanvas.width, coloringCanvas.height);
        });
    }

    function getPos(e) {
        const rect = coloringCanvas.getBoundingClientRect();
        const scaleX = coloringCanvas.width / rect.width;
        const scaleY = coloringCanvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function startDraw(e) {
        drawing = true;
        const pos = getPos(e);
        lastX = pos.x;
        lastY = pos.y;
        try { coloringCanvas.setPointerCapture(e.pointerId); } catch (err) {}
    }

    function moveDraw(e) {
        if (!drawing) return;
        const pos = getPos(e);
        ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = isErasing ? brushSize * 1.8 : brushSize;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        lastX = pos.x;
        lastY = pos.y;
    }

    function endDraw() {
        drawing = false;
    }

    coloringCanvas.addEventListener('pointerdown', startDraw);
    coloringCanvas.addEventListener('pointermove', moveDraw);
    coloringCanvas.addEventListener('pointerup', endDraw);
    coloringCanvas.addEventListener('pointerleave', endDraw);
}

// Photos en cascade (mosaïque mission, action photos)
document.querySelectorAll('.mosaic-item, .action-photo').forEach(function(el, index) {
    el.classList.add('scroll-reveal-zoom');
    el.classList.add('delay-' + ((index % 4) + 1));
    revealObserver.observe(el);
});

// Cartes événements en cascade zoom
document.querySelectorAll('a.evenement-card').forEach(function(el, index) {
    el.classList.add('scroll-reveal-zoom');
    el.classList.add('delay-' + ((index % 3) + 1));
    revealObserver.observe(el);
});

// Galerie photos en cascade
document.querySelectorAll('.galerie-photos img, .gallery-item').forEach(function(el, index) {
    el.classList.add('scroll-reveal-zoom');
    el.classList.add('delay-' + ((index % 4) + 1));
    revealObserver.observe(el);
});

// ==========================================
// Active Navigation Link (per page)
// ==========================================

(function setActiveNavByPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        // For dropdown parent: mark active if a sub-page is current
        if (link.closest('.nav-dropdown')) {
            const dropdownLinks = link.closest('.nav-dropdown').querySelectorAll('.dropdown-menu a');
            dropdownLinks.forEach(function(subLink) {
                if (subLink.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        }
    });
})();

// ==========================================
// Back to Top Button
// ==========================================

(function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.innerHTML = '&#8593;';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ==========================================
// External Links (open in new tab)
// ==========================================

document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.getAttribute('target')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ==========================================
// Loading Animation
// ==========================================

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ==========================================
// Lightbox
// ==========================================

(function initLightbox() {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = '<div class="lightbox-inner"><img src="" class="lightbox-img" alt=""><button class="lightbox-close">&times;</button></div>';
    document.body.appendChild(overlay);

    var lightboxImg = overlay.querySelector('.lightbox-img');
    var excludeSelectors = '.logo, .navbar, .nav-container, .footer, .hero-logo, .lightbox-overlay, .cookie-banner';

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt || '';
        overlay.classList.add('active');
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        lightboxImg.src = '';
    }

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.classList.contains('lightbox-close') || e.target.closest('.lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    function bindImage(img) {
        if (img.dataset.lbBound) return;
        if (img.closest(excludeSelectors)) return;
        if (img.closest('a[href]')) return;
        img.dataset.lbBound = '1';
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function(e) {
            var w = img.naturalWidth || img.width;
            var h = img.naturalHeight || img.height;
            if (w < 60 && h < 60) return;
            e.preventDefault();
            e.stopPropagation();
            openLightbox(img.src, img.alt);
        });
    }

    function bindAllImages() {
        document.querySelectorAll('img').forEach(bindImage);
    }
    bindAllImages();
    window.addEventListener('load', bindAllImages);
    var lbObserver = new MutationObserver(function(mutations) {
        var hasNewImages = mutations.some(function(m) {
            return Array.from(m.addedNodes).some(function(n) {
                return n.nodeName === 'IMG' || (n.querySelectorAll && n.querySelectorAll('img').length > 0);
            });
        });
        if (hasNewImages) bindAllImages();
    });
    lbObserver.observe(document.body, { childList: true, subtree: true });
})();

// ==========================================
// Form Validation (if needed later)
// ==========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ==========================================
// Cookie Consent (simple implementation)
// ==========================================

function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Create cookie banner if needed
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
                <button class="btn btn-primary btn-accept-cookies">Accepter</button>
                <button class="btn btn-secondary btn-decline-cookies">Refuser</button>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        // Handle accept
        banner.querySelector('.btn-accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            banner.remove();
        });
        
        // Handle decline
        banner.querySelector('.btn-decline-cookies').addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            banner.remove();
        });
    }
}

// Uncomment to enable cookie consent
// initCookieConsent();

// ==========================================
// Performance Optimization
// ==========================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(function(img) {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// Tabs (Traitements page)
// ==========================================

// Event delegation for dynamically created tab buttons
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.tab-btn');
    if (!btn) return;
    var tabId = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
    btn.classList.add('active');
    var target = document.getElementById('tab-' + tabId);
    if (target) target.classList.add('active');
});

// ==========================================
// Accordion (Droits page)
// ==========================================

var accordionBtns = document.querySelectorAll('.accordion-btn');
accordionBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var item = this.parentElement;
        // Close others
        document.querySelectorAll('.accordion-item').forEach(function(other) {
            if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
    });
});

// ==========================================
// Mobile dropdown toggle
// ==========================================

var dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach(function(dropdown) {
    dropdown.addEventListener('click', function(e) {
        if (window.innerWidth <= 1380) {
            var link = this.querySelector('.nav-link');
            if (e.target === link || link.contains(e.target)) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        }
    });
});

// ==========================================
// Accessibility Improvements
// ==========================================

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#accueil';
skipLink.className = 'skip-link sr-only';
skipLink.textContent = 'Aller au contenu principal';
document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation for mobile menu
if (navToggle) {
    navToggle.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
}

// ==========================================
// Print Styles Helper
// ==========================================

window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections for printing
    console.log('Preparing page for printing...');
});

// ==========================================
// Development Helper (remove in production)
// ==========================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🎨 SED\'OCC Website - Development Mode');
    console.log('📱 Current viewport:', window.innerWidth + 'x' + window.innerHeight);

    // Show viewport size on resize
    window.addEventListener('resize', function() {
        console.log('📱 Viewport resized:', window.innerWidth + 'x' + window.innerHeight);
    });
}

// ==========================================
// Chargement des pages extra du menu déroulant
// ==========================================

(function loadNavExtra() {
    // Détecter si on est dans un sous-dossier
    var inSubfolder = window.location.pathname.split('/').filter(Boolean).length > 1;

    fetch('data/nav-extra.json')
        .then(function(r) { return r.json(); })
        .then(function(extra) {
            // Map section → sélecteur du lien principal du dropdown correspondant
            var dropdownMap = {
                association: 'a[href="index.html"].nav-link',
                sed: 'a[href="sed.html"].nav-link',
                droits: 'a[href="droits.html"].nav-link',
                evenements: 'a[href="evenements.html"].nav-link'
            };
            Object.keys(extra).forEach(function(section) {
                var pages = extra[section];
                if (!pages || !pages.length) return;
                var navLink = document.querySelector(dropdownMap[section]);
                if (!navLink) return;
                var menu = navLink.nextElementSibling;
                if (!menu) return;
                pages.forEach(function(page) {
                    var url = inSubfolder ? ('../' + page.url) : page.url;
                    if (menu.querySelector('a[href="' + url + '"]')) return;
                    var li = document.createElement('li');
                    li.innerHTML = '<a href="' + url + '">' + page.title + '</a>';
                    menu.appendChild(li);
                });
            });
        })
        .catch(function() {}); // silencieux si fichier absent
})();
