import csv
import os
import uuid

def generate_course_xml(course_name, chapters, wiki_slug):
    xml_content = f'<course cert_html_view_enabled="true" discussions_settings="{{\"enable_in_context\": true, \"enable_graded_units\": false, \"unit_level_visibility\": true, \"provider_type\": \"openedx\"}}" display_name="{course_name}" instructor_info="{{\"instructors\": []}}" language="en" learning_info="[]" start="2024-01-01T00:00:00Z">\n'
    for chapter_url in chapters:
        xml_content += f'  <chapter url_name="{chapter_url}"/>\n'
    xml_content += f'  <wiki slug="{wiki_slug}"/>\n'
    xml_content += '</course>'
    return xml_content

def generate_chapter_xml(chapter_name, sequentials):
    xml_content = f'<chapter display_name="{chapter_name}">\n'
    for sequential_url in sequentials:
        xml_content += f'  <sequential url_name="{sequential_url}"/>\n'
    xml_content += '</chapter>'
    return xml_content

def generate_sequential_xml(sequential_name, verticals):
    xml_content = f'<sequential display_name="{sequential_name}">\n'
    for vertical_url in verticals:
        xml_content += f'  <vertical url_name="{vertical_url}"/>\n'
    xml_content += '</sequential>'
    return xml_content

def generate_vertical_xml(vertical_name):
    return f'<vertical display_name="{vertical_name}"/>'

def process_csv(input_file):
    alnafi = input("Enter 'organization name' component for wiki slug: ")
    sysops01 = input("Enter 'course_no' component for wiki slug: ")
    sysops_01 = input("Enter 'course_run' component for wiki slug: ")
    wiki_slug = f"{alnafi}.{sysops01}.{sysops_01}"
    courses = {}

    with open(input_file, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            course_name = row['Course Name']
            chapter_name = row['Chapter Name']
            sequential_name = row['Sequetial Name']
            vertical_name = row['Vertical Name']

            if course_name not in courses:
                courses[course_name] = {
                    'chapters': {}
                }

            if chapter_name not in courses[course_name]['chapters']:
                courses[course_name]['chapters'][chapter_name] = {
                    'sequentials': {}
                }

            if sequential_name not in courses[course_name]['chapters'][chapter_name]['sequentials']:
                courses[course_name]['chapters'][chapter_name]['sequentials'][sequential_name] = {
                    'verticals': []
                }

            if vertical_name not in courses[course_name]['chapters'][chapter_name]['sequentials'][sequential_name]['verticals']:
                courses[course_name]['chapters'][chapter_name]['sequentials'][sequential_name]['verticals'].append(vertical_name)

    for course_name, course_data in courses.items():
        print(f"Processing course: {course_name}")

        output_folder = 'output'
        os.makedirs(output_folder, exist_ok=True)

        chapters = []
        for chapter_name in course_data['chapters']:
            chapter_url = uuid.uuid4().hex
            chapters.append(chapter_url)

            chapter_file_path = os.path.join(output_folder, 'chapters', f'{chapter_url}.xml')
            os.makedirs(os.path.dirname(chapter_file_path), exist_ok=True)

            sequentials = []
            for sequential_name in course_data['chapters'][chapter_name]['sequentials']:
                sequential_url = uuid.uuid4().hex
                sequentials.append(sequential_url)

                sequential_file_path = os.path.join(output_folder, 'sequentials', f'{sequential_url}.xml')
                os.makedirs(os.path.dirname(sequential_file_path), exist_ok=True)

                verticals = []
                for vertical_name in course_data['chapters'][chapter_name]['sequentials'][sequential_name]['verticals']:
                    vertical_url = uuid.uuid4().hex
                    verticals.append(vertical_url)

                    vertical_file_path = os.path.join(output_folder, 'verticals', f'{vertical_url}.xml')
                    os.makedirs(os.path.dirname(vertical_file_path), exist_ok=True)

                    with open(vertical_file_path, 'w', encoding='utf-8') as vertical_file:
                        vertical_file.write(generate_vertical_xml(vertical_name))
                        print(f"Created vertical file: {vertical_file_path}")

                with open(sequential_file_path, 'w', encoding='utf-8') as sequential_file:
                    sequential_file.write(generate_sequential_xml(sequential_name, verticals))
                    print(f"Created sequential file: {sequential_file_path}")

            with open(chapter_file_path, 'w', encoding='utf-8') as chapter_file:
                chapter_file.write(generate_chapter_xml(chapter_name, sequentials))
                print(f"Created chapter file: {chapter_file_path}")

        course_folder = os.path.join(output_folder, 'course')
        os.makedirs(course_folder, exist_ok=True)
        course_file_path = os.path.join(course_folder, f'{sysops_01}.xml')
        with open(course_file_path, 'w', encoding='utf-8') as course_file:
            course_file.write(generate_course_xml(course_name, chapters, wiki_slug))
            print(f"Created course file: {course_file_path}")

if __name__ == "__main__":
    input_file = './product_50965.csv'
    process_csv(input_file)