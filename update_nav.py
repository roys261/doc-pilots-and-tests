#!/usr/bin/env python3
"""
Auto-update script for nav.json
Scans doc-as-code-demo directory and updates navigation with new guides and topics
"""

import os
import json
from pathlib import Path

def scan_directory_for_guides(base_path):
    """Scan directory for guide folders and their markdown files"""
    guides = []
    
    if not os.path.exists(base_path):
        print(f"Directory not found: {base_path}")
        return guides
    
    for item in os.listdir(base_path):
        item_path = os.path.join(base_path, item)
        
        # Skip if not a directory or if it's hidden
        if not os.path.isdir(item_path) or item.startswith('.'):
            continue
        
        guide_info = {
            'name': item,
            'path': item_path,
            'topics': []
        }
        
        # Scan for markdown files in this guide
        for root, dirs, files in os.walk(item_path):
            # Skip hidden directories
            dirs[:] = [d for d in dirs if not d.startswith('.')]
            
            for file in files:
                if file.endswith('.md') or file.endswith('.markdown'):
                    # Get relative path from base_path
                    rel_path = os.path.relpath(os.path.join(root, file), base_path)
                    # Convert to URL path (forward slashes)
                    url_path = rel_path.replace('\\', '/')
                    
                    # Generate title from filename
                    title = file.replace('.md', '').replace('.markdown', '')
                    title = title.replace('-', ' ').replace('_', ' ')
                    title = ' '.join(word.capitalize() for word in title.split())
                    
                    guide_info['topics'].append({
                        'title': title,
                        'path': f"doc-as-code-demo/{url_path}"
                    })
        
        # Sort topics by path for consistent ordering
        guide_info['topics'].sort(key=lambda x: x['path'])
        
        if guide_info['topics']:
            guides.append(guide_info)
    
    return guides

def generate_nav_json(guides, existing_nav=None):
    """Generate nav.json structure from scanned guides"""
    chapters = []
    
    for guide in guides:
        # Format guide name for title
        guide_title = guide['name'].replace('-', ' ').replace('_', ' ')
        guide_title = ' '.join(word.capitalize() for word in guide_title.split())
        
        # Try to match with existing chapter titles
        matched_chapter = None
        if existing_nav:
            for existing_chapter in existing_nav.get('chapters', []):
                existing_title = existing_chapter.get('title', {}).get('en', '').lower()
                # Check for partial match or similar names
                if (guide_title.lower() in existing_title or 
                    existing_title in guide_title.lower() or
                    guide['name'].lower() in existing_title.replace(' ', '-').lower()):
                    matched_chapter = existing_chapter
                    guide_title = existing_chapter.get('title', {}).get('en', guide_title)
                    break
        
        chapter = {
            "title": {
                "en": guide_title
            },
            "topics": []
        }
        
        # Add topics
        for topic in guide['topics']:
            chapter['topics'].append({
                "title": {
                    "en": topic['title']
                },
                "path": topic['path']
            })
        
        chapters.append(chapter)
    
    nav_data = {
        "chapters": chapters
    }
    
    return nav_data

def update_nav_json(nav_file_path, base_path, preserve_existing=True):
    """Update nav.json with new guides and topics"""
    
    # Scan for guides
    print(f"Scanning {base_path} for guides...")
    guides = scan_directory_for_guides(base_path)
    
    if not guides:
        print("No guides found!")
        return False
    
    print(f"Found {len(guides)} guide(s):")
    for guide in guides:
        print(f"  - {guide['name']} ({len(guide['topics'])} topics)")
    
    # Load existing nav.json if preserving
    existing_nav = None
    if preserve_existing and os.path.exists(nav_file_path):
        try:
            with open(nav_file_path, 'r', encoding='utf-8') as f:
                existing_nav = json.load(f)
            print(f"Loaded existing nav.json with {len(existing_nav.get('chapters', []))} chapters")
        except Exception as e:
            print(f"Error loading existing nav.json: {e}")
            existing_nav = None
    
    # Generate new nav structure
    new_nav = generate_nav_json(guides, existing_nav)
    
    # If preserving existing, merge the data
    if preserve_existing and existing_nav:
        # Create a map of existing chapters by normalized name
        existing_chapters_map = {}
        for chapter in existing_nav.get('chapters', []):
            title = chapter.get('title', {}).get('en', '')
            normalized_name = title.lower().replace(' ', '-')
            if title:
                existing_chapters_map[normalized_name] = chapter
        
        # Create map of new chapters
        new_chapters_map = {}
        for new_chapter in new_nav.get('chapters', []):
            title = new_chapter.get('title', {}).get('en', '')
            normalized_name = title.lower().replace(' ', '-')
            if title:
                new_chapters_map[normalized_name] = new_chapter
        
        # Merge: keep existing chapters, update existing ones, add new ones, remove deleted ones
        merged_chapters = []
        
        # First, update or add new chapters
        for normalized_name, new_chapter in new_chapters_map.items():
            if normalized_name in existing_chapters_map:
                # Update existing chapter with new topics
                existing_chapter = existing_chapters_map[normalized_name]
                existing_chapter['topics'] = new_chapter['topics']
                merged_chapters.append(existing_chapter)
                print(f"Updated chapter: {existing_chapter['title']['en']}")
            else:
                # Add new chapter
                merged_chapters.append(new_chapter)
                print(f"Added new chapter: {new_chapter['title']['en']}")
        
        # Then remove chapters that no longer exist
        for normalized_name, existing_chapter in existing_chapters_map.items():
            if normalized_name not in new_chapters_map:
                print(f"Removed deleted chapter: {existing_chapter['title']['en']}")
        
        new_nav['chapters'] = merged_chapters
    
    # Write updated nav.json
    try:
        with open(nav_file_path, 'w', encoding='utf-8') as f:
            json.dump(new_nav, f, indent=2, ensure_ascii=False)
        print(f"[OK] Updated {nav_file_path} with {len(new_nav['chapters'])} chapters")
        return True
    except Exception as e:
        print(f"Error writing nav.json: {e}")
        return False

def main():
    import sys
    
    # Configuration
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(script_dir, 'doc-as-code-demo')
    nav_file_path = os.path.join(script_dir, 'nav.json')
    
    print("=" * 50)
    print("Nav.json Auto-Update Script")
    print("=" * 50)
    
    # Parse command line arguments
    preserve_existing = True
    if len(sys.argv) > 1:
        mode = sys.argv[1].lower()
        if mode == 'regenerate' or mode == '2':
            preserve_existing = False
            print("Mode: Regenerate entire nav.json")
        elif mode == 'preserve' or mode == '1':
            preserve_existing = True
            print("Mode: Preserve existing chapters and add new ones")
        else:
            print(f"Unknown mode: {mode}. Defaulting to preserve mode.")
    else:
        print("Mode: Preserve existing chapters and add new ones (default)")
        print("Usage: python update_nav.py [preserve|regenerate]")
    
    # Update nav.json
    success = update_nav_json(nav_file_path, base_path, preserve_existing)
    
    if success:
        print("\n[SUCCESS] Navigation updated successfully!")
        print("Restart the web server and refresh your browser to see changes.")
    else:
        print("\n[ERROR] Failed to update navigation")

if __name__ == '__main__':
    main()