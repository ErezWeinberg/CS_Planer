import re

# App.tsx
path_app = 'src/App.tsx'
with open(path_app, 'r', encoding='utf8') as f:
    content_app = f.read()

content_app = content_app.replace("`${message}. ננסה שוב אוטומטית.`", "`${message}. ${t('autoRetry')}`")
content_app = content_app.replace("'האם לאפס את תכנית הלימודים? כל השינויים שלך יימחקו.'", "t('confirmReset')")
content_app = content_app.replace("'אי אפשר ליצור עותק: הגעת למגבלת הגרסאות הפנימית'", "t('errorCopyLimit')")
content_app = content_app.replace("'לא נמצאה גרסת שיתוף להעתקה'", "t('errorNoShareToCopy')")
content_app = content_app.replace("'נוצר עותק לעריכה מהשיתוף'", "t('copyCreated')")

# Handle the complex share mode string
content_app = re.sub(
    r"גרסת שיתוף לבדיקה\{shareMode\.isNewShareReview \? ' · עדכון חדש' : ''\}",
    r"{t('shareReviewTitle')}{shareMode.isNewShareReview ? ' · ' + t('newUpdate') : ''}",
    content_app
)

content_app = content_app.replace("אתה צופה בגרסת שיתוף לבדיקה. אי אפשר לערוך אותה ישירות. כדי לעבוד עליה, צור עותק לעריכה.", "{t('shareReviewDesc')}")
content_app = content_app.replace("צור עותק לעריכה", "{t('createCopyBtn')}")
content_app = content_app.replace("'⚠ אתה צופה בתוכנית משותפת במצב עריכה. שינויים ישמרו ישירות על הגרסה המשותפת.'", "t('shareEditWarning')")
content_app = content_app.replace("'👁 אתה צופה בתוכנית משותפת (צפייה בלבד). שינויים שתבצע לא יישמרו.'", "t('shareViewWarning')")
content_app = re.sub(r" שותפה על ידי \$\{shareMode\.share\.ownerEmail\}\.", r" {t('sharedBy')} ${shareMode.share.ownerEmail}.", content_app)

content_app = content_app.replace("shareSaveStatus === 'saving' ? 'שומר...' : shareSaveStatus === 'saved' ? '✓ נשמר' : 'שגיאה בשמירה'", "shareSaveStatus === 'saving' ? t('saving') : shareSaveStatus === 'saved' ? `✓ ${t('saved')}` : t('saveError')")
content_app = content_app.replace("כדי לעבוד על עותק נפרד,{' '}", "{t('workOnSeparateCopy')}{' '}")
content_app = content_app.replace("פתח את המתכנן שלך", "{t('openYourPlanner')}")

content_app = content_app.replace('aria-label="פתח תפריט"', 'aria-label={t("openMenu")}')
content_app = content_app.replace('title="קבוצת תמיכה בוואטסאפ"', 'title={t("whatsappSupport")}')
content_app = content_app.replace('title="מדריך קצר למערכת"', 'title={t("systemGuide")}')

content_app = re.sub(
    r"`יש \$\{pendingShareUpdates\.length\} עדכון מהשיתוף ממתינים לאישור`",
    r"`${t('pendingUpdates1')}${pendingShareUpdates.length}${t('pendingUpdates2')}`",
    content_app
)
content_app = content_app.replace("'ייצוא, שיתוף, או ייבוא של המערכת'", "t('exportShareImport')")
content_app = re.sub(
    r"`\$\{pendingShareUpdates\.length\} עדכוני שיתוף ממתינים`",
    r"`${pendingShareUpdates.length} ${t('pendingUpdatesLabel')}`",
    content_app
)

content_app = content_app.replace("'מצב כהה — לחץ למצב בהיר' : darkMode === 'light' ? 'מצב בהיר — לחץ למצב אוטומטי' : 'אוטומטי — לחץ למצב כהה'", "t('darkModeToLight') : darkMode === 'light' ? t('lightModeToAuto') : t('autoModeToDark')")

content_app = content_app.replace("'שגיאה בטעינת נתוני הקורסים. אנא בדוק את חיבור האינטרנט.'", "t('errorLoadingCourses')")
content_app = content_app.replace("טוען נתוני קורסים...", "{t('loadingCourses')}")
content_app = content_app.replace("⚠️ שגיאה בטעינה", "{t('errorLoading')}")

with open(path_app, 'w', encoding='utf8') as f:
    f.write(content_app)


# SemesterGrid.tsx
path_grid = 'src/components/SemesterGrid.tsx'
with open(path_grid, 'r', encoding='utf8') as f:
    content_grid = f.read()

content_grid = content_grid.replace("'לא שובץ'", "t('notAssigned')")
content_grid = re.sub(
    r"`⚠️ בסמסטר הזה אפשר לקחת רק אחד מהקורסים: \$\{courseLabels\.join\(' / '\)\}`",
    r"`${t('oneCourseOnlyPrefix')} ${courseLabels.join(' / ')}`",
    content_grid
)

content_grid = content_grid.replace("`תצוגת ${label}`", "`${t('viewMode')} ${label}`")
content_grid = content_grid.replace('"הצג יותר עמודות (קטן יותר)"', "{t('moreColumns')}")
content_grid = content_grid.replace('"הצג פחות עמודות (גדול יותר)"', "{t('lessColumns')}")
content_grid = content_grid.replace('"מקרא פקולטות"', "{t('facultyLegend')}")
content_grid = content_grid.replace(">מקרא<", ">{t('legend')}<")
content_grid = content_grid.replace('"לחץ לשינוי צבע"', "{t('clickToChangeColor')}")
content_grid = content_grid.replace(">לחץ על עיגול צבע לשינוי · לחץ שוב לסגירה<", ">{t('colorPickerHint')}<")
content_grid = content_grid.replace(">הוסף סמסטר<", ">{t('addSemester')}<")
content_grid = content_grid.replace(">הסר סמסטר<", ">{t('removeSemester')}<")
content_grid = content_grid.replace(">הוסף קיץ<", ">{t('addSummer')}<")
content_grid = content_grid.replace(">הסר קיץ<", ">{t('removeSummer')}<")

with open(path_grid, 'w', encoding='utf8') as f:
    f.write(content_grid)

# LoginButton.tsx
path_login = 'src/components/LoginButton.tsx'
with open(path_login, 'r', encoding='utf8') as f:
    content_login = f.read()

if "useLanguage" not in content_login:
    content_login = content_login.replace("import { useState, useRef, useEffect } from 'react';", "import { useState, useRef, useEffect } from 'react';\nimport { useLanguage } from '../context/LanguageContext';")
    content_login = content_login.replace("export function LoginButton() {", "export function LoginButton() {\n  const { t } = useLanguage();")

content_login = content_login.replace(">יציאה<", ">{t('logout')}<")

with open(path_login, 'w', encoding='utf8') as f:
    f.write(content_login)
