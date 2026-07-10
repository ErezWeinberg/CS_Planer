const fs = require('fs');

const path = 'src/components/CourseFilterPanel.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/'כל הדירוגים'/g, "t('allRatings')");
content = content.replace(/'⭐ 3 ומעלה'/g, "t('rating3Plus')");
content = content.replace(/'⭐ 4 ומעלה'/g, "t('rating4Plus')");
content = content.replace(/'⭐ 4.5 ומעלה'/g, "t('rating45Plus')");
content = content.replace(/'⭐ 5 בלבד'/g, "t('rating5Only')");
content = content.replace(/'סינון: סדר ברירת מחדל'/g, "t('filterDefaultOrder')");
content = content.replace(/'ציון'/g, "t('filterByGrade')");
content = content.replace(/'דירוג'/g, "t('filterByRating')");
content = content.replace(/'עומס'/g, "t('filterByWorkload')");
content = content.replace(/'סגל'/g, "t('filterByStaff')");
content = content.replace(/'ציונים: כללי'/g, "t('gradesGeneral')");
content = content.replace(/'מעל 85'/g, "t('gradesHigh')");
content = content.replace(/'75-85'/g, "t('gradesMedium')");
content = content.replace(/'מתחת 75'/g, "t('gradesLow')");
content = content.replace(/'חובה\/בחירה'/g, "t('mandatoryElectiveMode')");
content = content.replace(/'קורסי אביב וחורף'/g, "t('winterSpringBtn')");
content = content.replace(/'אנגלית'/g, "t('englishBtn')");
content = content.replace(/'מל"ג'/g, "t('malagBtn')");
content = content.replace(/'בחירה חופשית'/g, "t('freeElectiveBtn')");
content = content.replace(/'תארים מתקדמים'/g, "t('advancedBtn')");
content = content.replace(/'חורף'/g, "t('winterBtn')");
content = content.replace(/'אביב'/g, "t('springBtn')");
content = content.replace(/selected\.length === 0 \? 'מקצועות' : `מקצועות \(\$\{selected\.length\}\)`/, "selected.length === 0 ? t('coursesFilterBtn') : `${t('coursesFilterBtn')} (${selected.length})`");

fs.writeFileSync(path, content, 'utf8');
