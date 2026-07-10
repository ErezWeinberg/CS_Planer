import type { TrackSpecializationCatalog, TrackId } from '../types';

export const CS_SCIENCE_CHAINS: TrackSpecializationCatalog = {
  trackId: 'cs',
  trackFolder: '',
  diagnostics: [],
  hasErrors: false,
  interactionDisabled: false,
  groups: [
    {
      id: 'science-physics',
      trackId: 'cs',
      title: 'שרשרת פיזיקה',
      name: 'פיזיקה',
      sourceFile: '',
      courses: [
        { courseNumber: '01140071', courseName: 'פיזיקה 1', category: 'mandatory_core' },
        { courseNumber: '01140152', courseName: 'פיזיקה 1 למדעי המחשב', category: 'mandatory_core' },
        { courseNumber: '01140072', courseName: 'פיזיקה 2', category: 'mandatory_core' },
        { courseNumber: '01140158', courseName: 'פיזיקה 2 למדעי המחשב', category: 'mandatory_core' },
        { courseNumber: '01140073', courseName: 'פיזיקה 3', category: 'elective' },
        { courseNumber: '01140075', courseName: 'מעבדה בפיזיקה 3ח', category: 'elective' },
        { courseNumber: '01140076', courseName: 'מעבדה בפיזיקה 3', category: 'elective' }
      ],
      mandatoryCourses: [],
      electiveCourses: [],
      minCoursesToComplete: 3,
      notes: ['יש להשלים 3 מקצועות (פיזיקה 1, פיזיקה 2, ומקצוע נוסף).'],
      modeState: 'single_only',
      supportedModes: ['single'],
      canBeDouble: false,
      mutualExclusionRules: [],
      replacementRules: [],
      diagnostics: [],
      requirementsByMode: {
        single: {
          totalCoursesRequiredForGroup: 3,
          mandatoryCourses: [],
          mandatoryChoiceRules: [
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'פיזיקה 1',
              options: [
                { kind: 'course', courseNumber: '01140071', courseName: 'פיזיקה 1' },
                { kind: 'course', courseNumber: '01140152', courseName: 'פיזיקה 1 למדעי המחשב' }
              ]
            },
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'פיזיקה 2',
              options: [
                { kind: 'course', courseNumber: '01140072', courseName: 'פיזיקה 2' },
                { kind: 'course', courseNumber: '01140158', courseName: 'פיזיקה 2 למדעי המחשב' }
              ]
            },
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'מקצוע נוסף בפיזיקה',
              options: [
                { kind: 'course', courseNumber: '01140073', courseName: 'פיזיקה 3' },
                { kind: 'course', courseNumber: '01140075', courseName: 'מעבדה בפיזיקה 3ח' },
                { kind: 'course', courseNumber: '01140076', courseName: 'מעבדה בפיזיקה 3' }
              ]
            }
          ],
          selectionRule: null,
          additionalCoursesRequired: 0,
          additionalCourseSelectionRule: null,
          logicalExpression: null
        },
        double: null
      }
    },
    {
      id: 'science-chemistry',
      trackId: 'cs',
      title: 'שרשרת כימיה',
      name: 'כימיה',
      sourceFile: '',
      courses: [
        { courseNumber: '01240411', courseName: 'כימיה כללית', category: 'mandatory_core' },
        { courseNumber: '01240412', courseName: 'מעבדה בכימיה כללית', category: 'mandatory_core' },
        { courseNumber: '01240413', courseName: 'כימיה כללית 2', category: 'elective' },
        { courseNumber: '01240510', courseName: 'כימיה פיזיקלית', category: 'elective' },
        { courseNumber: '01240708', courseName: 'כימיה אורגנית', category: 'elective' }
      ],
      mandatoryCourses: [],
      electiveCourses: [],
      minCoursesToComplete: 3,
      notes: ['יש להשלים כימיה כללית, מעבדה, וקורס נוסף.'],
      modeState: 'single_only',
      supportedModes: ['single'],
      canBeDouble: false,
      mutualExclusionRules: [],
      replacementRules: [],
      diagnostics: [],
      requirementsByMode: {
        single: {
          totalCoursesRequiredForGroup: 3,
          mandatoryCourses: [
            { courseNumber: '01240411', courseName: 'כימיה כללית' },
            { courseNumber: '01240412', courseName: 'מעבדה בכימיה כללית' }
          ],
          mandatoryChoiceRules: [
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'קורס נוסף בכימיה',
              options: [
                { kind: 'course', courseNumber: '01240413', courseName: 'כימיה כללית 2' },
                { kind: 'course', courseNumber: '01240510', courseName: 'כימיה פיזיקלית' },
                { kind: 'course', courseNumber: '01240708', courseName: 'כימיה אורגנית' }
              ]
            }
          ],
          selectionRule: null,
          additionalCoursesRequired: 0,
          additionalCourseSelectionRule: null,
          logicalExpression: null
        },
        double: null
      }
    },
    {
      id: 'science-biology',
      trackId: 'cs',
      title: 'שרשרת ביולוגיה',
      name: 'ביולוגיה',
      sourceFile: '',
      courses: [
        { courseNumber: '01340201', courseName: 'מבוא לביולוגיה (א)', category: 'mandatory_core' },
        { courseNumber: '01340020', courseName: 'מבוא לביולוגיה', category: 'mandatory_core' },
        { courseNumber: '01340058', courseName: 'פרינציפים בביולוגיה', category: 'elective' },
        { courseNumber: '03240033', courseName: 'ביולוגיה', category: 'elective' },
        { courseNumber: '01340019', courseName: 'ביולוגיה של התא', category: 'elective' }
      ],
      mandatoryCourses: [],
      electiveCourses: [],
      minCoursesToComplete: 2,
      notes: ['יש להשלים מבוא לביולוגיה וקורס נוסף.'],
      modeState: 'single_only',
      supportedModes: ['single'],
      canBeDouble: false,
      mutualExclusionRules: [],
      replacementRules: [],
      diagnostics: [],
      requirementsByMode: {
        single: {
          totalCoursesRequiredForGroup: 2,
          mandatoryCourses: [],
          mandatoryChoiceRules: [
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'מבוא לביולוגיה',
              options: [
                { kind: 'course', courseNumber: '01340201', courseName: 'מבוא לביולוגיה (א)' },
                { kind: 'course', courseNumber: '01340020', courseName: 'מבוא לביולוגיה' },
                { kind: 'course', courseNumber: '03240033', courseName: 'ביולוגיה' }
              ]
            },
            {
              kind: 'choice_rule',
              type: 'choose_1_from',
              count: 1,
              groupName: 'קורס נוסף בביולוגיה',
              options: [
                { kind: 'course', courseNumber: '01340058', courseName: 'פרינציפים בביולוגיה' },
                { kind: 'course', courseNumber: '01340019', courseName: 'ביולוגיה של התא' }
              ]
            }
          ],
          selectionRule: null,
          additionalCoursesRequired: 0,
          additionalCourseSelectionRule: null,
          logicalExpression: null
        },
        double: null
      }
    }
  ]
};

export function getScienceChainCatalog(trackId: TrackId): TrackSpecializationCatalog | null {
  if (trackId.startsWith('cs')) return CS_SCIENCE_CHAINS;
  return null;
}
