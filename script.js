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
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        // Le point central suit instantanément
        dot.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
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

    // Effet "hover" sur les éléments cliquables
    const interactiveSelector = 'a, button, .btn, input, textarea, select, [role="button"], .nav-link, .evenement-card';
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest(interactiveSelector)) {
            follower.classList.add('hover');
        }
    });
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest(interactiveSelector)) {
            follower.classList.remove('hover');
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
        if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });

    document.addEventListener('click', function(e) {
        // Clic sur une image directe
        if (e.target.classList.contains('lightbox-trigger')) {
            openLightbox(e.target.src, e.target.alt);
        }
        // Clic sur un wrapper .image-clickable.lightbox-trigger
        var wrapper = e.target.closest('.image-clickable.lightbox-trigger');
        if (wrapper) {
            var img = wrapper.querySelector('img');
            if (img) openLightbox(img.src, img.alt);
        }
    });
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
