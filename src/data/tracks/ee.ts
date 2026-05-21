import type { TrackDefinition } from '../../types';

export const eeTrack: TrackDefinition = {
  id: 'ee',
  name: 'הנדסת חשמל',
  description: 'המסלול הרחב ביותר בפקולטה. מאפשר התמחות בכל תחומי הנדסת החשמל והאלקטרוניקה',
  // Base = entry year 2021/22
  totalCreditsRequired: 157.5,
  mandatoryCredits: 106,
  electiveCreditsRequired: 39.5,
  generalCreditsRequired: 12,
  specializationGroupsRequired: 3,
  electivePolicy: {
    facultyCourseAreas: ['ee'],
  },
  labPool: {
    required: 3,
    mandatory: true,
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
      // 2021/22: Calculus 1M = 104031, Linear Algebra 1 = 104016
      courses: ['00440102','01040031','01040016','01140071','02340117','03240033'],
    },
    {
      semester: 2,
      // 2021/22: 114032 (replaces 114081) in sem 2; no 104038/104136 yet
      courses: ['00440252','01040013','01040035','01140075'],
      alternativeGroups: [
        { courseIds: ['01140032','01140081'], defaultCourseId: '01140032' },
      ],
    },
    {
      semester: 3,
      // 2021/22: 104221 + 104223 (not 104214/104215/104220)
      courses: ['00440105','00440268','00440157','01040221','01040223','01140073'],
    },
    {
      semester: 4,
      courses: ['00440127','00440131','00440140','01040034'],
    },
    {
      semester: 5,
      courses: ['00440137','00440148','00440202','00440158','00440124'],
    },
    {
      semester: 6,
      // 2021/22: includes 440159 (dropped in 25/26)
      courses: ['00440159','00440167'],
    },
    {
      semester: 7,
      // 2021/22: includes 440166 (dropped in 25/26)
      courses: ['00440166','00440169'],
    },
  ],

  yearVariants: {
    // 2021/22: base schedule (no overrides)
    2021: {},

    // 2022/23: Calculus 1M = 104036; 114032 moves to sem 1;
    //          sem 2 gains 104038 + 104136 (drops 104035); sem 3 → 104214/104215/104220
    2022: {
      semesterSchedule: [
        {
          semester: 1,
          courses: ['00440102','01040036','01040016','01140071','02340117','03240033'],
          alternativeGroups: [
            { courseIds: ['01140032','01140081'], defaultCourseId: '01140032' },
          ],
        },
        { semester: 2, courses: ['00440252','01040013','01040038','01040136','01140075'] },
        { semester: 3, courses: ['00440105','00440268','00440157','01040214','01040215','01040220','01140073'] },
        { semester: 4, courses: ['00440127','00440131','00440140','01040034'] },
        { semester: 5, courses: ['00440137','00440148','00440202','00440158','00440124'] },
        { semester: 6, courses: ['00440159','00440167'] },
        { semester: 7, courses: ['00440166','00440169'] },
      ],
    },

    // 2023/24: Calculus 1M = 104012; 104016 replaces 104064; 114032 replaces 114081 (still in alt group)
    2023: {
      semesterSchedule: [
        {
          semester: 1,
          courses: ['00440102','01040012','01140071','02340117','03240033'],
          alternativeGroups: [
            { courseIds: ['01040016','01040064'], defaultCourseId: '01040016' },
            { courseIds: ['01140032','01140081'], defaultCourseId: '01140032' },
          ],
        },
        { semester: 2, courses: ['00440252','01040013','01040038','01040136','01140075'] },
        { semester: 3, courses: ['00440105','00440268','00440157','01040214','01040215','01040220','01140073'] },
        { semester: 4, courses: ['00440127','00440131','00440140','01040034'] },
        { semester: 5, courses: ['00440137','00440148','00440202','00440158','00440124'] },
        { semester: 6, courses: ['00440159','00440167'] },
        { semester: 7, courses: ['00440166','00440169'] },
      ],
    },

    // 2025/26: Calculus 1M = 104012; 104064 direct (settled); 114032 direct in sem 1;
    //          sem 6/7 simplified (440159 and 440166 dropped)
    2025: {
      semesterSchedule: [
        { semester: 1, courses: ['00440102','01040012','01040064','01140071','01140032','02340117','03240033'] },
        { semester: 2, courses: ['00440252','01040013','01040038','01040136','01140075'] },
        { semester: 3, courses: ['00440105','00440268','00440157','01040214','01040215','01040220','01140073'] },
        { semester: 4, courses: ['00440127','00440131','00440140','01040034'] },
        { semester: 5, courses: ['00440137','00440148','00440202','00440158','00440124'] },
        { semester: 6, courses: ['00440167'] },
        { semester: 7, courses: ['00440169'] },
      ],
    },
  },
};
