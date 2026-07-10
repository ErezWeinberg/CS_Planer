import re
import json

core_courses = {
    '01040031': 'Calculus 1M',
    '01040032': 'Calculus 2M',
    '01040166': 'Algebra AM',
    '01040174': 'Algebra BM',
    '01140071': 'Physics 1M',
    '01140075': 'Physics 2MM',
    '01140051': 'Physics 1',
    '01140057': 'Physics 2',
    '01140058': 'Physics 3',
    '02340114': 'Introduction to Computer Science M',
    '02340124': 'Introduction to Systems Programming',
    '02340125': 'Numerical Algorithms',
    '02340141': 'Combinatorics for CS',
    '02340218': 'Data Structures 1',
    '02340247': 'Algorithms 1',
    '02340292': 'Logic for CS',
    '00440252': 'Digital Systems and Computer Organization',
    '00340412': 'Probability M',
    '02340123': 'Operating Systems',
    '02360343': 'Theory of Computation',
    '02360360': 'Theory of Compilation',
    '02360267': 'Computer Architecture',
    '02360201': 'Intro to Data Representation and Processing',
    '03240033': 'Technical English - Advanced B',
    '03940900': 'Physical Education',
    '03940901': 'Physical Education',
    '03940902': 'Physical Education',
    '03940800': 'Physical Education',
    '01140076': 'Physics 2M',
    '02360766': 'Intro to Machine Learning',
    '02340262': 'Intro to Computer Networks',
    '00440262': 'Intro to Computer Networks',
    '02340179': 'Intro to Sets and Automata',
    '02340268': 'Intro to Cryptography',
    '02360354': 'Intro to Computer Networks',
    '03240799': 'Scientific Communication',
    '00440254': 'Computer Networks',
}

# Update types.ts
path_types = 'src/i18n/types.ts'
with open(path_types, 'r', encoding='utf8') as f:
    content_types = f.read()

if "courseNames?: Record<string, string>;" not in content_types:
    content_types = content_types.replace("export interface Translations {", "export interface Translations {\n  courseNames?: Record<string, string>;")
    with open(path_types, 'w', encoding='utf8') as f:
        f.write(content_types)

# Update en.ts
path_en = 'src/i18n/en.ts'
with open(path_en, 'r', encoding='utf8') as f:
    content_en = f.read()

if "courseNames: {" not in content_en:
    course_str = ",\n  courseNames: {\n"
    for course_id, english_name in core_courses.items():
        course_str += f"    '{course_id}': '{english_name}',\n"
    course_str += "  }\n};\n"
    
    content_en = re.sub(r"\n\};\n?$", course_str, content_en)
    with open(path_en, 'w', encoding='utf8') as f:
        f.write(content_en)
