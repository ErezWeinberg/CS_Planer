import type { TrackDefinition } from '../../types';

export const csCyberTrack: TrackDefinition = {
  id: 'cs_cyber',
  name: 'מגמת סייבר ואבטחת מערכות ממוחשבות',
  description: 'מגמה להכשרת בוגרים בחזית המחקר והתעשייה בתחום הסייבר.',
  totalCreditsRequired: 155.0,
  mandatoryCredits: 114.0, // 106 mandatory + 8 core
  electiveCreditsRequired: 29.0,
  generalCreditsRequired: 12.0,
  specializationGroupsRequired: 0,
  externalFacultyElectiveEnabled: false,
  electivePolicy: {
    facultyCourseAreas: ['cs'],
  },
  coreRequirement: {
    courses: ['02360501', '02360342', '02360500', '02360508', '02360990', '02360376', '02360341'],
    required: 3, // Needs 8 credits from list, which is ~3 courses
  },
  semesterSchedule: [
    { semester: 1, courses: ['01040031', '01040166', '02340114', '02340129', '03240033'] },
    { semester: 2, courses: ['01040032', '01140071', '02340124', '02340125', '02340141', '02340493'] },
    { semester: 3, courses: ['00940412', '01040134', '02340218', '02340252', '02340292', '02360491'] },
    { semester: 4, courses: ['02340118', '02340123', '02340247'] },
    { semester: 5, courses: ['02360267', '02360343', '02360360', '02360334', '02360350'] },
    { semester: 6, courses: ['02360506', '02360490', '02360496'] }
  ],
};
