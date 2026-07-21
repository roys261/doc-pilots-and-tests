# Documentation Portal - User Guide

This guide explains how to set up and run the documentation portal on your local machine.

## Requirements

- **Python 3.x** - Required for the HTTP server
  - Check if you have Python: `python --version` or `python3 --version`
  - Download from [python.org](https://python.org) if not installed
- **Modern web browser** - Chrome, Firefox, Safari, or Edge
- **Internet access** - Required for loading the Marked.js library (see offline option below)

## Quick Start

1. **Navigate to the repository directory**
   ```bash
   cd path/to/doc-pilots-and-tests
   ```

2. **Start the HTTP server**
   ```bash
   python -m http.server 8080
   ```
   - If port 8080 is in use, try a different port: `python -m http.server 3000`

3. **Open your browser**
   - Navigate to: `http://localhost:8080`
   - Or use the port you specified

## Features

- **Left navigation panel** - Browse chapters and topics
- **Collapsible chapters** - Click chapter headers to expand/collapse
- **Search** - Filter chapters and topics by typing in the search box
- **Dark/Light mode** - Toggle theme using the 🌙/☀️ button
- **Deep-linking** - Share specific pages via URL (e.g., `#chapter-01-overview/...`)
- **Browser navigation** - Use back/forward buttons to navigate history

## Adding New Content

To add a new chapter or topic:

1. **Add your Markdown file** to the appropriate directory
2. **Update `nav.json`** with the new entry:
   ```json
   {
     "chapters": [
       {
         "title": "New Chapter",
         "topics": [
           {
             "title": "New Topic",
             "path": "path/to/your/file.md"
           }
         ]
       }
     ]
   }
   ```
3. **Refresh your browser** - No server restart needed

## Offline Usage

If you need to use the portal without internet access:

1. Download `marked.min.js` from [cdn.jsdelivr.net](https://cdn.jsdelivr.net/npm/marked/marked.min.js)
2. Place it in the repository (e.g., in a `js/` directory)
3. Update `index.html` line 8:
   ```html
   <!-- Change from CDN -->
   <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
   
   <!-- To local file -->
   <script src="js/marked.min.js"></script>
   ```

## Troubleshooting

### "localhost didn't send any data"
- **Cause**: Port conflict or server not running
- **Solution**: 
  - Try a different port: `python -m http.server 3000`
  - Check if another process is using the port
  - Restart the server

### "Failed to load nav.json"
- **Cause**: Server not started from correct directory
- **Solution**: Ensure you're in the repository root directory when starting the server

### Styles not loading
- **Cause**: Incorrect directory structure
- **Solution**: Verify `css/style.css` and `js/app.js` exist in the correct locations

### Marked.js not loading
- **Cause**: No internet access or CDN blocked
- **Solution**: Use the offline method described above

## Alternative Servers

If you don't have Python installed, you can use other HTTP servers:

### Node.js
```bash
npx http-server -p 8080
```

### PHP
```bash
php -S localhost:8080
```

### Ruby
```bash
ruby -run -e httpd . -p 8080
```

## File Structure

```
doc-pilots-and-tests/
├── index.html              # Main HTML file
├── nav.json                # Navigation configuration
├── css/
│   └── style.css          # Styles and layout
├── js/
│   └── app.js             # Application logic
└── doc-as-code-demo/      # Your Markdown documentation files
    └── blueprint-ai-assistant-ug/
        └── chapters/
```

## Security Notes

- This is a local development server - not intended for production use
- For production deployment, consider using a proper web server (Nginx, Apache)
- The server serves files from the current directory and subdirectories

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify all files are in the correct locations
3. Ensure Python is properly installed
4. Check browser console for JavaScript errors (F12)
