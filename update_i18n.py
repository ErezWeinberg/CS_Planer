import re

# Add keys to types.ts
path_types = 'src/i18n/types.ts'
with open(path_types, 'r', encoding='utf8') as f:
    content_types = f.read()

new_keys = """  // SemesterGrid & App & Login
  notAssigned: string;
  oneCourseOnlyPrefix: string;
  viewMode: string;
  moreColumns: string;
  lessColumns: string;
  facultyLegend: string;
  legend: string;
  clickToChangeColor: string;
  colorPickerHint: string;
  addSemester: string;
  removeSemester: string;
  addSummer: string;
  removeSummer: string;
  autoRetry: string;
  confirmReset: string;
  errorCopyLimit: string;
  errorNoShareToCopy: string;
  copyCreated: string;
  shareReviewTitle: string;
  newUpdate: string;
  shareReviewDesc: string;
  createCopyBtn: string;
  shareEditWarning: string;
  shareViewWarning: string;
  sharedBy: string;
  saving: string;
  saved: string;
  saveError: string;
  workOnSeparateCopy: string;
  openYourPlanner: string;
  openMenu: string;
  whatsappSupport: string;
  systemGuide: string;
  pendingUpdates1: string;
  pendingUpdates2: string;
  exportShareImport: string;
  pendingUpdatesLabel: string;
  darkModeToLight: string;
  lightModeToAuto: string;
  autoModeToDark: string;
  errorLoadingCourses: string;
  loadingCourses: string;
  errorLoading: string;
  logout: string;
"""

if "notAssigned" not in content_types:
    content_types = content_types.replace("export interface Translations {", "export interface Translations {\n" + new_keys)
    with open(path_types, 'w', encoding='utf8') as f:
        f.write(content_types)

# Add keys to he.ts
path_he = 'src/i18n/he.ts'
with open(path_he, 'r', encoding='utf8') as f:
    content_he = f.read()

he_keys = """  notAssigned: 'לא שובץ',
  oneCourseOnlyPrefix: '⚠️ בסמסטר הזה אפשר לקחת רק אחד מהקורסים:',
  viewMode: 'תצוגת',
  moreColumns: 'הצג יותר עמודות (קטן יותר)',
  lessColumns: 'הצג פחות עמודות (גדול יותר)',
  facultyLegend: 'מקרא פקולטות',
  legend: 'מקרא',
  clickToChangeColor: 'לחץ לשינוי צבע',
  colorPickerHint: 'לחץ על עיגול צבע לשינוי · לחץ שוב לסגירה',
  addSemester: 'הוסף סמסטר',
  removeSemester: 'הסר סמסטר',
  addSummer: 'הוסף קיץ',
  removeSummer: 'הסר קיץ',
  autoRetry: 'ננסה שוב אוטומטית.',
  confirmReset: 'האם לאפס את תכנית הלימודים? כל השינויים שלך יימחקו.',
  errorCopyLimit: 'אי אפשר ליצור עותק: הגעת למגבלת הגרסאות הפנימית',
  errorNoShareToCopy: 'לא נמצאה גרסת שיתוף להעתקה',
  copyCreated: 'נוצר עותק לעריכה מהשיתוף',
  shareReviewTitle: 'גרסת שיתוף לבדיקה',
  newUpdate: 'עדכון חדש',
  shareReviewDesc: 'אתה צופה בגרסת שיתוף לבדיקה. אי אפשר לערוך אותה ישירות. כדי לעבוד עליה, צור עותק לעריכה.',
  createCopyBtn: 'צור עותק לעריכה',
  shareEditWarning: '⚠ אתה צופה בתוכנית משותפת במצב עריכה. שינויים ישמרו ישירות על הגרסה המשותפת.',
  shareViewWarning: '👁 אתה צופה בתוכנית משותפת (צפייה בלבד). שינויים שתבצע לא יישמרו.',
  sharedBy: 'שותפה על ידי',
  saving: 'שומר...',
  saved: 'נשמר',
  saveError: 'שגיאה בשמירה',
  workOnSeparateCopy: 'כדי לעבוד על עותק נפרד,',
  openYourPlanner: 'פתח את המתכנן שלך',
  openMenu: 'פתח תפריט',
  whatsappSupport: 'קבוצת תמיכה בוואטסאפ',
  systemGuide: 'מדריך קצר למערכת',
  pendingUpdates1: 'יש ',
  pendingUpdates2: ' עדכון מהשיתוף ממתינים לאישור',
  exportShareImport: 'ייצוא, שיתוף, או ייבוא של המערכת',
  pendingUpdatesLabel: 'עדכוני שיתוף ממתינים',
  darkModeToLight: 'מצב כהה — לחץ למצב בהיר',
  lightModeToAuto: 'מצב בהיר — לחץ למצב אוטומטי',
  autoModeToDark: 'אוטומטי — לחץ למצב כהה',
  errorLoadingCourses: 'שגיאה בטעינת נתוני הקורסים. אנא בדוק את חיבור האינטרנט.',
  loadingCourses: 'טוען נתוני קורסים...',
  errorLoading: '⚠️ שגיאה בטעינה',
  logout: 'יציאה',
"""

if "notAssigned: " not in content_he:
    content_he = content_he.replace("export const heTranslations: Translations = {", "export const heTranslations: Translations = {\n" + he_keys)
    with open(path_he, 'w', encoding='utf8') as f:
        f.write(content_he)

# Add keys to en.ts
path_en = 'src/i18n/en.ts'
with open(path_en, 'r', encoding='utf8') as f:
    content_en = f.read()

en_keys = """  notAssigned: 'Not assigned',
  oneCourseOnlyPrefix: '⚠️ This semester you can only take one of the courses:',
  viewMode: 'View',
  moreColumns: 'Show more columns (smaller)',
  lessColumns: 'Show fewer columns (larger)',
  facultyLegend: 'Faculty Legend',
  legend: 'Legend',
  clickToChangeColor: 'Click to change color',
  colorPickerHint: 'Click color circle to change · Click again to close',
  addSemester: 'Add Semester',
  removeSemester: 'Remove Semester',
  addSummer: 'Add Summer',
  removeSummer: 'Remove Summer',
  autoRetry: 'Will retry automatically.',
  confirmReset: 'Reset study plan? All your changes will be deleted.',
  errorCopyLimit: 'Cannot create copy: Internal versions limit reached',
  errorNoShareToCopy: 'No shared version found to copy',
  copyCreated: 'Created editable copy from share',
  shareReviewTitle: 'Shared Version Review',
  newUpdate: 'New Update',
  shareReviewDesc: 'Viewing shared review version. Cannot edit directly. To work on it, create an editable copy.',
  createCopyBtn: 'Create Editable Copy',
  shareEditWarning: '⚠ Viewing shared plan in edit mode. Changes are saved directly to the shared version.',
  shareViewWarning: '👁 Viewing shared plan (read-only). Changes will not be saved.',
  sharedBy: 'Shared by',
  saving: 'Saving...',
  saved: 'Saved',
  saveError: 'Save error',
  workOnSeparateCopy: 'To work on a separate copy,',
  openYourPlanner: 'open your planner',
  openMenu: 'Open menu',
  whatsappSupport: 'WhatsApp Support Group',
  systemGuide: 'System Guide',
  pendingUpdates1: 'There are ',
  pendingUpdates2: ' pending share updates for approval',
  exportShareImport: 'Export, share, or import system',
  pendingUpdatesLabel: 'pending share updates',
  darkModeToLight: 'Dark Mode — Click for Light',
  lightModeToAuto: 'Light Mode — Click for Auto',
  autoModeToDark: 'Auto Mode — Click for Dark',
  errorLoadingCourses: 'Error loading course data. Please check internet connection.',
  loadingCourses: 'Loading course data...',
  errorLoading: '⚠️ Loading Error',
  logout: 'Logout',
"""

if "notAssigned: " not in content_en:
    content_en = content_en.replace("export const enTranslations: Translations = {", "export const enTranslations: Translations = {\n" + en_keys)
    with open(path_en, 'w', encoding='utf8') as f:
        f.write(content_en)
