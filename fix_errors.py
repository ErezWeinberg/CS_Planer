import re

# 1. Fix types.ts (remove duplicates)
with open('src/i18n/types.ts', 'r', encoding='utf8') as f:
    lines = f.readlines()

seen = set()
new_lines = []
for line in lines:
    m = re.match(r'\s*([a-zA-Z0-9_]+)[\?:!]*\s*:\s*string;', line)
    if m:
        key = m.group(1)
        if key in seen:
            continue
        seen.add(key)
    new_lines.append(line)

with open('src/i18n/types.ts', 'w', encoding='utf8') as f:
    f.writelines(new_lines)

# 2. Fix en.ts and he.ts (remove duplicates)
for filepath in ['src/i18n/en.ts', 'src/i18n/he.ts']:
    with open(filepath, 'r', encoding='utf8') as f:
        lines = f.readlines()

    seen = set()
    new_lines = []
    # simplistic deduplication for object properties
    for line in lines:
        m = re.match(r'\s*([a-zA-Z0-9_]+)\s*:\s*(?:\'|`|").*(?:\'|`|"),', line)
        if m:
            key = m.group(1)
            if key in seen:
                continue
            seen.add(key)
        new_lines.append(line)

    with open(filepath, 'w', encoding='utf8') as f:
        f.writelines(new_lines)

# 3. Fix CourseSearch.tsx (remove duplicate const { t } = useLanguage();)
with open('src/components/CourseSearch.tsx', 'r', encoding='utf8') as f:
    content = f.read()

# Remove any extra `const { t } = useLanguage();` inside functions that already have it.
# Actually, just replace all occurrences and put exactly one per component?
# Let's just remove all `const { t } = useLanguage();` that are not the primary one.
content = re.sub(r'(\s*const\s*\{\s*t\s*\}\s*=\s*useLanguage\(\);\s*){2,}', r'\1', content)
# Also some might be inside inner functions. Let's just remove the ones inside `matchesQueryText` and `passesPreRating`
content = content.replace('function matchesQueryText(course: SapCourse, query: string) {\n  const { t } = useLanguage();', 'function matchesQueryText(course: SapCourse, query: string) {')
content = content.replace('function passesPreRating(course: SapCourse, query: string) {\n  const { t } = useLanguage();', 'function passesPreRating(course: SapCourse, query: string) {')

with open('src/components/CourseSearch.tsx', 'w', encoding='utf8') as f:
    f.write(content)

# 4. Fix VersionCompareModal.tsx
with open('src/components/VersionCompareModal.tsx', 'r', encoding='utf8') as f:
    content = f.read()
if 'const { t } = useLanguage();' not in content:
    content = content.replace('export default function VersionCompareModal({', 'export default function VersionCompareModal({\n  const { t } = useLanguage();')
with open('src/components/VersionCompareModal.tsx', 'w', encoding='utf8') as f:
    f.write(content)

# 5. Fix RequirementsPanel.tsx
with open('src/components/RequirementsPanel.tsx', 'r', encoding='utf8') as f:
    content = f.read()

# I replaced dataDict(course.name) with dataDict((t('courseNames') as any)?.[course.courseId] ?? course.name)
# It should be (course.id ?? course.courseId)
content = content.replace('course.courseId] ?? course.name', '(course.id ?? course.courseId)] ?? course.name')
content = content.replace('dataDict((t(\'courseNames\') as any)?.[(course.id ?? course.courseId)] ?? course.name)', '(dataDict as any)((t(\'courseNames\') as any)?.[(course.id ?? (course as any).courseId)] ?? course.name)')

with open('src/components/RequirementsPanel.tsx', 'w', encoding='utf8') as f:
    f.write(content)

# 6. Fix planValidation.ts
with open('src/services/planValidation.ts', 'r', encoding='utf8') as f:
    content = f.read()
content = content.replace('chainName: chainName || null', 'chainName: chainName || undefined')
with open('src/services/planValidation.ts', 'w', encoding='utf8') as f:
    f.write(content)
