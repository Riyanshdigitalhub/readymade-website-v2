// ===================================
// FAQ Accordion Functionality
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Smooth Scrolling for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===================================
    // Scroll Animations (Intersection Observer)
    // ===================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll(
        '.feature-card, .category-card, .step, .testimonial-card, .faq-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ===================================
    // Sticky CTA Visibility on Scroll
    // ===================================
    let lastScrollY = window.scrollY;
    const stickyCTA = document.querySelector('.sticky-cta');
    
    if (stickyCTA) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const ctaSection = document.getElementById('cta');
            const ctaRect = ctaSection ? ctaSection.getBoundingClientRect() : null;
            
            // Hide sticky CTA when near the final CTA section
            if (ctaRect && ctaRect.top < window.innerHeight) {
                stickyCTA.style.transform = 'translateY(100%)';
            } else {
                stickyCTA.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // ===================================
    // Video Placeholder Click Handler
    // ===================================
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Add your video modal or redirect logic here
            console.log('Video clicked - Add your video player logic here');
            
            // Example: Show a visual feedback
            this.style.borderColor = 'var(--accent-purple)';
            this.style.boxShadow = 'var(--shadow-glow)';
        });
    });
    
    // ===================================
    // Price Animation on Load
    // ===================================
    const priceElements = document.querySelectorAll('.new-price, .final-price, .sticky-new');
    
    priceElements.forEach(price => {
        price.style.opacity = '0';
        setTimeout(() => {
            price.style.transition = 'opacity 0.5s ease';
            price.style.opacity = '1';
        }, 500);
    });
    
    // ===================================
    // Trust Strip Counter Animation
    // ===================================
    const trustItems = document.querySelectorAll('.trust-item');
    
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });
    
    trustItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        trustObserver.observe(item);
    });
    
    // ===================================
    // Button Hover Sound Effect (Optional)
    // ===================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            // Add subtle scale effect
            this.style.transform = 'scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // ===================================
    // Performance: Lazy Load Images (if any added later)
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c🚀 ReadyMade Website Loaded Successfully!', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    console.log('%cStart your online business today with 250+ digital products!', 'color: #a1a1aa; font-size: 12px;');
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
