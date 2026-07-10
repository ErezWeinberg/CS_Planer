import re

# CourseSearch.tsx
with open('src/components/CourseSearch.tsx', 'r', encoding='utf8') as f:
    cs = f.read()
# Replace exact line `  const { t } = useLanguage();\n`
cs = cs.replace('  const { t } = useLanguage();\n', '')
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
# Remove unused useLanguage from top level if needed
# We can just let it be, it's used now. Wait, VersionCompareModal.tsx(1,1): error TS6133
# If we add it, it won't be unused!
with open('src/components/VersionCompareModal.tsx', 'w', encoding='utf8') as f:
    f.write(vc)

# RequirementsPanel.tsx
with open('src/components/RequirementsPanel.tsx', 'r', encoding='utf8') as f:
    rp = f.read()

# Fix courseId -> id
rp = rp.replace("course.courseId", "course.id")
rp = rp.replace("dataDict((t('courseNames') as any)?.[course.id] ?? course.name)", "((t('courseNames') as any)?.[course.id] ?? course.name)")

# Add `t` to ElectiveBreakdown if it's not there
elec_sig = "function ElectiveBreakdown({\n  areaRequirements,\n  assignmentChoices,\n  externalFaculty,\n  courses,\n  onSelectAssignment,\n}: ElectiveBreakdownProps) {"
elec_body = elec_sig + "\n  const { t } = useLanguage();\n"
if "const { t } = useLanguage();" not in rp.split(elec_sig)[1][:100]:
    rp = rp.replace(elec_sig, elec_body)

rp = rp.replace("t('dataDict' as any)(req.title)", "(t('dataDict') as any)(req.title)")

with open('src/components/RequirementsPanel.tsx', 'w', encoding='utf8') as f:
    f.write(rp)

print("Cleanup done!")
