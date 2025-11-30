// Initialize interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Scroll animations
    setupScrollAnimations();
    
    // Scroll-to-top button
    setupScrollToTop();
    
    // Active navigation highlight
    highlightActiveNavigation();
});

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only apply smooth scroll to same-page anchors
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Scroll Animations - Fade in elements as you scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all project cards, skill items, and sections
    document.querySelectorAll('.project-card, .project-full-card, .skill-item, section').forEach(el => {
        observer.observe(el);
    });
}

// Scroll-to-Top Button
function setupScrollToTop() {
    // Create scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.title = 'Scroll to top';
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Highlight Active Navigation Link
function highlightActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        updateActiveLink();
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(updateActiveLink, 100);
        });
    });
    
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (currentPage === '' && href === 'index.html') {
                link.classList.add('active');
            } else if (currentPage === href) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call
    updateActiveLink();
}

// Interactive Project Cards - Expand/Collapse on Click
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-full-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
});

// Form Validation (for future contact form)
function validateContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    if (!email || !message) {
        alert('Please fill out all fields');
        return false;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email');
        return false;
    }
    
    // Form is valid - would submit here
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
    return false;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth Page Transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0.5';
});

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
});

// Add loading state to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .project-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't interfere with mailto links
            if (this.href && this.href.startsWith('mailto:')) {
                return;
            }
            
            // Add click effect
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
        });
    });
});

// Keyboard navigation enhancement
document.addEventListener('keydown', function(e) {
    // Press 'h' to scroll to home
    if (e.key === 'h' || e.key === 'H') {
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.location.href = 'index.html';
        }
    }
});

// Lazy load images (for future use with actual images)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Portfolio interactive features loaded successfully!');
