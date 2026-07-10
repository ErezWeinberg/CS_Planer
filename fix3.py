import os

def insert_import(filepath):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if "import { useLanguage }" not in content:
        content = content.replace("import ", "import { useLanguage } from '../context/LanguageContext';\nimport ", 1)
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)

def insert_hook(filepath, func_signature):
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    if func_signature in content and "const { t } = useLanguage();" not in content.split(func_signature)[1][:100]:
        content = content.replace(func_signature, func_signature + "\n  const { t } = useLanguage();")
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)

# CourseFilterPanel
f = 'src/components/CourseFilterPanel.tsx'
insert_import(f)

# PrintView
f = 'src/components/PrintView.tsx'
insert_import(f)
insert_hook(f, "function PrintPlanSection({ plan, courses, trackDef, catalog, includeGrades, versionName }: SectionProps) {")
insert_hook(f, "export function PrintView({ courses, trackDef, catalog, includeGrades = true, versionIds }: Props) {")

# VersionCompareModal
f = 'src/components/VersionCompareModal.tsx'
insert_import(f)
insert_hook(f, "function VersionColumn({ version, trackDef, catalog, courses, plan, onSetCurrent }: VersionColumnProps) {")

print("Done")
