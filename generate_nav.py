import os
import json
import re

base = 'doc-as-code-demo/blueprint-ai-assistant-ug'
subfolders = ['1-devin-drafted-chapters', '2-xml-converted-chapters']

def get_title_from_file(filepath):
    """Extract the first heading from a markdown file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read(4096)
        match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
        if match:
            return match.group(1).strip()
    except:
        pass
    # Fallback to filename
    filename = os.path.basename(filepath)
    return filename[:-3].replace('-', ' ').replace('_', ' ').strip()

chapters = []

for subfolder in subfolders:
    folder_path = os.path.join(base, subfolder)
    topics = []
    
    for root, dirs, files in os.walk(folder_path):
        for file in sorted(files):
            if file.endswith('.md'):
                full_path = os.path.join(root, file)
                rel_path = full_path.replace('\\', '/')
                title = get_title_from_file(full_path)
                topics.append({
                    'title': {'en': title},
                    'path': rel_path
                })
    
    # Use subfolder name as chapter title (cleaned up)
    chapter_title = subfolder.replace('-', ' ').replace('_', ' ').title()
    chapters.append({
        'title': {'en': chapter_title},
        'topics': topics
    })

nav_data = {'chapters': chapters}

with open('nav.json', 'w', encoding='utf-8') as f:
    json.dump(nav_data, f, indent=2)

print('nav.json generated successfully')
