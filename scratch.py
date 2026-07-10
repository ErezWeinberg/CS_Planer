import re

path = 'src/components/PrintView.tsx'
with open(path, 'r', encoding='utf8') as f:
    content = f.read()

# Add useLanguage import if missing
if "useLanguage" not in content:
    content = content.replace("import { useMemo } from 'react';", "import { useMemo } from 'react';\nimport { useLanguage } from '../context/LanguageContext';")

# Add t to PrintView
content = content.replace("export function PrintView({ courses, trackDef, catalog, includeGrades = true, versionIds }: Props) {\n  const storeVersions = usePlanStore((s) => s.versions);", "export function PrintView({ courses, trackDef, catalog, includeGrades = true, versionIds }: Props) {\n  const { t } = useLanguage();\n  const storeVersions = usePlanStore((s) => s.versions);")

# Replace trackDef.name
content = content.replace("{trackDef && <p className=\"print-subtitle\">{trackDef.name}</p>}", "{trackDef && <p className=\"print-subtitle\">{t('dataDict')(trackDef.name)}</p>}")

with open(path, 'w', encoding='utf8') as f:
    f.write(content)
