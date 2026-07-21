/**
 * Documentation Portal Application
 * Lightweight Markdown documentation viewer using vanilla JavaScript
 */

class DocumentationPortal {
    constructor() {
        this.navData = null;
        this.currentPath = null;
        this.chapters = [];
        
        // DOM elements
        this.navigationEl = document.getElementById('navigation');
        this.contentEl = document.getElementById('content');
        this.loadingEl = document.getElementById('loading');
        this.errorEl = document.getElementById('error');
        this.errorMessageEl = document.getElementById('errorMessage');
        this.searchInput = document.getElementById('searchInput');
        this.themeToggle = document.getElementById('themeToggle');
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    async init() {
        try {
            // Load navigation data
            await this.loadNavigation();
            
            // Build navigation UI
            this.buildNavigation();
            
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
        header.innerHTML = `
            <span>${chapter.title}</span>
            <span class="arrow">▼</span>
        `;
        
        const topicsDiv = document.createElement('div');
        topicsDiv.className = 'chapter-topics';
        
        chapter.topics.forEach((topic, topicIndex) => {
            const topicEl = document.createElement('div');
            topicEl.className = 'topic';
            topicEl.textContent = topic.title;
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
