export type Language = 'he' | 'en';

export interface Translations {
  // General UI
  loading: string;
  searchCourse: string;
  courseNotFound: string;
  close: string;
  cancel: string;
  save: string;
  delete: string;
  edit: string;

  // Track Selector
  technionFacultyOfComputerScience: string;
  selectTrackToStart: string;
  trackDescriptions: Record<string, string>;

  // Sidebar / Unassigned
  coursesToAssign: string;
  unassignedDragHint: string;
  noUnassignedCourses: string;

  // Semesters
  semester: string;
  summerSemester: string;
  totalCredits: string;
  mandatory: string;
  elective: string;

  // Course Details
  courseDetails: string;
  prerequisites: string;
  faculty: string;
  syllabus: string;
  
  // Progress
  degreeProgress: string;
  overallCredits: string;
  
  // Topbar
  myPlan: string;
  login: string;
  logout: string;
  language: string;

  // App Layout
  appTitle: string;
  support: string;
  guide: string;
  shareImport: string;
  darkModeToggle: string;
  shareImport: string;
  darkModeToggle: string;
  goToMyPlan: string;
  addedTo: string;

  // Semester Column
  currentSemester: string;
  unmarkCompleted: string;
  markAllCompleted: string;
  creditsLabel: string;
  semesterAverageTooltip: string;
  showSeasonWarnings: string;
  ignoreSeasonWarnings: string;
  unsetCurrentSemester: string;
  setCurrentSemester: string;
  dragCoursesHere: string;
  dropHere: string;
  dragHere: string;

  // Course Card
  removeFromFavorites: string;
  addToFavorites: string;
  removeFromPlan: string;
  removeFromSemester: string;
  markUncompleted: string;
  markCompleted: string;
  winterCourseOnly: string;
  springCourseOnly: string;
  remainingPrereq: string;
  noAdditionalCreditPrefix: string;
  containsCourse: string;
  mandatoryCreditsCounted: string;
  freeElectiveCreditsCounted: string;
  englishCourseTooltip: string;
  freeElectiveTooltip: string;
  notAssignedLabel: string;
  notAssignedTooltip: string;
  electiveLabel: string;
  coreLabel: string;
  coreTooltip: string;
  mandatoryLabel: string;
  passLabel: string;
  missingPrereqsTooltip: string;
  downstreamWarningTooltip: string;
  postponeSlackPrefix: string;
  postponeSlackSuffix: string;
  originalCreditsZeroRecognized: string;
  creditsLabelShort: string;
  historicalGradesTooltip: string;
  generalAverage: string;
  average: string;
  generalMedian: string;
  median: string;
  examinees: string;

  // Requirements Panel
  degreeProgress: string;
  allCourses: string;
  completedOnly: string;
  allRequirementsMet: string;
  completedCreditsCheck: string;
  totalCredits: string;
  mandatoryCourses: string;
  facultyElectives: string;
  coreCourses: string;
  coursesCheck: string;
  coursesLabel: string;
  oneOfTwo: string;
  releaseSurplusToChain: string;
  toChain: string;
  miluim: string;
  creditsLabel: string;
  scienceChain: string;
  specializationGroups: string;
  weightedAverage: string;
  completedLabel: string;
  missingCredits: string;
  missingCourses: string;
  noSelection: string;
  selectScienceChain: string;
  unavailableGroups: string;
  doubleGroup: string;
  generalElectivesLabel: string;
  englishCoursesLabel: string;
  labsLabel: string;
  sportFloorLabel: string;
  enrichmentFloorLabel: string;
  freeChoiceLabel: string;

  // CourseDetailModal
  noteLabel: string;
  notePlaceholder: string;
  gradeLabel: string;
  binaryPassLabel: string;
  notInAverage: string;
  binaryPassDesc: string;
  gradePlaceholder: string;
  gradeError: string;
  removeFromPlan: string;
  removeFromSemester: string;
  savePass: string;
  saveGrade: string;
  deleteGrade: string;
}
