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


// ========================================
// NAVIGATION MODULE
// ========================================
const Navigation = {
    init() {
        this.ensureSearchMarkup();
        this.setupActiveHighlight();
    },

    ensureSearchMarkup() {
        try {
            const navbarLeft = document.querySelector('.navbar-left');
            if (!navbarLeft || document.getElementById('search-input')) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'search-bar';
            wrapper.innerHTML = `
                <input type="text" id="search-input" placeholder="Search..." class="search-input" />
                <div id="search-results" class="search-results"></div>
            `;
            const logo = navbarLeft.querySelector('.logo');
            if (logo && logo.nextSibling) {
                logo.parentNode.insertBefore(wrapper, logo.nextSibling);
            } else {
                navbarLeft.appendChild(wrapper);
            }
        } catch (err) {
            console.error('ensureSearchMarkup error:', err);
        }
    },

    setupActiveHighlight() {
        const navLinks = document.querySelectorAll('.nav-links a');
        window.addEventListener('scroll', () => this.updateActiveLink(navLinks));
        navLinks.forEach(link => {
            link.addEventListener('click', () => setTimeout(() => this.updateActiveLink(navLinks), 100));
        });
        this.updateActiveLink(navLinks);
    },

    updateActiveLink(navLinks) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if ((currentPage === '' && href === 'index.html') || currentPage === href) {
                link.classList.add('active');
            }
        });
    }
};

// ========================================
// SCROLLING MODULE
// ========================================
const Scrolling = {
    init() {
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupScrollToTopButton();
        this.ensurePageVisible();
    },

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    },

    setupScrollAnimations() {
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.project-card, .project-full-card, .skill-item, section').forEach(el => {
            observer.observe(el);
        });
    },

    setupScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Scroll to top';
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    ensurePageVisible() {
        const makeVisible = () => {
            document.documentElement.style.visibility = 'visible';
            document.documentElement.style.opacity = '1';
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        };
        window.addEventListener('load', makeVisible);
        window.addEventListener('visibilitychange', () => {
            if (!document.hidden) makeVisible();
        });
    }
};

// ========================================
// SEARCH MODULE
// ========================================
const Search = {
    pages: [
        { name: 'index.html', title: 'Home' },
        { name: 'about.html', title: 'About' },
        { name: 'projects.html', title: 'Projects' }
    ],
    globalSearchIndex: [],

    init() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        if (!searchInput || !searchResults) return;

        this.globalSearchIndex = this.buildSearchIndex();
        this.setupEventListeners(searchInput, searchResults);
        this.highlightFromSession();
    },

    buildSearchIndex() {
        const index = [];
        document.querySelectorAll('h1, h2, h3, h4, p, li').forEach(element => {
            const text = element.textContent.trim();
            if (text.length > 0 && !element.closest('nav') && !element.closest('footer')) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                index.push({
                    text,
                    element,
                    heading: element.tagName,
                    page: currentPage,
                    pageTitle: this.pages.find(p => p.name === currentPage)?.title || 'Page'
                });
            }
        });
        return index;
    },

    setupEventListeners(searchInput, searchResults) {
        searchInput.addEventListener('input', (e) => this.performSearch(e.target.value, searchResults, searchInput));
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-bar')) {
                searchResults.classList.remove('active');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.classList.remove('active');
                searchInput.value = '';
            }
        });
    },

    performSearch(query, searchResults, searchInput) {
        searchResults.innerHTML = '';
        if (query.length === 0) {
            searchResults.classList.remove('active');
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matches = this.globalSearchIndex.filter(item => 
            item.text.toLowerCase().includes(lowerQuery)
        );

        if (matches.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No results found';
            noResults.style.opacity = '0.6';
            searchResults.appendChild(noResults);
            searchResults.classList.add('active');
            return;
        }

        matches.sort((a, b) => 
            a.text.toLowerCase().indexOf(lowerQuery) - b.text.toLowerCase().indexOf(lowerQuery)
        ).slice(0, 10).forEach(match => {
            this.createResultItem(match, searchResults, searchInput, lowerQuery);
        });

        searchResults.classList.add('active');
    },

    createResultItem(match, searchResults, searchInput, lowerQuery) {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        let title = match.text;
        if (title.length > 50) title = title.substring(0, 50) + '...';
        
        const highlightIndex = title.toLowerCase().indexOf(lowerQuery);
        if (highlightIndex !== -1) {
            const before = title.substring(0, highlightIndex);
            const matched = title.substring(highlightIndex, highlightIndex + lowerQuery.length);
            const after = title.substring(highlightIndex + lowerQuery.length);
            resultItem.innerHTML = `${before}<strong>${matched}</strong>${after}`;
        } else {
            resultItem.textContent = title;
        }

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        if (match.page !== currentPage) {
            const pageIndicator = document.createElement('div');
            pageIndicator.className = 'search-result-page';
            pageIndicator.textContent = `[${match.pageTitle}]`;
            resultItem.appendChild(pageIndicator);
        }

        resultItem.addEventListener('click', () => {
            if (match.page === currentPage) {
                match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                searchResults.classList.remove('active');
                searchInput.value = '';
                match.element.classList.add('highlight');
                setTimeout(() => match.element.classList.remove('highlight'), 2000);
            } else {
                sessionStorage.setItem('searchHighlight', match.text.substring(0, 30));
                window.location.href = match.page;
            }
        });

        searchResults.appendChild(resultItem);
    },

    highlightFromSession() {
        window.addEventListener('load', () => {
            const highlightTerm = sessionStorage.getItem('searchHighlight');
            if (highlightTerm) {
                for (let element of document.querySelectorAll('h1, h2, h3, h4, p, li')) {
                    if (element.textContent.toLowerCase().includes(highlightTerm.toLowerCase())) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        element.classList.add('highlight');
                        setTimeout(() => element.classList.remove('highlight'), 2000);
                        break;
                    }
                }
                sessionStorage.removeItem('searchHighlight');
            }
        });
    }
};

// ========================================
// EMAIL MODULE
// ========================================
const Email = {
    init() {
        this.setupEmailButtons();
        this.setupKeyboardNavigation();
    },

    setupEmailButtons() {
        document.querySelectorAll('.email-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const email = button.getAttribute('data-email');
                const provider = button.getAttribute('data-provider');
                if (!email) return;

                if (provider === 'gmail') {
                    this.openWithGmail(email);
                } else {
                    window.location.href = 'mailto:' + email;
                }

                this.ensureVisibility();
                window.addEventListener('focus', () => setTimeout(() => this.ensureVisibility(), 50), { once: true });
            });
        });
    },

    openWithGmail(email) {
        const encoded = encodeURIComponent(email);
        const gmailAppUrl = `googlegmail:///co?to=${encoded}`;
        const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encoded}`;

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = gmailAppUrl;
        document.body.appendChild(iframe);

        const newTab = window.open(gmailWebUrl, '_blank');
        if (newTab) newTab.opener = null;

        setTimeout(() => {
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
        }, 1000);
    },

    ensureVisibility() {
        document.documentElement.style.visibility = 'visible';
        document.documentElement.style.opacity = '1';
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
    },

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    window.location.href = 'index.html';
                }
            }
        });
    }
};

// ========================================
// UI MODULE
// ========================================
const UI = {
    init() {
        this.setupProjectCards();
        this.setupButtonEffects();
        this.setupImageLazyLoading();
    },

    setupProjectCards() {
        document.querySelectorAll('.project-full-card').forEach(card => {
            card.addEventListener('click', function() {
                this.classList.toggle('expanded');
            });
        });
    },

    setupButtonEffects() {
        document.querySelectorAll('.cta-button, .project-button').forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.href && button.href.startsWith('mailto:')) return;
                button.classList.add('clicked');
                setTimeout(() => button.classList.remove('clicked'), 600);
            });
        });
    },

    setupImageLazyLoading() {
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
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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

    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
    return false;
}


