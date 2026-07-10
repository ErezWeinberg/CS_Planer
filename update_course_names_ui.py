import re
import os

# Helper to find and replace course.name
# In CourseCard.tsx, CourseDetailModal.tsx, SemesterGrid.tsx, RequirementsPanel.tsx, CourseSearch.tsx

def replace_course_name_access(filepath):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()

    # If the file doesn't import useLanguage, add it.
    if 'useLanguage' not in content:
        if 'import' in content:
            content = re.sub(r'(import .*?;)', r'\1\nimport { useLanguage } from "../context/LanguageContext";', content, count=1)

    # If the component doesn't extract t, add it.
    if 'const { t } = useLanguage();' not in content and 'useLanguage' in content:
        content = re.sub(r'(function \w+\([^)]*\)\s*\{)', r'\1\n  const { t } = useLanguage();', content)
        content = re.sub(r'(const \w+\s*=\s*\([^)]*\)\s*=>\s*\{)', r'\1\n  const { t } = useLanguage();', content)
        content = re.sub(r'(const \w+\s*=\s*memo\(function \w+\([^)]*\)\s*\{)', r'\1\n  const { t } = useLanguage();', content)

    # We define a local helper inside the file or just use inline logic
    # const localizedName = (id: string, defaultName: string) => (t('courseNames') as any)?.[id] ?? defaultName;
    
    # Actually, it's easier to just do: `((t('courseNames') as any)?.[course.id] ?? course.name)`
    # Let's replace course.name -> ((t('courseNames') as any)?.[course.id] ?? course.name)
    
    # CourseCard.tsx:
    if 'CourseCard' in filepath:
        content = content.replace('{course.name}', '{((t(\'courseNames\') as any)?.[course.id] ?? course.name)}')
        content = content.replace('courses.get(id)?.name', '((t(\'courseNames\') as any)?.[id] ?? courses.get(id)?.name)')
        content = content.replace('conflictingCourse?.name', '((t(\'courseNames\') as any)?.[conflict.conflictingCourseId] ?? conflictingCourse?.name)')
        content = content.replace('courses.get(containingSubstitution.containedCourseId)?.name', '((t(\'courseNames\') as any)?.[containingSubstitution.containedCourseId] ?? courses.get(containingSubstitution.containedCourseId)?.name)')
        
    elif 'CourseDetailModal' in filepath:
        content = content.replace('{course.name}', '{((t(\'courseNames\') as any)?.[course.id] ?? course.name)}')
        content = content.replace('{subTargetCourse.name}', '{((t(\'courseNames\') as any)?.[subTargetCourse.id] ?? subTargetCourse.name)}')
        content = content.replace('${subTargetCourse.name}', '${(t(\'courseNames\') as any)?.[subTargetCourse.id] ?? subTargetCourse.name}')
        content = content.replace('{dep.name}', '{((t(\'courseNames\') as any)?.[dep.id] ?? dep.name)}')
        content = content.replace('courses.get(containingSubstitution.containedCourseId)?.name', '((t(\'courseNames\') as any)?.[containingSubstitution.containedCourseId] ?? courses.get(containingSubstitution.containedCourseId)?.name)')
        
    elif 'SemesterGrid' in filepath:
        content = content.replace('courses.get(id)?.name', '((t(\'courseNames\') as any)?.[id] ?? courses.get(id)?.name)')

    elif 'RequirementsPanel' in filepath:
        # RequirementsPanel uses dataDict(course.name)
        # We can change it to dataDict((t('courseNames') as any)?.[course.courseId] ?? course.name)
        content = content.replace('dataDict(course.name)', 'dataDict((t(\'courseNames\') as any)?.[course.courseId] ?? course.name)')
        
    elif 'CourseSearch' in filepath:
        # CourseSearch uses course.name.toLowerCase() in filters
        # We should probably filter on BOTH the Hebrew and English names if they exist.
        # But for UI display:
        content = content.replace('course.name ?? \'\'', '((t(\'courseNames\') as any)?.[course.id] ?? course.name ?? \'\')')
        content = content.replace('course.name.toLowerCase()', '((t(\'courseNames\') as any)?.[course.id] ?? course.name).toLowerCase()')
        content = content.replace('course.name || \'\'', '((t(\'courseNames\') as any)?.[course.id] ?? course.name || \'\')')

    with open(filepath, 'w', encoding='utf8') as f:
        f.write(content)

files_to_update = [
    'src/components/CourseCard.tsx',
    'src/components/CourseDetailModal.tsx',
    'src/components/SemesterGrid.tsx',
    'src/components/RequirementsPanel.tsx',
    'src/components/CourseSearch.tsx'
]

for f in files_to_update:
    replace_course_name_access(f)

