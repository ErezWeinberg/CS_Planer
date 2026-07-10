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
    if "const { t } = useLanguage();" not in content.split(func_signature)[1][:100]:
        content = content.replace(func_signature, func_signature + "\n  const { t } = useLanguage();")
        with open(filepath, 'w', encoding='utf8') as f:
            f.write(content)

# CourseFilterPanel
f = 'src/components/CourseFilterPanel.tsx'
insert_import(f)

# PrintView
f = 'src/components/PrintView.tsx'
insert_import(f)
insert_hook(f, "function PrintContent({ courses, trackDef, catalog, includeGrades, plan }: PrintContentProps) {")

# VersionCompareModal
f = 'src/components/VersionCompareModal.tsx'
insert_import(f)
insert_hook(f, "function VersionColumn({ version, trackDef, catalog, courses, plan, onSetCurrent }: VersionColumnProps) {")

print("Done")
