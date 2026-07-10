import re

# CourseSearch.tsx
with open('src/components/CourseSearch.tsx', 'r', encoding='utf8') as f:
    cs = f.read()
cs = cs.replace('  const { t } = useLanguage();\n', '')
cs = cs.replace('export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n', 'export const CourseSearch = memo(function CourseSearch({ courses, onCourseAdded }: Props) {\n')
with open('src/components/CourseSearch.tsx', 'w', encoding='utf8') as f:
    f.write(cs)

# SemesterGrid.tsx
with open('src/components/SemesterGrid.tsx', 'r', encoding='utf8') as f:
    sg = f.read()
sg = sg.replace("import { memo, useMemo, useState, useEffect } from 'react';", "import { memo, useMemo, useState } from 'react';")
with open('src/components/SemesterGrid.tsx', 'w', encoding='utf8') as f:
    f.write(sg)

# VersionCompareModal.tsx
with open('src/components/VersionCompareModal.tsx', 'r', encoding='utf8') as f:
    vc = f.read()
sig = "function VersionColumn({ version, trackDef, catalog, courses, plan, onSetCurrent }: VersionColumnProps) {\n"
vc = vc.replace(sig, sig + "  const { t } = useLanguage();\n")
# Also remove unused `useLanguage` from the top of the file if it's there
# Actually `useLanguage` is used if we add `const { t } = useLanguage();` inside `VersionColumn`!
with open('src/components/VersionCompareModal.tsx', 'w', encoding='utf8') as f:
    f.write(vc)

# RequirementsPanel.tsx
with open('src/components/RequirementsPanel.tsx', 'r', encoding='utf8') as f:
    rp = f.read()

# Fix courseId -> id
rp = rp.replace("course.courseId", "course.id")

# Add `t` to ElectiveBreakdown if it's not there
elec_sig = "function ElectiveBreakdown({\n  areaRequirements,\n  assignmentChoices,\n  externalFaculty,\n  courses,\n}: ElectiveBreakdownProps) {"
elec_body = elec_sig + "\n  const { t } = useLanguage();\n  const dataDict = t('dataDict') as (key: string) => string;\n"
if "const { t } = useLanguage();" not in rp.split(elec_sig)[1][:100]:
    rp = rp.replace(elec_sig, elec_body)

# In RequirementsPanel.tsx(230): `t('dataDict' as any)(req.title)` -> `(t('dataDict') as any)(req.title)`
rp = rp.replace("t('dataDict' as any)(req.title)", "(t('dataDict') as any)(req.title)")

with open('src/components/RequirementsPanel.tsx', 'w', encoding='utf8') as f:
    f.write(rp)

print("Cleanup done!")
