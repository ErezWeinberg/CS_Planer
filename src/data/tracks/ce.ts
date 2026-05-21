import type { TrackDefinition } from '../../types';

export const ceTrack: TrackDefinition = {
  id: 'ce',
  name: 'הנדסת מחשבים',
  description: 'מסלול להנדסת מחשבים המשלב ידע בחומרה, תוכנה ומערכות מחשב מתקדמות',
  // Base = entry year 2021/22
  totalCreditsRequired: 158,
  mandatoryCredits: 113.5,
  electiveCreditsRequired: 27,
  generalCreditsRequired: 12,
  specializationGroupsRequired: 3,
  electivePolicy: {
    facultyCourseAreas: ['ee', 'cs'],
  },
  coreRequirement: {
    // 2021/22 core: includes 234129; required = 3
    courses: ['00440198', '00440202', '00440334', '02340292', '02360343', '02340129'],
    required: 3,
  },
  labPool: {
    required: 0,
    mandatory: false,
    max: 4,
    courses: [
      '00450100','00450101','00450102','00450103','00450104',
      '00450105','00450106','00450107','00450108','00450109',
      '00450110','00450111','00450112','00450113','00450114',
      '00450115','00450116','00450117','00450118','00450119',
      '00450120',
    ],
  },
  semesterSchedule: [
    {
      semester: 1,
      // 2021/22: Calculus 1M = 104031; 234117 replaces 234114
      courses: ['00440102','01040031','01140071','03240033'],
      alternativeGroups: [
        { courseIds: ['01040016','01040167'], defaultCourseId: '01040016' },
        { courseIds: ['02340117','02340114'], defaultCourseId: '02340117' },
      ],
    },
    {
      semester: 2,
      // 2021/22: 104035 only; 440252 replaces 234252; no 104038/104136
      courses: ['01040013','01040035','01140075'],
      alternativeGroups: [
        { courseIds: ['00440252','02340252'], defaultCourseId: '00440252' },
      ],
    },
    {
      semester: 3,
      // 2021/22: 104221 + 104223 (not 104214/104215/104220)
      courses: ['00440105','01040221','01040223','02340141','02340124'],
    },
    {
      semester: 4,
      courses: ['00440127','00440131','01040134','01040034','01140073','02340118','02340218'],
    },
    {
      semester: 5,
      // 460209 replaces 234123 (both listed as alternatives); 460267 replaces 236267
      courses: ['00440137','00440157','02340247'],
      alternativeGroups: [
        { courseIds: ['00460209','02340123'], defaultCourseId: '00460209' },
        { courseIds: ['00460267','02360267'], defaultCourseId: '00460267' },
      ],
    },
    {
      semester: 6,
      courses: ['00440167'],
    },
    {
      semester: 7,
      courses: ['00440169'],
    },
  ],

  yearVariants: {
    // 2021/22: base schedule (no overrides)
    2021: {},

    // 2022/23: Calculus 1M = 104036; sem 2 gains 104038 + 104136 (drops 104035);
    //          sem 3 → 104214/104215/104220
    2022: {
      totalCreditsRequired: 158.5,
      semesterSchedule: [
        {
          semester: 1,
          courses: ['00440102','01040036','01140071','03240033'],
          alternativeGroups: [
            { courseIds: ['01040016','01040167'], defaultCourseId: '01040016' },
            { courseIds: ['02340117','02340114'], defaultCourseId: '02340117' },
          ],
        },
        {
          semester: 2,
          courses: ['01040013','01040136','01040038','01140075'],
          alternativeGroups: [
            { courseIds: ['00440252','02340252'], defaultCourseId: '00440252' },
          ],
        },
        { semester: 3, courses: ['00440105','01040214','01040215','01040220','02340141','02340124'] },
        { semester: 4, courses: ['00440127','00440131','01040134','01040034','01140073','02340118','02340218'] },
        {
          semester: 5,
          courses: ['00440137','00440157','02340247'],
          alternativeGroups: [
            { courseIds: ['00460209','02340123'], defaultCourseId: '00460209' },
            { courseIds: ['00460267','02360267'], defaultCourseId: '00460267' },
          ],
        },
        { semester: 6, courses: ['00440167'] },
        { semester: 7, courses: ['00440169'] },
      ],
    },

    // 2023/24: Calculus 1M = 104012; 104016 replaces 104064; 234129+234114 now direct in sem 1;
    //          sem 2 gains 234125 (drops 104038); sem 4 drops 104134; 104134 moves to sem 5
    2023: {
      totalCreditsRequired: 158.5,
      specializationGroupsRequired: 2,
      coreRequirement: {
        // 2023/24 core: 234129 removed; required drops to 2
        courses: ['00440198', '00440202', '00440334', '02340292', '02360343'],
        required: 2,
      },
      semesterSchedule: [
        {
          semester: 1,
          courses: ['00440102','01040012','01140071','02340129','02340114','03240033'],
          alternativeGroups: [
            { courseIds: ['01040016','01040064'], defaultCourseId: '01040016' },
          ],
        },
        { semester: 2, courses: ['00440252','01040013','01040136','02340125','01140075'] },
        { semester: 3, courses: ['00440105','01040214','01040215','01040220','02340141','02340124'] },
        { semester: 4, courses: ['00440127','00440131','01040034','01140073','02340118','02340218'] },
        {
          semester: 5,
          courses: ['00440137','01040134','00440157','02340247'],
          alternativeGroups: [
            { courseIds: ['00460209','02340123'], defaultCourseId: '00460209' },
            { courseIds: ['00460267','02360267'], defaultCourseId: '00460267' },
          ],
        },
        { semester: 6, courses: ['00440167'] },
        { semester: 7, courses: ['00440169'] },
      ],
    },

    // 2025/26: 104016/104064 as alt group; 234129/234114 direct in sem 1; 234123 direct in sem 5
    2025: {
      totalCreditsRequired: 158.5,
      specializationGroupsRequired: 2,
      coreRequirement: {
        courses: ['00440198', '00440202', '02360334', '00440334', '02340292', '02360343'],
        required: 2,
        orGroups: [['02360334', '00440334']],
      },
      semesterSchedule: [
        {
          semester: 1,
          courses: ['00440102','01040012','02340129','01140071','02340114'],
          alternativeGroups: [
            { courseIds: ['01040064','01040016'], defaultCourseId: '01040064' },
          ],
        },
        { semester: 2, courses: ['01040013','02340125','01040136','01140075','00440252'] },
        { semester: 3, courses: ['02340124','02340141','00440105','01040220','01040215','01040214','03240033'] },
        { semester: 4, courses: ['00440131','01040034','00440127','02340218','02340118','01140073'] },
        { semester: 5, courses: ['00440137','00440157','02340123','01040134','02340247','00460267'] },
        { semester: 6, courses: ['00440167'] },
        { semester: 7, courses: ['00440169'] },
      ],
    },
  },
};
