import re

# Add keys to types.ts
path_types = 'src/i18n/types.ts'
with open(path_types, 'r', encoding='utf8') as f:
    content_types = f.read()

new_keys = """  // CourseDetailModal
  openInSap: string;
  countedForChains: string;
  countedAsCoreHint: string;
  mandatory: string;
  elective: string;
  assigned: string;
  assignToThisChainOnly: string;
  assignBtn: string;
  countedOnlyInAssigned: string;
  returnToCore: string;
  prerequisitesTitle: string;
  noPrerequisites: string;
  replacedBy: string;
  auto: string;
  customComposition: string;
  optionSelected: string;
  autoDefault: string;
  optionN: string;
  customPrereqComposition: string;
  searchCourseToAdd: string;
  prereqReplacement: string;
  prereqReplacementHint: string;
  searchCourseByNameOrId: string;
  whatDependsOnThis: string;
  noDependentCourses: string;
  dependentCoursesCount: string;
  inPlan: string;
  noAdditionalCreditTitle: string;
  creditConflictWith: string;
  thisCourseNoCredit: string;
  otherCourseNoCredit: string;
  noCreditDefaultHint: string;
  containingCourseTitle: string;
  containsCourse: string;
  mandatoryCreditsCounted: string;
  excessCreditsCounted: string;
"""

if "openInSap:" not in content_types:
    content_types = content_types.replace("export interface Translations {", "export interface Translations {\n" + new_keys)
    with open(path_types, 'w', encoding='utf8') as f:
        f.write(content_types)

# Add keys to he.ts
path_he = 'src/i18n/he.ts'
with open(path_he, 'r', encoding='utf8') as f:
    content_he = f.read()

he_keys = """  openInSap: 'פתח ב-SAP ↗',
  countedForChains: 'נספר לשרשראות:',
  countedAsCoreHint: 'קורס זה נספר כליבה. הקצאה לשרשרת תשחרר אותו מספירת הליבה.',
  mandatory: 'חובה',
  elective: 'בחירה',
  assigned: '✓ מוקצה',
  assignToThisChainOnly: 'הקצה קורס זה לשרשרת זו בלבד',
  assignBtn: 'הקצה',
  countedOnlyInAssigned: 'הקורס נספר רק בשרשרת המוקצית',
  returnToCore: 'החזר לליבה',
  prerequisitesTitle: 'תנאי קדם',
  noPrerequisites: 'אין תנאי קדם',
  replacedBy: 'מוחלף ע״י',
  auto: 'אוטומטי',
  customComposition: 'הרכב מותאם',
  optionSelected: 'אפשרות {n} נבחרה',
  autoDefault: 'אוטומטי (ברירת מחדל)',
  optionN: 'אפשרות {n}',
  customPrereqComposition: 'הרכב קדמים בעצמי...',
  searchCourseToAdd: 'חפש קורס להוספה...',
  prereqReplacement: 'מחליף קדם',
  prereqReplacementHint: 'אם קורס זה שקול לקורס אחר בטכניון, בחר אותו כדי שיתפוס את מקומו בבדיקת קדמים.',
  searchCourseByNameOrId: 'חפש קורס לפי שם או מספר...',
  whatDependsOnThis: 'מה תלוי בקורס זה',
  noDependentCourses: 'אין קורסים שתלויים בקורס זה',
  dependentCoursesCount: 'קורסים תלויים בקורס זה',
  inPlan: '✓ בתכנית',
  noAdditionalCreditTitle: 'ללא זיכוי נוסף',
  creditConflictWith: 'הקורס מתנגש בזיכוי עם',
  thisCourseNoCredit: 'קורס זה ללא זיכוי',
  otherCourseNoCredit: 'הקורס השני ללא זיכוי',
  noCreditDefaultHint: 'ברירת המחדל היא שהקורס המאוחר יותר בתוכנית לא יקבל נק"ז.',
  containingCourseTitle: 'קורס מכיל',
  containsCourse: 'קורס זה מכיל את',
  mandatoryCreditsCounted: 'נק"ז נספרות כחובה במקומו',
  excessCreditsCounted: ', והיתרה ({credits} נק"ז) נספרת כבחירה חופשית.',
"""

if "openInSap:" not in content_he:
    content_he = content_he.replace("export const heTranslations: Translations = {", "export const heTranslations: Translations = {\n" + he_keys)
    with open(path_he, 'w', encoding='utf8') as f:
        f.write(content_he)

# Add keys to en.ts
path_en = 'src/i18n/en.ts'
with open(path_en, 'r', encoding='utf8') as f:
    content_en = f.read()

en_keys = """  openInSap: 'Open in SAP ↗',
  countedForChains: 'Counted for chains:',
  countedAsCoreHint: 'This course is counted as core. Assigning it to a chain will release it from core.',
  mandatory: 'Mandatory',
  elective: 'Elective',
  assigned: '✓ Assigned',
  assignToThisChainOnly: 'Assign this course to this chain only',
  assignBtn: 'Assign',
  countedOnlyInAssigned: 'Course counted only in assigned chain',
  returnToCore: 'Return to core',
  prerequisitesTitle: 'Prerequisites',
  noPrerequisites: 'No prerequisites',
  replacedBy: 'Replaced by',
  auto: 'Auto',
  customComposition: 'Custom composition',
  optionSelected: 'Option {n} selected',
  autoDefault: 'Auto (default)',
  optionN: 'Option {n}',
  customPrereqComposition: 'Custom prereq composition...',
  searchCourseToAdd: 'Search course to add...',
  prereqReplacement: 'Prereq Replacement',
  prereqReplacementHint: 'If this course is equivalent to another Technion course, select it to take its place in prerequisite checks.',
  searchCourseByNameOrId: 'Search course by name or ID...',
  whatDependsOnThis: 'What depends on this',
  noDependentCourses: 'No courses depend on this course',
  dependentCoursesCount: 'courses depend on this course',
  inPlan: '✓ In plan',
  noAdditionalCreditTitle: 'No Additional Credit',
  creditConflictWith: 'This course has a credit conflict with',
  thisCourseNoCredit: 'This course gets no credit',
  otherCourseNoCredit: 'The other course gets no credit',
  noCreditDefaultHint: 'By default, the later course in the plan will not receive credits.',
  containingCourseTitle: 'Containing Course',
  containsCourse: 'This course contains',
  mandatoryCreditsCounted: 'credits are counted as mandatory instead',
  excessCreditsCounted: ', and the remainder ({credits} credits) is counted as free elective.',
"""

if "openInSap:" not in content_en:
    content_en = content_en.replace("export const enTranslations: Translations = {", "export const enTranslations: Translations = {\n" + en_keys)
    with open(path_en, 'w', encoding='utf8') as f:
        f.write(content_en)
