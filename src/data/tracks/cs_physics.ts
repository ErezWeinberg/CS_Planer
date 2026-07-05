import type { TrackDefinition } from '../../types';

export const csPhysicsTrack: TrackDefinition = {
  id: 'cs_physics',
  name: 'מדעי המחשב ובפיזיקה',
  description: 'תוכנית לימודים משולבת לתואר מוסמך למדעים במדעי המחשב ובפיזיקה (בשיתוף עם הפקולטה לפיזיקה).',
  totalCreditsRequired: 163.5,
  mandatoryCredits: 127.5,
  electiveCreditsRequired: 26.0,
  generalCreditsRequired: 10.0,
  specializationGroupsRequired: 0,
  externalFacultyElectiveEnabled: true,
  electivePolicy: {
    facultyCourseAreas: ['cs', 'physics'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['00440102', '01040031', '01040166', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['02340252', '01040032', '02340124', '02340141'] },
    { semester: 3, courses: ['00940412', '01040134', '01040033', '01140020', '01140074', '02340218', '02340292'] },
    { semester: 4, courses: ['01040285', '01140021', '01140076', '02340118', '02340123', '02340247'] },
    { semester: 5, courses: ['01040214', '01040220', '01040215', '01140101', '01140086'] },
    { semester: 6, courses: ['01140035', '01150203', '01140246', '01140036'] },
    { semester: 7, courses: ['02340125', '01150204', '02360343', '01240108'] },
    { semester: 8, courses: ['01140037'] }
  ],
};
