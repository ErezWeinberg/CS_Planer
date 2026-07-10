import type { TrackDefinition } from '../../types';

export const cs3YearTrack: TrackDefinition = {
  id: 'cs_3_year',
  name: 'מסלול כללי תלת-שנתי',
  description: 'המסלול המרכזי לתואר ראשון במדעי המחשב, מקנה ידע תיאורטי ומעשי נרחב.',
  totalCreditsRequired: 118.5,
  mandatoryCredits: 84.0,
  electiveCreditsRequired: 24.5,
  generalCreditsRequired: 10.0,
  specializationGroupsRequired: 3,
  scienceChainsRequired: 1,
  externalFacultyElectiveEnabled: false,
  electivePolicy: {
    facultyCourseAreas: ['cs'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040031', '01040166', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['01040032', '01140071', '02340124', '02340141', '01040174'] },
    { semester: 3, courses: ['00440252', '00940412', '02340125', '02340218', '02340292'] },
    { semester: 4, courses: ['02340247', '02340118', '02340123', '02360766'] },
    { semester: 5, courses: ['02360343', '02360201'] },
    { semester: 6, courses: ['02360360', '02360267', '02360334'] }
  ],
};
