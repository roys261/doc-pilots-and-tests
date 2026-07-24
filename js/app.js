/**
 * Documentation Portal Application
 * Lightweight Markdown documentation viewer using vanilla JavaScript
 */

class DocumentationPortal {
    constructor() {
        this.navData = null;
        this.currentPath = null;
        this.chapters = [];
        this.currentLanguage = 'en';
        this.translations = null;
        this.isResizing = false;
        this.startX = 0;
        this.startWidth = 0;
        
        // DOM elements
        this.navigationEl = document.getElementById('navigation');
        this.contentEl = document.getElementById('content');
        this.loadingEl = document.getElementById('loading');
        this.errorEl = document.getElementById('error');
        this.errorMessageEl = document.getElementById('errorMessage');
        this.searchInput = document.getElementById('searchInput');
        this.themeToggle = document.getElementById('themeToggle');
        this.languageSelector = document.getElementById('languageSelector');
        this.resizeHandle = document.getElementById('resizeHandle');
        this.sidebar = document.querySelector('.sidebar');
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Load translations
            await this.loadTranslations();
            
            // Initialize language from localStorage or URL
            this.initLanguage();
            
            // Initialize sidebar width from localStorage
            this.initSidebarWidth();
            
            // Load navigation data
            await this.loadNavigation();
            
            // Build navigation UI
            this.buildNavigation();
            
            // Apply translations to UI
            this.applyTranslations();
            
            // Initialize theme
            this.initTheme();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Handle initial route
            this.handleInitialRoute();
            
        } catch (error) {
            this.showError('Failed to initialize application: ' + error.message);
        }
    }
    
    /**
     * Load translations from translations.json
     */
    async loadTranslations() {
        try {
            const response = await fetch('translations.json');
            if (!response.ok) {
                throw new Error('Failed to load translations');
            }
            this.translations = await response.json();
        } catch (error) {
            throw new Error('Could not load translations.json: ' + error.message);
        }
    }
    
    /**
     * Initialize language from localStorage or URL
     */
    initLanguage() {
        // Check URL for language parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLanguage = urlParams.get('lang');
        
        // Check localStorage for saved language preference
        const savedLanguage = localStorage.getItem('language');
        
        // Use URL language if present, otherwise use saved preference, default to 'en'
        this.currentLanguage = urlLanguage || savedLanguage || 'en';
        
        // Update language selector
        if (this.languageSelector) {
            this.languageSelector.value = this.currentLanguage;
        }
        
        // Save to localStorage
        localStorage.setItem('language', this.currentLanguage);
    }
    
    /**
     * Initialize sidebar width from localStorage
     */
    initSidebarWidth() {
        const savedWidth = localStorage.getItem('sidebarWidth');
        if (savedWidth && this.sidebar) {
            const width = parseInt(savedWidth, 10);
            // Ensure width is within min/max bounds
            if (width >= 200 && width <= 500) {
                this.sidebar.style.width = width + 'px';
                document.documentElement.style.setProperty('--sidebar-width', width + 'px');
            }
        }
    }
    
    /**
     * Load navigation data from nav.json
     */
    async loadNavigation() {
        try {
            const response = await fetch('nav.json');
            if (!response.ok) {
                throw new Error('Failed to load navigation data');
            }
            this.navData = await response.json();
        } catch (error) {
            throw new Error('Could not load nav.json: ' + error.message);
        }
    }
    
    /**
     * Apply translations to UI elements
     */
    applyTranslations() {
        if (!this.translations || !this.translations[this.currentLanguage]) {
            return;
        }
        
        const t = this.translations[this.currentLanguage];
        
        // Update search placeholder
        if (this.searchInput && t.searchPlaceholder) {
            this.searchInput.placeholder = t.searchPlaceholder;
        }
        
        // Update loading text
        const loadingText = this.loadingEl.querySelector('p');
        if (loadingText && t.loading) {
            loadingText.textContent = t.loading;
        }
        
        // Update error text
        const errorTitle = this.errorEl.querySelector('h2');
        if (errorTitle && t.error) {
            errorTitle.textContent = t.error;
        }
        
        if (this.errorMessageEl && t.errorMessage) {
            this.errorMessageEl.textContent = t.errorMessage;
        }
        
        // Update documentation title
        const docTitle = document.querySelector('.sidebar-header h1');
        if (docTitle && t.documentation) {
            docTitle.textContent = t.documentation;
        }
        
        // Update theme toggle aria-label
        if (this.themeToggle && t.themeToggle) {
            this.themeToggle.setAttribute('aria-label', t.themeToggle);
        }
    }
    
    /**
     * Get localized text for a key
     */
    getLocalizedText(key) {
        if (!this.translations || !this.translations[this.currentLanguage]) {
            return key;
        }
        return this.translations[this.currentLanguage][key] || key;
    }
    
    /**
     * Get localized title from chapter or topic
     */
    getLocalizedTitle(titleObj) {
        if (typeof titleObj === 'string') {
            return titleObj;
        }
        return titleObj[this.currentLanguage] || titleObj['en'] || Object.values(titleObj)[0];
    }
    
    /**
     * Build navigation UI from nav.json data
     */
    buildNavigation() {
        this.navigationEl.innerHTML = '';
        this.chapters = [];
        
        this.navData.chapters.forEach((chapter, chapterIndex) => {
            const chapterEl = this.createChapterElement(chapter, chapterIndex);
            this.navigationEl.appendChild(chapterEl);
            this.chapters.push({
                element: chapterEl,
                topics: chapter.topics
            });
        });
    }
    
    /**
     * Create a chapter DOM element
     */
    createChapterElement(chapter, chapterIndex) {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter';
        chapterDiv.dataset.chapterIndex = chapterIndex;
        
        const header = document.createElement('div');
        header.className = 'chapter-header';
        const chapterTitle = this.getLocalizedTitle(chapter.title);
        header.innerHTML = `
            <span>${chapterTitle}</span>
            <span class="arrow">▼</span>
        `;
        
        const topicsDiv = document.createElement('div');
        topicsDiv.className = 'chapter-topics';
        
        chapter.topics.forEach((topic, topicIndex) => {
            const topicEl = document.createElement('div');
            topicEl.className = 'topic';
            const topicTitle = this.getLocalizedTitle(topic.title);
            topicEl.textContent = topicTitle;
            topicEl.dataset.path = topic.path;
            topicEl.dataset.chapterIndex = chapterIndex;
            topicEl.dataset.topicIndex = topicIndex;
            topicsDiv.appendChild(topicEl);
        });
        
        chapterDiv.appendChild(header);
        chapterDiv.appendChild(topicsDiv);
        
        // Add click handler for chapter header
        header.addEventListener('click', () => {
            this.toggleChapter(chapterDiv);
        });
        
        // Add click handlers for topics
        topicsDiv.querySelectorAll('.topic').forEach(topicEl => {
            topicEl.addEventListener('click', () => {
                this.loadTopic(topicEl.dataset.path, topicEl);
            });
        });
        
        return chapterDiv;
    }
    
    /**
     * Toggle chapter collapse/expand
     */
    toggleChapter(chapterEl) {
        chapterEl.classList.toggle('collapsed');
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Hash change for browser navigation
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // Search input
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Language selector
        if (this.languageSelector) {
            this.languageSelector.addEventListener('change', (e) => this.handleLanguageChange(e.target.value));
        }
        
        // Sidebar resize
        if (this.resizeHandle) {
            this.resizeHandle.addEventListener('mousedown', (e) => this.startResize(e));
        }
        
        // Window resize events
        window.addEventListener('mousemove', (e) => this.handleResize(e));
        window.addEventListener('mouseup', () => this.stopResize());
    }
    
    /**
     * Handle language change
     */
    handleLanguageChange(newLanguage) {
        this.currentLanguage = newLanguage;
        
        // Save to localStorage
        localStorage.setItem('language', newLanguage);
        
        // Update URL parameter
        const url = new URL(window.location);
        url.searchParams.set('lang', newLanguage);
        window.history.replaceState({}, '', url);
        
        // Rebuild navigation with new language
        this.buildNavigation();
        
        // Apply translations
        this.applyTranslations();
        
        // Reload current topic if exists
        if (this.currentPath) {
            this.loadTopic(this.currentPath);
        } else {
            this.loadFirstDocument();
        }
    }
    
    /**
     * Handle initial route on page load
     */
    handleInitialRoute() {
        const hash = window.location.hash.slice(1); // Remove #
        
        if (hash) {
            this.loadTopic(hash);
        } else {
            // Load first document
            this.loadFirstDocument();
        }
    }
    
    /**
     * Handle hash change (browser back/forward)
     */
    handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            this.loadTopic(hash);
        }
    }
    
    /**
     * Load the first document in the navigation
     */
    loadFirstDocument() {
        if (this.navData.chapters.length > 0 && 
            this.navData.chapters[0].topics.length > 0) {
            const firstTopic = this.navData.chapters[0].topics[0];
            this.loadTopic(firstTopic.path);
        }
    }
    
    /**
     * Load a topic by path
     */
    async loadTopic(path, topicEl = null) {
        // Update URL hash
        window.location.hash = path;
        
        // Update active state in navigation
        this.updateActiveTopic(path, topicEl);
        
        // Show loading state
        this.showLoading();
        
        try {
            // Fetch markdown file
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`Failed to load: ${path}`);
            }
            
            const markdown = await response.text();
            
            // Render markdown to HTML
            const html = marked.parse(markdown);
            
            // Display content
            this.contentEl.innerHTML = html;
            this.hideLoading();
            this.hideError();
            
            this.currentPath = path;
            
        } catch (error) {
            this.hideLoading();
            this.showError(`Failed to load document: ${error.message}`);
        }
    }
    
    /**
     * Update active topic in navigation
     */
    updateActiveTopic(path, clickedTopicEl) {
        // Remove active class from all topics
        document.querySelectorAll('.topic').forEach(el => {
            el.classList.remove('active');
        });
        
        // Add active class to current topic
        if (clickedTopicEl) {
            clickedTopicEl.classList.add('active');
        } else {
            // Find topic by path
            const topicEl = document.querySelector(`.topic[data-path="${path}"]`);
            if (topicEl) {
                topicEl.classList.add('active');
                
                // Expand parent chapter
                const chapterEl = topicEl.closest('.chapter');
                if (chapterEl) {
                    chapterEl.classList.remove('collapsed');
                }
            }
        }
    }
    
    /**
     * Handle search functionality
     */
    handleSearch(query) {
        const lowerQuery = query.toLowerCase();
        
        this.chapters.forEach(chapter => {
            const topics = chapter.element.querySelectorAll('.topic');
            let chapterHasMatch = false;
            
            topics.forEach(topic => {
                const topicText = topic.textContent.toLowerCase();
                const topicPath = topic.dataset.path.toLowerCase();
                
                if (topicText.includes(lowerQuery) || topicPath.includes(lowerQuery)) {
                    topic.classList.remove('hidden');
                    chapterHasMatch = true;
                } else {
                    topic.classList.add('hidden');
                }
            });
            
            // Expand chapter if it has matching topics
            if (chapterHasMatch && query) {
                chapter.element.classList.remove('collapsed');
            }
        });
    }
    
    /**
     * Initialize theme from localStorage or system preference
     */
    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.themeToggle.querySelector('.theme-icon').textContent = '☀️';
        }
    }
    
    /**
     * Toggle between light and dark theme
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const icon = this.themeToggle.querySelector('.theme-icon');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            icon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            icon.textContent = '☀️';
        }
    }
    
    /**
     * Start sidebar resize
     */
    startResize(e) {
        this.isResizing = true;
        this.startX = e.clientX;
        this.startWidth = this.sidebar.offsetWidth;
        
        if (this.resizeHandle) {
            this.resizeHandle.classList.add('resizing');
        }
        
        document.body.classList.add('resizing');
        
        // Prevent text selection during resize
        e.preventDefault();
    }
    
    /**
     * Handle sidebar resize
     */
    handleResize(e) {
        if (!this.isResizing) return;
        
        const deltaX = e.clientX - this.startX;
        const newWidth = this.startWidth + deltaX;
        
        // Constrain width between min and max
        const minWidth = 200;
        const maxWidth = 500;
        const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        
        if (this.sidebar) {
            this.sidebar.style.width = constrainedWidth + 'px';
            document.documentElement.style.setProperty('--sidebar-width', constrainedWidth + 'px');
        }
    }
    
    /**
     * Stop sidebar resize
     */
    stopResize() {
        if (!this.isResizing) return;
        
        this.isResizing = false;
        
        if (this.resizeHandle) {
            this.resizeHandle.classList.remove('resizing');
        }
        
        document.body.classList.remove('resizing');
        
        // Save the final width to localStorage
        if (this.sidebar) {
            const finalWidth = this.sidebar.offsetWidth;
            localStorage.setItem('sidebarWidth', finalWidth.toString());
        }
    }
    
    /**
     * Show loading state
     */
    showLoading() {
        this.loadingEl.classList.remove('hidden');
        this.contentEl.classList.add('hidden');
    }
    
    /**
     * Hide loading state
     */
    hideLoading() {
        this.loadingEl.classList.add('hidden');
        this.contentEl.classList.remove('hidden');
    }
    
    /**
     * Show error message
     */
    showError(message) {
        this.errorMessageEl.textContent = message;
        this.errorEl.classList.remove('hidden');
        this.contentEl.classList.add('hidden');
    }
    
    /**
     * Hide error message
     */
    hideError() {
        this.errorEl.classList.add('hidden');
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DocumentationPortal();
});
