# Course XML Generator Script

This Python script generates XML files for courses, chapters, sequentials, and verticals based on data from a CSV file. It organizes the files into folders and ensures all relationships are correctly represented.

## What Does This Script Do?

1. **Reads a CSV File**: The script reads data from a CSV file containing course structures (e.g., course name, chapter name, sequential name, vertical name).
2. **Generates XML Files**: It creates XML files for:
   - Courses
   - Chapters
   - Sequentials
   - Verticals
3. **Organizes Files**: The output is organized into folders:
   - `course/` for the main course XML file.
   - `chapters/`, `sequentials/`, and `verticals/` for respective XML files.
4. **Uses UUIDs**: All files use unique IDs (UUIDs) for naming to avoid conflicts.
5. **Customizable Wiki Slug**: The script prompts you to input components for the wiki slug used in the course XML.

## How to Use

1. Place your CSV file (`product.csv`) in the same directory as the script.
2. Run the script:
   ```bash
   python script.py
   ```
3. Follow the prompts to enter values for `organization name`, `course no`, and `course run`.
4. Check the `output/` folder for the generated files.

## Example Output

- **Course Folder**: `output/course/course_run.xml`
- **Chapter Files**: `output/chapters/UUID.xml`
- **Sequential Files**: `output/sequentials/UUID.xml`
- **Vertical Files**: `output/verticals/UUID.xml`

That's it! This script simplifies the process of generating structured XML files for course content.