#!/usr/bin/env python3
"""
Simple web server with markdown rendering for documentation
Serves both administrative-guide and blueprint-ai-assistant-ug
"""

import os
import markdown
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import unquote
import mimetypes

class MarkdownHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.extensions_map['.md'] = 'text/markdown'
        self.extensions_map['.markdown'] = 'text/markdown'

    def do_GET(self):
        # Parse the path
        path = unquote(self.path)
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # Default to index page
        if not path or path == '/':
            path = 'index.html'
        
        # Check if it's a markdown file
        if path.endswith('.md') or path.endswith('.markdown'):
            self.serve_markdown(path)
        elif path.endswith('.html'):
            self.serve_html(path)
        else:
            # Default to directory listing or file serving
            super().do_GET()

    def serve_markdown(self, path):
        """Serve markdown file as rendered HTML"""
        try:
            # Try to find the file in either guide directory
            file_path = self.find_file(path)
            
            if not file_path or not os.path.exists(file_path):
                self.send_error(404, "File not found")
                return
            
            # Read markdown content
            with open(file_path, 'r', encoding='utf-8') as f:
                md_content = f.read()
            
            # Convert to HTML
            html_content = markdown.markdown(
                md_content,
                extensions=['extra', 'tables', 'toc', 'fenced_code', 'nl2br', 'sane_lists']
            )
            
            # Generate HTML page
            html_page = self.generate_html_page(path, html_content)
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(html_page.encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error processing markdown: {str(e)}")

    def serve_html(self, path):
        """Serve HTML file"""
        try:
            file_path = self.find_file(path)
            
            if not file_path or not os.path.exists(file_path):
                self.send_error(404, "File not found")
                return
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))
            
        except Exception as e:
            self.send_error(500, f"Error serving HTML: {str(e)}")

    def find_file(self, path):
        """Find file in either administrative-guide or blueprint-ai-assistant-ug"""
        # Current directory
        current_dir = os.getcwd()
        
        # Try exact path first
        exact_path = os.path.join(current_dir, path)
        if os.path.exists(exact_path):
            return exact_path
        
        # Try in administrative-guide
        admin_path = os.path.join(current_dir, 'administrative-guide', path)
        if os.path.exists(admin_path):
            return admin_path
        
        # Try in blueprint-ai-assistant-ug
        blueprint_path = os.path.join(current_dir, 'doc-as-code-demo', 'blueprint-ai-assistant-ug', path)
        if os.path.exists(blueprint_path):
            return blueprint_path
        
        # Try with index.md if directory
        if os.path.isdir(exact_path):
            index_path = os.path.join(exact_path, 'index.md')
            if os.path.exists(index_path):
                return index_path
            index_path = os.path.join(exact_path, 'README.md')
            if os.path.exists(index_path):
                return index_path
        
        return None

    def generate_html_page(self, path, content):
        """Generate complete HTML page with navigation"""
        # Determine which guide this is
        if 'administrative-guide' in path or path.startswith('chapter-') or path.startswith('appendix'):
            guide_name = "VMware on Dell Private Cloud Administrative Guide"
            guide_path = "administrative-guide"
        else:
            guide_name = "Blueprint AI Assistant User Guide"
            guide_path = "doc-as-code-demo/blueprint-ai-assistant-ug"
        
        # Generate navigation
        nav_html = self.generate_navigation(guide_path)
        
        html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{guide_name}</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }}
        .container {{
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }}
        .header {{
            border-bottom: 2px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }}
        .header h1 {{
            color: #007bff;
            margin: 0;
        }}
        .nav {{
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }}
        .nav h3 {{
            margin-top: 0;
            color: #495057;
        }}
        .nav ul {{
            list-style-type: none;
            padding-left: 0;
        }}
        .nav li {{
            margin: 5px 0;
        }}
        .nav a {{
            color: #007bff;
            text-decoration: none;
        }}
        .nav a:hover {{
            text-decoration: underline;
        }}
        .content {{
            line-height: 1.8;
        }}
        .content h1, .content h2, .content h3 {{
            color: #212529;
            margin-top: 30px;
        }}
        .content code {{
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }}
        .content pre {{
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
        .content pre code {{
            background-color: transparent;
            padding: 0;
        }}
        .content table {{
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }}
        .content th, .content td {{
            border: 1px solid #dee2e6;
            padding: 8px 12px;
            text-align: left;
        }}
        .content th {{
            background-color: #e9ecef;
        }}
        .toc {{
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }}
        .toc ul {{
            padding-left: 20px;
        }}
        .toc a {{
            color: #007bff;
            text-decoration: none;
        }}
        .toc a:hover {{
            text-decoration: underline;
        }}
        .back-link {{
            display: inline-block;
            margin-bottom: 20px;
            color: #007bff;
            text-decoration: none;
        }}
        .back-link:hover {{
            text-decoration: underline;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{guide_name}</h1>
        </div>
        
        <div class="nav">
            <h3>Documentation Navigation</h3>
            {nav_html}
        </div>
        
        <div class="content">
            {content}
        </div>
    </div>
</body>
</html>"""
        return html

    def generate_navigation(self, guide_path):
        """Generate navigation HTML for the guide"""
        current_dir = os.getcwd()
        full_guide_path = os.path.join(current_dir, guide_path)
        
        if not os.path.exists(full_guide_path):
            return "<p>Guide directory not found</p>"
        
        # Get all markdown files
        nav_items = []
        
        if os.path.isfile(os.path.join(full_guide_path, 'README.md')):
            nav_items.append('<li><a href="/">Home (README)</a></li>')
        elif os.path.isfile(os.path.join(full_guide_path, 'index.md')):
            nav_items.append('<li><a href="/">Home (index)</a></li>')
        
        # Walk through directories
        for root, dirs, files in os.walk(full_guide_path):
            # Skip hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                if file.endswith('.md') or file.endswith('.markdown'):
                    # Get relative path from guide root
                    rel_path = os.path.relpath(os.path.join(root, file), full_guide_path)
                    # Convert to URL path
                    url_path = rel_path.replace('\\', '/')
                    
                    # Get display name
                    display_name = file.replace('.md', '').replace('.markdown', '')
                    if display_name.lower() in ['readme', 'index']:
                        dir_name = os.path.basename(root)
                        if dir_name != os.path.basename(full_guide_path):
                            display_name = f"{dir_name} - {display_name}"
                    
                    nav_items.append(f'<li><a href="/{url_path}">{display_name}</a></li>')
        
        if not nav_items:
            return "<p>No documentation files found</p>"
        
        return '<ul>' + ''.join(nav_items) + '</ul>'

def run_server(port=8080):
    """Start the web server"""
    server_address = ('', port)
    httpd = HTTPServer(server_address, MarkdownHTTPRequestHandler)
    
    print(f"Starting documentation server on port {port}")
    print(f"Access the guides at: http://localhost:{port}")
    print(f"Administrative Guide: http://localhost:{port}/administrative-guide/README.md")
    print(f"Blueprint AI Assistant Guide: http://localhost:{port}/doc-as-code-demo/blueprint-ai-assistant-ug/README.md")
    print("Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped")

if __name__ == '__main__':
    # Change to the doc-pilots-and-tests directory
    os.chdir(r'C:\Users\roys26\CascadeProjects\doc-pilots-and-tests')
    run_server(8080)