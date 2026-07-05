import type { TrackDefinition } from '../../types';

export const cs4YearTrack: TrackDefinition = {
  id: 'cs_4_year',
  name: 'מסלול כללי ארבע-שנתי',
  description: 'מסלול מורחב במדעי המחשב, מאפשר העמקה נוספת בבחירת מקצועות וקורסים מתקדמים.',
  totalCreditsRequired: 155.0,
  mandatoryCredits: 87.0,
  electiveCreditsRequired: 56.0,
  generalCreditsRequired: 12.0,
  specializationGroupsRequired: 3,
  externalFacultyElectiveEnabled: false,
  electivePolicy: {
    facultyCourseAreas: ['cs'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040031', '01040166', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['01040032', '01140071', '02340124', '02340141'] },
    { semester: 3, courses: ['00440252', '00940412', '02340218', '02340292'] },
    { semester: 4, courses: ['02340247', '02340118', '02340123'] },
    { semester: 5, courses: ['02360343', '02360267', '02360360'] },
    { semester: 6, courses: ['02360506', '02360490', '02360496'] },
    { semester: 7, courses: [] },
    { semester: 8, courses: [] }
  ],
};
