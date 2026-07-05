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
}
