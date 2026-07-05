import type { TrackDefinition } from '../../types';

export const mathCsTrack: TrackDefinition = {
  id: 'math_cs',
  name: 'מתמטיקה עם מדעי המחשב',
  description: 'תכנית תלת-שנתית משולבת במתמטיקה עם מדעי המחשב (בוגר למדעים במתמטיקה עם מדעי המחשב).',
  totalCreditsRequired: 124.0,
  mandatoryCredits: 94.0,
  electiveCreditsRequired: 20.0,
  generalCreditsRequired: 10.0,
  specializationGroupsRequired: 0,
  externalFacultyElectiveEnabled: true,
  electivePolicy: {
    facultyCourseAreas: ['math', 'cs'],
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040195', '01040066', '01040002', '02340114', '03240033'] },
    { semester: 2, courses: ['01040281', '01040168', '01140071', '01040286', '02340124'] },
    { semester: 3, courses: ['01040295', '01040293', '02340218', '01040222', '04402520'] },
    { semester: 4, courses: ['01040158', '01040285', '01040291', '02340118'] },
    { semester: 5, courses: ['01040122', '01040294', '02340123'] },
    { semester: 6, courses: ['01040192'] }
  ],
};
