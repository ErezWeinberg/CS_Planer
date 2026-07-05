import type { TrackDefinition } from '../../types';

export const csMathTrack: TrackDefinition = {
  id: 'cs_math',
  name: 'מדעי המחשב ובמתמטיקה',
  description: 'תוכנית לימודים משולבת לתואר בוגר למדעים במדעי המחשב ובמתמטיקה (בשיתוף עם הפקולטה למתמטיקה).',
  totalCreditsRequired: 152.0,
  mandatoryCredits: 109.5,
  electiveCreditsRequired: 32.5,
  generalCreditsRequired: 10.0,
  specializationGroupsRequired: 0,
  externalFacultyElectiveEnabled: true,
  electivePolicy: {
    facultyCourseAreas: ['cs', 'math'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040195', '01040066', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['01040281', '01040168', '02340124', '02340141', '01140071'] },
    { semester: 3, courses: ['01040295', '01040293', '01040222', '02340218', '00440252'] },
    { semester: 4, courses: ['01040142', '01040285', '01040158', '02340118', '02340247'] },
    { semester: 5, courses: ['01040122', '01040279', '01040294', '02360343'] },
    { semester: 6, courses: ['01040192', '01060156', '02340123', '02360267'] }
  ],
};
