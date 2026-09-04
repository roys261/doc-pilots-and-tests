# Nav.json Auto-Update Script

## Overview
The `update_nav.py` script automatically scans your `doc-as-code-demo` folder and updates the `nav.json` file with any new guides or topics you've added.

## Usage

### Basic Usage
```bash
python update_nav.py
```

### Command Line Options
```bash
# Preserve existing chapters and add/update new ones (default)
python update_nav.py preserve

# Regenerate entire nav.json from scratch (deletes customizations)
python update_nav.py regenerate
```

## How It Works

1. **Scans** the `doc-as-code-demo` directory for guide folders
2. **Detects** all markdown files (.md, .markdown) in each guide
3. **Updates** the nav.json file with:
   - New guide folders as new chapters
   - New markdown files as new topics
   - Updated topic lists for existing guides
   - Removal of deleted guides

## Features

- **Auto-detection**: Automatically finds new guide folders and markdown files
- **Smart merging**: Preserves existing chapter titles while updating topics
- **Deletion handling**: Removes chapters for deleted guide folders
- **Title generation**: Creates readable titles from folder/file names
- **Path management**: Automatically generates correct URL paths

## File Structure Requirements

Place your guides in the `doc-as-code-demo` folder:

```
doc-as-code-demo/
├── your-guide-1/
│   ├── README.md
│   ├── chapter-01/
│   │   └── index.md
│   └── chapter-02/
│       └── 01-topic.md
└── your-guide-2/
    └── README.md
```

## Workflow

1. **Add new guide**: Create a new folder in `doc-as-code-demo/`
2. **Add markdown files**: Add your .md files to the guide folder
3. **Run script**: `python update_nav.py preserve`
4. **Restart server**: Stop and restart the web server
5. **Refresh browser**: Clear cache (Ctrl+F5) to see changes

## Example

```bash
# 1. Create a new guide
mkdir doc-as-code-demo/my-new-guide
echo "# My New Guide" > doc-as-code-demo/my-new-guide/README.md

# 2. Update navigation
python update_nav.py preserve

# 3. Output shows:
# Found 3 guide(s):
#   - administrative-guide (23 topics)
#   - blueprint-ai-assistant-ug (42 topics)
#   - my-new-guide (1 topics)
# Added new chapter: My New Guide
# [SUCCESS] Navigation updated successfully!
```

## Notes

- The script preserves your custom chapter titles in preserve mode
- Hidden folders (starting with '.') are skipped
- Files are sorted alphabetically for consistent ordering
- Always backup your nav.json before using regenerate mode

## Troubleshooting

**Script doesn't detect new guides:**
- Ensure guides are in the `doc-as-code-demo` folder
- Check that folder names don't start with '.'
- Verify markdown files have .md or .markdown extension

**Navigation not updating in browser:**
- Restart the web server after running the script
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors