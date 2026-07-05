import type { TrackDefinition } from '../../types';

export const seTrack: TrackDefinition = {
  id: 'se',
  name: 'הנדסת תוכנה',
  description: 'מכשיר מהנדסי תוכנה ששטח התמחותם הוא מערכות תוכנה גדולות, שיטות תכנות, בדיקה, אימות ותחזוקה.',
  totalCreditsRequired: 159.5,
  mandatoryCredits: 109.0,
  electiveCreditsRequired: 38.5,
  generalCreditsRequired: 12.0,
  specializationGroupsRequired: 0,
  externalFacultyElectiveEnabled: false,
  electivePolicy: {
    facultyCourseAreas: ['cs'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040031', '01040166', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['01040032', '01040134', '01140071', '02340124', '02340141'] },
    { semester: 3, courses: ['00440252', '00940412', '02340218', '02340292', '02360319'] },
    { semester: 4, courses: ['02340118', '02340247', '02340123', '02360703'] },
    { semester: 5, courses: ['02360267', '02360322', '02360342', '02360343', '02360360', '02360370'] },
    { semester: 6, courses: ['02340125', '02360334', '02340311'] },
    { semester: 7, courses: ['02340312'] },
    { semester: 8, courses: [] }
  ],
};
