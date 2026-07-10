import os

def fix_file(filepath, imports_to_add):
    if not os.path.exists(filepath): return
    with open(filepath, 'r', encoding='utf8') as f:
        content = f.read()
    
    if "import { useLanguage }" not in content:
        # insert after the first import or at the top
        content = content.replace("import ", "import { useLanguage } from '../context/LanguageContext';\nimport ", 1)
        
    with open(filepath, 'w', encoding='utf8') as f:
        f.write(content)

fix_file('src/components/CourseFilterPanel.tsx', [])
fix_file('src/components/PrintView.tsx', [])
fix_file('src/components/VersionCompareModal.tsx', [])

# Fix RequirementsPanel.tsx
rp_path = 'src/components/RequirementsPanel.tsx'
with open(rp_path, 'r', encoding='utf8') as f:
    rp_content = f.read()

if "const dataDict = " not in rp_content:
    rp_content = rp_content.replace("const { t } = useLanguage();", "const { t } = useLanguage();\n  const dataDict = t('dataDict') as (key: string) => string;")
    with open(rp_path, 'w', encoding='utf8') as f:
        f.write(rp_content)

print("Done")
