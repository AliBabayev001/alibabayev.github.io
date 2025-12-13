/* ========================================
   Portfolio Interactive Features Module
   ======================================== */

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', initializePortfolio);

function initializePortfolio() {
    Navigation.init();
    Scrolling.init();
    Search.init();
    Email.init();
    UI.init();
    console.log('Portfolio interactive features loaded successfully!');
}

// If the page was opened directly (e.g. Live Server opens about.html),
// some builds or editors may not include the search markup. Ensure it's present.
function ensureSearchInNavbar() {
    try {
        const navbarLeft = document.querySelector('.navbar-left');
        if (!navbarLeft) return;
        // If search input already exists, nothing to do
        if (document.getElementById('search-input')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'search-bar';
        wrapper.innerHTML = `
            <input type="text" id="search-input" placeholder="Search..." class="search-input" />
            <div id="search-results" class="search-results"></div>
        `;
        // Insert after the logo if logo exists
        const logo = navbarLeft.querySelector('.logo');
        if (logo && logo.nextSibling) {
            logo.parentNode.insertBefore(wrapper, logo.nextSibling);
        } else {
            navbarLeft.appendChild(wrapper);
        }
    } catch (err) {
        console.error('ensureSearchInNavbar error:', err);
    }
}

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

// Search Functionality - Multi-page search
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Define pages to search
    const pages = [
        { name: 'index.html', title: 'Home' },
        { name: 'about.html', title: 'About' },
        { name: 'projects.html', title: 'Projects' }
    ];
    
    // Build search index from current page and cache other pages
    let globalSearchIndex = [];
    
    function buildSearchIndex() {
        const index = [];
        
        // Get all headings and paragraphs
        document.querySelectorAll('h1, h2, h3, h4, p, li').forEach(element => {
            const text = element.textContent.trim();
            if (text.length > 0 && !element.closest('nav') && !element.closest('footer')) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                index.push({
                    text: text,
                    element: element,
                    heading: element.tagName,
                    page: currentPage,
                    pageTitle: pages.find(p => p.name === currentPage)?.title || 'Page'
                });
            }
        });
        
        return index;
    }
    
    // Build initial index for current page
    globalSearchIndex = buildSearchIndex();
    
    // Search function
    function performSearch(query) {
        searchResults.innerHTML = '';
        
        if (query.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        
        // Search in current page index
        const matches = globalSearchIndex.filter(item => 
            item.text.toLowerCase().includes(lowerQuery)
        );
        
        if (matches.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No results found across all pages';
            noResults.style.opacity = '0.6';
            searchResults.appendChild(noResults);
            searchResults.classList.add('active');
            return;
        }
        
        // Show top 10 results, grouped by relevance
        const sortedMatches = matches.sort((a, b) => {
            const aIndex = a.text.toLowerCase().indexOf(lowerQuery);
            const bIndex = b.text.toLowerCase().indexOf(lowerQuery);
            return aIndex - bIndex;
        });
        
        sortedMatches.slice(0, 10).forEach(match => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            // Create title from heading or first 50 chars
            let title = match.text;
            if (title.length > 50) {
                title = title.substring(0, 50) + '...';
            }
            
            // Highlight the matched query in the result
            const highlightIndex = title.toLowerCase().indexOf(lowerQuery);
            if (highlightIndex !== -1) {
                const before = title.substring(0, highlightIndex);
                const matched = title.substring(highlightIndex, highlightIndex + lowerQuery.length);
                const after = title.substring(highlightIndex + lowerQuery.length);
                
                resultItem.innerHTML = `${before}<strong>${matched}</strong>${after}`;
            } else {
                resultItem.textContent = title;
            }
            
            // Add page indicator if on different page
            if (match.page !== (window.location.pathname.split('/').pop() || 'index.html')) {
                const pageIndicator = document.createElement('div');
                pageIndicator.className = 'search-result-page';
                pageIndicator.textContent = `[${match.pageTitle}]`;
                resultItem.appendChild(pageIndicator);
            }
            
            // Click to navigate and scroll to element
            resultItem.addEventListener('click', function() {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                
                if (match.page === currentPage) {
                    // Same page - scroll to element
                    match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                    match.element.classList.add('highlight');
                    setTimeout(() => {
                        match.element.classList.remove('highlight');
                    }, 2000);
                } else {
                    // Different page - navigate and let the next page handle highlighting
                    // Store the search term in session storage
                    sessionStorage.setItem('searchHighlight', match.text.substring(0, 30));
                    window.location.href = match.page;
                }
            });
            
            searchResults.appendChild(resultItem);
        });
        
        searchResults.classList.add('active');
    }
    
    // Event listeners
    searchInput.addEventListener('input', function(e) {
        performSearch(e.target.value);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-bar')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Allow ESC key to close search results
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            searchInput.value = '';
        }
    });
    
    // Highlight search term from session storage if coming from another page
    window.addEventListener('load', function() {
        const highlightTerm = sessionStorage.getItem('searchHighlight');
        if (highlightTerm) {
            const allElements = document.querySelectorAll('h1, h2, h3, h4, p, li');
            let found = false;
            
            for (let element of allElements) {
                if (element.textContent.toLowerCase().includes(highlightTerm.toLowerCase())) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlight');
                    setTimeout(() => {
                        element.classList.remove('highlight');
                    }, 2000);
                    found = true;
                    break;
                }
            }
            
            sessionStorage.removeItem('searchHighlight');
        }
    });
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

// Keep the page visible even when focus leaves for mail apps
function ensurePageVisible() {
    document.documentElement.style.visibility = 'visible';
    document.documentElement.style.opacity = '1';
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
}

    // Try to open Gmail app, then fall back to Gmail web compose
    function openWithGmail(email) {
        const encoded = encodeURIComponent(email);
        const gmailAppUrl = `googlegmail:///co?to=${encoded}`;
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encoded}`;

        // Attempt to trigger Gmail app without leaving the page
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = gmailAppUrl;
        document.body.appendChild(iframe);

        // Always open Gmail web compose in a new tab as a reliable fallback
        const newTab = window.open(gmailWebUrl, '_blank');
        if (newTab) {
            newTab.opener = null;
        }

        // Clean up the iframe after a moment
        setTimeout(() => {
            if (iframe.parentNode) {
                iframe.parentNode.removeChild(iframe);
            }
        }, 1000);
    }

window.addEventListener('load', ensurePageVisible);
window.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        ensurePageVisible();
    }
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

// Email Button Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Handle all email buttons
    document.querySelectorAll('.email-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const email = this.getAttribute('data-email');
            if (!email) return;
                const provider = this.getAttribute('data-provider');

            // Open mail client directly
                // Open with Gmail (app + web compose) when requested; otherwise mailto
                if (provider === 'gmail') {
                    openWithGmail(email);
                } else {
                    window.location.href = 'mailto:' + email;
                }

            // Ensure page remains visible when returning
            ensurePageVisible();
            window.addEventListener('focus', () => setTimeout(ensurePageVisible, 50), { once: true });
        });
    });
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

