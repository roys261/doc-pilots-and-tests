---
description: Create a lightweight documentation portal using HTML, CSS, and vanilla JavaScript
---

# Create Lightweight Documentation Portal

This workflow creates a documentation viewer that renders Markdown files as HTML using JavaScript, without any static site generator.

## Requirements

- GitHub repository with Markdown documentation files
- No static site generator (MkDocs, Docusaurus, Jekyll, Hugo, GitHub Pages)
- Uses HTML, CSS, Vanilla JavaScript, and Marked.js
- Must work locally with `python -m http.server 8000`

## Features

- Left navigation panel with collapsible chapters
- Main content panel for rendered Markdown
- Navigation generated dynamically from nav.json
- Responsive layout with professional documentation UI
- Loading states and error handling
- Deep-linking via hash URLs (#chapter-01-introduction/architecture.md)
- Browser back/forward button support
- Search functionality for filtering chapters/topics
- Light/dark mode toggle
- Auto-load first document on startup

## Files to Create

1. **nav.json** - Navigation structure configuration
2. **index.html** - Main HTML structure
3. **css/style.css** - Styling and layout
4. **js/app.js** - Application logic

## Implementation Steps

### 1. Create nav.json

Define the navigation structure with chapters and topics. Each topic should have:
- `title`: Display name
- `path`: Path to the Markdown file relative to the repository root

Example structure:
```json
{
  "chapters": [
    {
      "title": "Chapter 1: Overview",
      "topics": [
        {
          "title": "Blueprint Assist Overview",
          "path": "doc-as-code-demo/blueprint-ai-assistant-ug/chapters/chapter-01-overview/01-dap_das_c_bp-assist_overview.md"
        }
      ]
    }
  ]
}
```

### 2. Create index.html

HTML structure with:
- Sidebar for navigation
- Main content area for rendered Markdown
- Search box
- Dark mode toggle
- Include Marked.js from CDN

### 3. Create css/style.css

Professional documentation styling:
- Fixed sidebar (250px width)
- Scrollable content area
- Responsive design (mobile-friendly)
- Light/dark mode styles
- Markdown content styling
- Loading and error states

### 4. Create js/app.js

JavaScript functionality:
- Parse nav.json and build navigation tree
- Handle chapter collapse/expand
- Load and render Markdown files using Marked.js
- Handle hash URL navigation and browser history
- Implement search functionality
- Dark mode toggle with localStorage persistence
- Error handling for missing files
- Auto-load first document on startup

## Usage

1. Start local server: `python -m http.server 8000`
2. Open browser: `http://localhost:8000`
3. Navigate documentation using sidebar or hash URLs

## Adding New Content

To add a new chapter or topic:
1. Add the Markdown file to the repository
2. Update nav.json with the new entry
3. Refresh the browser

No code changes required.
