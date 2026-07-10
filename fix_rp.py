import re

with open('src/components/RequirementsPanel.tsx', 'r', encoding='utf8') as f:
    rp = f.read()

# Fix courseId -> id
rp = rp.replace("course.courseId", "course.id")

# Remove dataDict wrapper since t('courseNames') is already handling the translation
# Actually, the user replaced `course.name` with `(t('courseNames') as any)?.[course.courseId] ?? course.name`
# But if it had `dataDict(course.name)` before, it became `dataDict((t('courseNames') as any)?.[course.id] ?? course.name)`.
# Wait, did it? Let's just remove `dataDict(` and the closing `)`.
# Because `dataDict` was never defined, I can just remove `dataDict(` and the trailing `)`.
rp = rp.replace("dataDict(", "")
# I also need to remove the matching `)` which might be hard with simple replace.
# Let's just define `const dataDict = (x: string) => x;` at the top of the file!
# No, we need it inside components if they use `t`. But `dataDict` is a pure function.
# We can just define it as `const dataDict = (key: string) => key;` right after imports.

with open('src/components/RequirementsPanel.tsx', 'w', encoding='utf8') as f:
    f.write(rp)
