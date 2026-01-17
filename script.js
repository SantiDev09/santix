// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== CAROUSEL ==========
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDotsContainer = document.getElementById('carouselDots');
const slides = document.querySelectorAll('.carousel-slide');

let currentIndex = 0;
const totalSlides = slides.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    carouselDotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.carousel-dot');

function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-play carousel
let autoPlayInterval = setInterval(nextSlide, 5000);

// Pause auto-play on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(nextSlide, 5000);
});

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
const emailBtn = document.getElementById('emailBtn');

// WhatsApp submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;
    
    const whatsappMessage = `Hola Santix, mi nombre es ${nombre}.

📧 Email: ${email}
📱 Teléfono: ${telefono}
🎯 Servicio de interés: ${servicio}

📝 Mensaje:
${mensaje}

Quedo atento a tu respuesta. ¡Gracias!`;
    
    const whatsappURL = `https://wa.me/573127682380?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, '_blank');
    
    // Reset form
    contactForm.reset();
});

// Email submission
emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;
    
    if (!nombre || !email || !telefono || !servicio || !mensaje) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const subject = `Nuevo contacto de ${nombre} - ${servicio}`;
    const body = `Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}
Servicio: ${servicio}

Mensaje:
${mensaje}`;
    
    const mailtoURL = `mailto:santidevolper2002@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
    
    // Reset form
    contactForm.reset();
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .plan-card, .feature-item, .addon-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal', 'active');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ========== ACTIVE LINK HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ========== PORTFOLIO ITEM HOVER EFFECT ==========
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
});

// ========== TYPING EFFECT FOR HERO TITLE (OPTIONAL) ==========
// Uncomment if you want a typing effect
/*
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';
let charIndex = 0;

function typeText() {
    if (charIndex < titleText.length) {
        heroTitle.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
    }
}

window.addEventListener('load', typeText);
*/

// ========== LAZY LOADING IMAGES ==========
const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('fade-in');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ========== COUNTER ANIMATION FOR STATS ==========
const stats = document.querySelectorAll('.stat-item h3');

const animateCounter = (element) => {
    const target = element.textContent;
    const isNumber = !isNaN(parseInt(target));
    
    if (isNumber) {
        const value = parseInt(target);
        const duration = 2000;
        const increment = value / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < value) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ========== PARALLAX EFFECT FOR HERO SPHERES ==========
const spheres = document.querySelectorAll('.gradient-sphere');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    spheres.forEach((sphere, index) => {
        const speed = 0.5 + (index * 0.2);
        sphere.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== PREVENT FORM RESUBMISSION ==========
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent code here if needed
}));

// ========== CONSOLE MESSAGE ==========
console.log('%c¡Hola! 👋', 'font-size: 20px; color: #0066FF; font-weight: bold;');
console.log('%cGracias por visitar SANTIX', 'font-size: 14px; color: #00D4FF;');
console.log('%c¿Interesado en trabajar juntos? Contáctame: santidevolper2002@gmail.com', 'font-size: 12px; color: #4D9FFF;');

// ========== INITIALIZE ON LOAD ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Sitio web cargado completamente');
});