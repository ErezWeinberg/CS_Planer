import re

def clean_file(path, replacements):
    with open(path, 'r', encoding='utf8') as f:
        c = f.read()
    for o, n in replacements:
        c = c.replace(o, n)
    with open(path, 'w', encoding='utf8') as f:
        f.write(c)

# Clean CourseSearch.tsx
clean_file('src/components/CourseSearch.tsx', [
    ('  const { t } = useLanguage();\n  const { t } = useLanguage();\n', '  const { t } = useLanguage();\n'),
    ('  const { t } = useLanguage();\n', ''),  # remove all
    ('  const { t, language } = useLanguage();\n', '  const { t, language } = useLanguage();\n'), # wait, if I remove all it removes the good ones too?
])

# Better approach for CourseSearch:
with open('src/components/CourseSearch.tsx', 'r', encoding='utf8') as f:
    cs = f.read()
# Remove all exact matches of '  const { t } = useLanguage();\n'
cs = cs.replace('  const { t } = useLanguage();\n', '')
# Add it once back at the top of CourseSearch
cs = cs.replace('export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n', 'export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n  const { t } = useLanguage();\n')
# Wait, line 89 has `const { t, language } = useLanguage();`.
# Since line 89 has `t`, we don't need `const { t } = useLanguage();` at all!
cs = cs.replace('export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n  const { t } = useLanguage();\n', 'export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n')

with open('src/components/CourseSearch.tsx', 'w', encoding='utf8') as f:
    f.write(cs)


# Clean SemesterGrid.tsx
with open('src/components/SemesterGrid.tsx', 'r', encoding='utf8') as f:
    sg = f.read()
sg = sg.replace("import { memo, useMemo, useState, useEffect } from 'react';", "import { memo, useMemo, useState } from 'react';")
with open('src/components/SemesterGrid.tsx', 'w', encoding='utf8') as f:
    f.write(sg)

# Clean VersionCompareModal.tsx
with open('src/components/VersionCompareModal.tsx', 'r', encoding='utf8') as f:
    vc = f.read()
# Remove unused import if we don't need it, or add the hook.
# The error said "Cannot find name 't'." at 114.
# And "useLanguage is declared but its value is never read".
# Let's add the hook to VersionColumn.
sig = "function VersionColumn({ version, trackDef, catalog, courses, plan, onSetCurrent }: VersionColumnProps) {\n"
vc = vc.replace(sig, sig + "  const { t } = useLanguage();\n")
with open('src/components/VersionCompareModal.tsx', 'w', encoding='utf8') as f:
    f.write(vc)

# Clean RequirementsPanel.tsx
with open('src/components/RequirementsPanel.tsx', 'r', encoding='utf8') as f:
    rp = f.read()
# Error: Cannot find name 'dataDict' and 't' at line 135
# Line 135 might be in `function MinorAddButton` or something?
# Let's just define `dataDict = t('dataDict')` as a global helper inside the component if we can, or just replace `dataDict(` with `(t('dataDict') as any)(` everywhere!
# Actually replacing `dataDict(course.name)` with `(t('dataDict') as any)(course.name)` is safer.
# Wait, but `t` is missing in `MinorAddButton`? Let's just remove the dataDict wrapper from the inner components if it's too hard, or add `t`.
