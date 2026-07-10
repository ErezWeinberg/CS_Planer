export type Language = 'he' | 'en';

export interface Translations {
  courseNames?: Record<string, string>;
  // SemesterGrid & App & Login
  notAssigned: string;
  oneCourseOnlyPrefix: string;
  viewMode: string;
  moreColumns: string;
  lessColumns: string;
  facultyLegend: string;
  legend: string;
  clickToChangeColor: string;
  colorPickerHint: string;
  addSemester: string;
  removeSemester: string;
  addSummer: string;
  removeSummer: string;
  autoRetry: string;
  confirmReset: string;
  errorCopyLimit: string;
  errorNoShareToCopy: string;
  copyCreated: string;
  shareReviewTitle: string;
  newUpdate: string;
  shareReviewDesc: string;
  createCopyBtn: string;
  shareEditWarning: string;
  shareViewWarning: string;
  sharedBy: string;
  saving: string;
  saved: string;
  saveError: string;
  workOnSeparateCopy: string;
  openYourPlanner: string;
  openMenu: string;
  whatsappSupport: string;
  systemGuide: string;
  pendingUpdates1: string;
  pendingUpdates2: string;
  exportShareImport: string;
  pendingUpdatesLabel: string;
  darkModeToLight: string;
  lightModeToAuto: string;
  autoModeToDark: string;
  errorLoadingCourses: string;
  loadingCourses: string;
  errorLoading: string;
  logout: string;
  // CourseDetailModal
  openInSap: string;
  countedForChains: string;
  countedAsCoreHint: string;
  mandatory: string;
  elective: string;
  assigned: string;
  assignToThisChainOnly: string;
  assignBtn: string;
  countedOnlyInAssigned: string;
  returnToCore: string;
  prerequisitesTitle: string;
  noPrerequisites: string;
  replacedBy: string;
  auto: string;
  customComposition: string;
  optionSelected: string;
  autoDefault: string;
  optionN: string;
  customPrereqComposition: string;
  searchCourseToAdd: string;
  prereqReplacement: string;
  prereqReplacementHint: string;
  searchCourseByNameOrId: string;
  whatDependsOnThis: string;
  noDependentCourses: string;
  dependentCoursesCount: string;
  inPlan: string;
  noAdditionalCreditTitle: string;
  creditConflictWith: string;
  thisCourseNoCredit: string;
  otherCourseNoCredit: string;
  noCreditDefaultHint: string;
  containingCourseTitle: string;
  containsCourse: string;
  mandatoryCreditsCounted: string;
  excessCreditsCounted: string;

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

  // Course Details
  courseDetails: string;
  prerequisites: string;
  faculty: string;
  syllabus: string;
  
  // Progress
  overallCredits: string;
  
  // Topbar
  myPlan: string;
  login: string;
  language: string;

  // App Layout
  appTitle: string;
  support: string;
  guide: string;
  shareImport: string;
  darkModeToggle: string;
  goToMyPlan: string;
  addedTo: string;

  // Semester Column
  currentSemester: string;
  unmarkCompleted: string;
  markAllCompleted: string;
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
  savePass: string;
  saveGrade: string;
  deleteGrade: string;
  changeTrack: string;
  degreeCompletionCheck: string;
  resetSystem: string;
  undoAction: string;
  undoActionCount: string;
  noUndoAction: string;
  degreeCheckDesc: string;
  importConfirm: string;
  specializationsTitle: string;
  selectedSpecializations: string;
  cancelDoubleSpec: string;
  setDoubleSpec: string;
  deselect: string;
  selectGroup: string;
  cancelAssignment: string;
  specFilesError: string;
  specFilesWarnings: string;
  viewGrid: string;
  viewRows: string;
  viewBuckets: string;
  allRatings: string;
  rating3Plus: string;
  rating4Plus: string;
  rating45Plus: string;
  rating5Only: string;
  filterDefaultOrder: string;
  filterByGrade: string;
  filterByRating: string;
  filterByWorkload: string;
  filterByStaff: string;
  gradesGeneral: string;
  gradesHigh: string;
  gradesMedium: string;
  gradesLow: string;
  mandatoryElectiveMode: string;
  coursesFilterBtn: string;
  winterSpringBtn: string;
  englishBtn: string;
  malagBtn: string;
  freeElectiveBtn: string;
  advancedBtn: string;
  winterBtn: string;
  springBtn: string;
  dataDict: (key: string) => string;
}
