import type { StudentPlan, TrackId, PlanVersion, VersionedPlanEnvelope, ElectiveCreditArea } from '../types';

const TRACK_IDS: TrackId[] = ['ee', 'cs', 'ee_math', 'ee_physics', 'ee_combined', 'ce'];
const TRACK_ID_SET = new Set<TrackId>(TRACK_IDS);
const ALLOWED_TOP_LEVEL_KEYS = new Set<keyof StudentPlan>([
  'trackId',
  'semesters',
  'completedCourses',
  'selectedSpecializations',
  'favorites',
  'grades',
  'substitutions',
  'maxSemester',
  'selectedPrereqGroups',
  'summerSemesters',
  'currentSemester',
  'semesterOrder',
  'semesterTypeOverrides',
  'semesterWarningsIgnored',
  'doubleSpecializations',
  'hasEnglishExemption',
  'manualSapAverages',
  'binaryPass',
  'explicitSportCompletions',
  'completedInstances',
  'savedTracks',
  'miluimCredits',
  'englishScore',
  'englishTaughtCourses',
  'dismissedRecommendedCourses',
  'facultyColorOverrides',
  'coreToChainOverrides',
  'courseChainAssignments',
  'electiveCreditAssignments',
  'courseNotes',
  'noAdditionalCreditOverrides',
  'roboticsMinorEnabled',
  'entrepreneurshipMinorEnabled',
  'quantumComputingMinorEnabled',
  'newLabFormatEnabled',
  'initializedTracks',
  'targetGraduationSemesterId',
  'loadProfile',
  'catalogYear',
  'countOnlyCompletedCourses',
  'selectedScienceChain',
  'reviewLecturerAliases',
  'reviewTAAliases',
  'reviewDismissedNameSuggestions',
]);
const ELECTIVE_CREDIT_AREAS = new Set<ElectiveCreditArea>(['ee', 'physics', 'math', 'general']);

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isIntegerInRange(value: unknown, min: number, max: number): value is number {
  return isFiniteNumber(value) && Number.isInteger(value) && value >= min && value <= max;
}

function isTrackId(value: unknown): value is TrackId {
  return typeof value === 'string' && TRACK_ID_SET.has(value as TrackId);
}

function validateStringArray(
  value: unknown,
  maxItems: number,
  maxItemLength = 128,
): string[] | null {
  if (!Array.isArray(value) || value.length > maxItems) {
    return null;
  }

  const result: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string' || item.length === 0 || item.length > maxItemLength) {
      return null;
    }
    result.push(item);
  }

  return result;
}

function validateIntegerArray(
  value: unknown,
  maxItems: number,
  min: number,
  max: number,
): number[] | null {
  if (!Array.isArray(value) || value.length > maxItems) {
    return null;
  }

  const result: number[] = [];
  for (const item of value) {
    if (!isIntegerInRange(item, min, max)) {
      return null;
    }
    result.push(item);
  }

  return result;
}

function validateNumberMap(
  value: unknown,
  maxEntries: number,
  min?: number,
  max?: number,
): Record<string, number> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, number> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (typeof key !== 'string' || key.length === 0 || key.length > 128 || !isFiniteNumber(entryValue)) {
      return null;
    }

    if ((min !== undefined && entryValue < min) || (max !== undefined && entryValue > max)) {
      return null;
    }

    result[key] = entryValue;
  }

  return result;
}

function validateStringMap(
  value: unknown,
  maxEntries: number,
  maxValueLength = 128,
): Record<string, string> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, string> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (
      typeof key !== 'string' ||
      key.length === 0 ||
      key.length > 128 ||
      typeof entryValue !== 'string' ||
      entryValue.length === 0 ||
      entryValue.length > maxValueLength
    ) {
      return null;
    }
    result[key] = entryValue;
  }

  return result;
}

function validateElectiveCreditAssignmentMap(
  value: unknown,
  maxEntries: number,
): Record<string, ElectiveCreditArea> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, ElectiveCreditArea> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (
      typeof key !== 'string' ||
      key.length === 0 ||
      key.length > 128 ||
      typeof entryValue !== 'string' ||
      !ELECTIVE_CREDIT_AREAS.has(entryValue as ElectiveCreditArea)
    ) {
      return null;
    }
    result[key] = entryValue as ElectiveCreditArea;
  }

  return result;
}

function validateBooleanMap(
  value: unknown,
  maxEntries: number,
): Record<string, boolean> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, boolean> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (
      typeof key !== 'string' ||
      key.length === 0 ||
      key.length > 128 ||
      typeof entryValue !== 'boolean'
    ) {
      return null;
    }
    result[key] = entryValue;
  }

  return result;
}

function validateStringArrayMap(
  value: unknown,
  maxEntries: number,
  maxItemsPerEntry: number,
  maxItemLength = 128,
): Record<string, string[]> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, string[]> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (typeof key !== 'string' || key.length === 0 || key.length > 128) {
      return null;
    }

    const validatedArray = validateStringArray(entryValue, maxItemsPerEntry, maxItemLength);
    if (!validatedArray) {
      return null;
    }

    result[key] = validatedArray;
  }

  return result;
}

function validateStringRecordMap(
  value: unknown,
  maxEntries: number,
  maxSubEntries: number,
  maxValueLength = 128,
): Record<string, Record<string, string>> | null {
  if (!isPlainObject(value) || Object.keys(value).length > maxEntries) {
    return null;
  }

  const result: Record<string, Record<string, string>> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (typeof key !== 'string' || key.length === 0 || key.length > 128) {
      return null;
    }

    const validatedRecord = validateStringMap(entryValue, maxSubEntries, maxValueLength);
    if (!validatedRecord) {
      return null;
    }

    result[key] = validatedRecord;
  }

  return result;
}

function validateTrackStringArrayMap(
  value: unknown,
  maxItemsPerEntry: number,
  maxItemLength = 128,
): Record<string, string[]> | null {
  if (!isPlainObject(value) || Object.keys(value).length > TRACK_IDS.length) {
    return null;
  }

  const result: Record<string, string[]> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    if (!isTrackId(key)) {
      return null;
    }

    const validatedArray = validateStringArray(entryValue, maxItemsPerEntry, maxItemLength);
    if (!validatedArray) {
      return null;
    }

    result[key] = validatedArray;
  }

  return result;
}

function validateSemesterMap(value: unknown): Record<number, string[]> | null {
  if (!isPlainObject(value) || Object.keys(value).length > 17) {
    return null;
  }

  const result: Record<number, string[]> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    const semester = Number(key);
    if (!isIntegerInRange(semester, 0, 16)) {
      return null;
    }

    const validatedCourses = validateStringArray(entryValue, 600, 32);
    if (!validatedCourses) {
      return null;
    }

    result[semester] = validatedCourses;
  }

  return result;
}

function validateSemesterTypeOverrides(
  value: unknown,
): Record<number, 'winter' | 'spring'> | null {
  if (!isPlainObject(value) || Object.keys(value).length > 16) {
    return null;
  }

  const result: Record<number, 'winter' | 'spring'> = {};
  for (const [key, entryValue] of Object.entries(value)) {
    const semester = Number(key);
    if (!isIntegerInRange(semester, 1, 16) || (entryValue !== 'winter' && entryValue !== 'spring')) {
      return null;
    }

    result[semester] = entryValue;
  }

  return result;
}

function sanitizeStudentPlanRecord(
  value: unknown,
  options: { allowSavedTracks: boolean; expectedTrackId?: TrackId },
): StudentPlan | null {
  if (!isPlainObject(value)) {
    return null;
  }

  const keys = Object.keys(value);
  for (const key of keys) {
    if (!ALLOWED_TOP_LEVEL_KEYS.has(key as keyof StudentPlan)) {
      console.warn('Unknown key ignored:', key);
    }
  }

  const sanitized: Partial<StudentPlan> = {};

  if ('trackId' in value) {
    const { trackId } = value;
    if (trackId !== null && !isTrackId(trackId)) {
      console.warn('Validation failed trackId', trackId);
    } else if (options.expectedTrackId && trackId !== undefined && trackId !== options.expectedTrackId) {
      console.warn('Validation failed block');
    } else {
      sanitized.trackId = trackId as TrackId | null;
    }
  }

  if ('semesters' in value) {
    const semesters = validateSemesterMap(value.semesters);
    if (!semesters) { console.warn('Validation failed'); } else { sanitized.semesters = semesters; }
  }

  if ('completedCourses' in value) {
    const completedCourses = validateStringArray(value.completedCourses, 600, 32);
    if (!completedCourses) { console.warn('Validation failed'); } else { sanitized.completedCourses = completedCourses; }
  }

  if ('selectedSpecializations' in value) {
    const selectedSpecializations = validateStringArray(value.selectedSpecializations, 100, 128);
    if (!selectedSpecializations) { console.warn('Validation failed'); } else { sanitized.selectedSpecializations = selectedSpecializations; }
  }

  if ('favorites' in value) {
    const favorites = validateStringArray(value.favorites, 600, 32);
    if (!favorites) { console.warn('Validation failed'); } else { sanitized.favorites = favorites; }
  }

  if ('grades' in value) {
    const grades = validateNumberMap(value.grades, 600, 0, 100);
    if (!grades) { console.warn('Validation failed'); } else { sanitized.grades = grades; }
  }

  if ('substitutions' in value) {
    const substitutions = validateStringMap(value.substitutions, 600, 64);
    if (!substitutions) { console.warn('Validation failed'); } else { sanitized.substitutions = substitutions; }
  }

  if ('maxSemester' in value) {
    if (!isIntegerInRange(value.maxSemester, 1, 16)) { console.warn('Validation failed maxSemester'); } else
    sanitized.maxSemester = value.maxSemester;
  }

  if ('selectedPrereqGroups' in value) {
    const selectedPrereqGroups = validateStringArrayMap(value.selectedPrereqGroups, 600, 16, 32);
    if (!selectedPrereqGroups) { console.warn('Validation failed'); } else { sanitized.selectedPrereqGroups = selectedPrereqGroups; }
  }

  if ('summerSemesters' in value) {
    const summerSemesters = validateIntegerArray(value.summerSemesters, 16, 1, 16);
    if (!summerSemesters) { console.warn('Validation failed'); } else { sanitized.summerSemesters = summerSemesters; }
  }

  if ('currentSemester' in value) {
    const { currentSemester } = value;
    if (currentSemester !== null && !isIntegerInRange(currentSemester, 0, 16)) {
      console.warn('Validation failed currentSemester', currentSemester);
    } else {
      sanitized.currentSemester = currentSemester as number | null;
    }
  }

  if ('semesterOrder' in value) {
    const semesterOrder = validateIntegerArray(value.semesterOrder, 16, 1, 16);
    if (!semesterOrder) { console.warn('Validation failed'); } else { sanitized.semesterOrder = semesterOrder; }
  }

  if ('semesterTypeOverrides' in value) {
    const semesterTypeOverrides = validateSemesterTypeOverrides(value.semesterTypeOverrides);
    if (!semesterTypeOverrides) { console.warn('Validation failed'); } else { sanitized.semesterTypeOverrides = semesterTypeOverrides; }
  }

  if ('semesterWarningsIgnored' in value) {
    const semesterWarningsIgnored = validateIntegerArray(value.semesterWarningsIgnored, 16, 1, 16);
    if (!semesterWarningsIgnored) { console.warn('Validation failed'); } else { sanitized.semesterWarningsIgnored = semesterWarningsIgnored; }
  }

  if ('doubleSpecializations' in value) {
    const doubleSpecializations = validateStringArray(value.doubleSpecializations, 100, 128);
    if (!doubleSpecializations) { console.warn('Validation failed'); } else { sanitized.doubleSpecializations = doubleSpecializations; }
  }

  if ('hasEnglishExemption' in value) {
    if (typeof value.hasEnglishExemption !== 'boolean') { console.warn('Validation failed'); } else { sanitized.hasEnglishExemption = value.hasEnglishExemption; }
  }

  if ('manualSapAverages' in value) {
    const manualSapAverages = validateNumberMap(value.manualSapAverages, 600, 0, 100);
    if (!manualSapAverages) { console.warn('Validation failed'); } else { sanitized.manualSapAverages = manualSapAverages; }
  }

  if ('binaryPass' in value) {
    const binaryPass = validateBooleanMap(value.binaryPass, 600);
    if (!binaryPass) { console.warn('Validation failed'); } else { sanitized.binaryPass = binaryPass; }
  }

  if ('explicitSportCompletions' in value) {
    const explicitSportCompletions = validateStringArray(value.explicitSportCompletions, 600, 32);
    if (!explicitSportCompletions) { console.warn('Validation failed'); } else { sanitized.explicitSportCompletions = explicitSportCompletions; }
  }

  if ('completedInstances' in value) {
    const completedInstances = validateStringArray(value.completedInstances, 600, 64);
    if (!completedInstances) { console.warn('Validation failed'); } else { sanitized.completedInstances = completedInstances; }
  }

  if ('savedTracks' in value && options.allowSavedTracks) {
    if (!isPlainObject(value.savedTracks)) {
      console.warn('Validation failed savedTracks object', value.savedTracks);
    } else {
      const savedTracks: Record<string, StudentPlan> = {};
      for (const [trackId, trackPlan] of Object.entries(value.savedTracks)) {
        if (!isTrackId(trackId)) {
          console.warn('Validation failed savedTracks trackId', trackId);
          continue;
        }

        const sanitizedTrack = sanitizeStudentPlanRecord(trackPlan, {
          allowSavedTracks: false,
          expectedTrackId: trackId,
        });
        if (!sanitizedTrack) {
          console.warn('Validation failed sanitizedTrack', trackId);
          continue;
        }

        savedTracks[trackId] = sanitizedTrack;
      }

      sanitized.savedTracks = savedTracks;
    }
  }

  if ('miluimCredits' in value) {
    if (!isIntegerInRange(value.miluimCredits, 0, 10)) { console.warn('Validation failed miluimCredits'); } else
    sanitized.miluimCredits = value.miluimCredits;
  }

  if ('englishScore' in value) {
    if (!isIntegerInRange(value.englishScore, 0, 150)) { console.warn('Validation failed englishScore'); } else
    sanitized.englishScore = value.englishScore;
  }

  if ('englishTaughtCourses' in value) {
    const englishTaughtCourses = validateStringArray(value.englishTaughtCourses, 600, 32);
    if (!englishTaughtCourses) { console.warn('Validation failed'); } else { sanitized.englishTaughtCourses = englishTaughtCourses; }
  }

  if ('dismissedRecommendedCourses' in value) {
    const dismissedRecommendedCourses = validateTrackStringArrayMap(value.dismissedRecommendedCourses, 600, 32);
    if (!dismissedRecommendedCourses) { console.warn('Validation failed'); } else { sanitized.dismissedRecommendedCourses = dismissedRecommendedCourses; }
  }

  if ('facultyColorOverrides' in value) {
    const facultyColorOverrides = validateStringMap(value.facultyColorOverrides, 100, 32);
    if (!facultyColorOverrides) { console.warn('Validation failed'); } else { sanitized.facultyColorOverrides = facultyColorOverrides; }
  }

  if ('coreToChainOverrides' in value) {
    const coreToChainOverrides = validateStringArray(value.coreToChainOverrides, 600, 32);
    if (!coreToChainOverrides) { console.warn('Validation failed'); } else { sanitized.coreToChainOverrides = coreToChainOverrides; }
  }

  if ('courseChainAssignments' in value) {
    // keys = courseIds (≤32 chars), values = chainGroupIds (≤64 chars), max 200 entries
    const courseChainAssignments = validateStringMap(value.courseChainAssignments, 200, 64);
    if (!courseChainAssignments) { console.warn('Validation failed'); } else { sanitized.courseChainAssignments = courseChainAssignments; }
  }

  if ('electiveCreditAssignments' in value) {
    const electiveCreditAssignments = validateElectiveCreditAssignmentMap(value.electiveCreditAssignments, 600);
    if (!electiveCreditAssignments) { console.warn('Validation failed'); } else { sanitized.electiveCreditAssignments = electiveCreditAssignments; }
  }

  if ('courseNotes' in value) {
    const courseNotes = validateStringMap(value.courseNotes, 600, 4000);
    if (!courseNotes) { console.warn('Validation failed'); } else { sanitized.courseNotes = courseNotes; }
  }

  if ('noAdditionalCreditOverrides' in value) {
    const noAdditionalCreditOverrides = validateStringMap(value.noAdditionalCreditOverrides, 600, 32);
    if (!noAdditionalCreditOverrides) { console.warn('Validation failed'); } else { sanitized.noAdditionalCreditOverrides = noAdditionalCreditOverrides; }
  }

  if ('roboticsMinorEnabled' in value) {
    if (typeof value.roboticsMinorEnabled !== 'boolean') { console.warn('Validation failed'); } else { sanitized.roboticsMinorEnabled = value.roboticsMinorEnabled; }
  }

  if ('entrepreneurshipMinorEnabled' in value) {
    if (typeof value.entrepreneurshipMinorEnabled !== 'boolean') { console.warn('Validation failed'); } else { sanitized.entrepreneurshipMinorEnabled = value.entrepreneurshipMinorEnabled; }
  }

  if ('quantumComputingMinorEnabled' in value) {
    if (typeof value.quantumComputingMinorEnabled !== 'boolean') { console.warn('Validation failed'); } else { sanitized.quantumComputingMinorEnabled = value.quantumComputingMinorEnabled; }
  }

  if ('newLabFormatEnabled' in value) {
    if (typeof value.newLabFormatEnabled !== 'boolean') { console.warn('Validation failed'); } else { sanitized.newLabFormatEnabled = value.newLabFormatEnabled; }
  }

  if ('initializedTracks' in value) {
    const initializedTracks = validateStringArray(value.initializedTracks, 20, 32);
    if (!initializedTracks) { console.warn('Validation failed'); } else { sanitized.initializedTracks = initializedTracks; }
  }

  if ('targetGraduationSemesterId' in value) {
    const { targetGraduationSemesterId } = value;
    if (targetGraduationSemesterId !== null && !isIntegerInRange(targetGraduationSemesterId, 1, 16)) {
      console.warn('Validation failed: targetGraduationSemesterId');
    } else {
      sanitized.targetGraduationSemesterId = targetGraduationSemesterId as number | null;
    }
  }

  if ('loadProfile' in value) {
    if (value.loadProfile !== 'working' && value.loadProfile !== 'fulltime') { console.warn('Validation failed block'); } else { sanitized.loadProfile = value.loadProfile; }
  }

  if ('catalogYear' in value) {
    const { catalogYear } = value;
    if (catalogYear !== null && !isIntegerInRange(catalogYear, 2000, 2100)) {
      console.warn('Validation failed: catalogYear');
    } else {
      sanitized.catalogYear = catalogYear as number | null;
    }
  }

  if ('countOnlyCompletedCourses' in value) {
    if (typeof value.countOnlyCompletedCourses !== 'boolean') { console.warn('Validation failed'); } else { sanitized.countOnlyCompletedCourses = value.countOnlyCompletedCourses; }
  }

  if ('selectedScienceChain' in value) {
    if (value.selectedScienceChain !== null && (typeof value.selectedScienceChain !== 'string' || value.selectedScienceChain.length === 0 || value.selectedScienceChain.length > 32)) {
      console.warn('Validation failed: selectedScienceChain');
    } else {
      sanitized.selectedScienceChain = value.selectedScienceChain === null ? undefined : value.selectedScienceChain;
    }
  }

  if ('reviewLecturerAliases' in value) {
    if (value.reviewLecturerAliases !== null) {
      const reviewLecturerAliases = validateStringRecordMap(value.reviewLecturerAliases, 600, 50, 128);
      if (!reviewLecturerAliases) { console.warn('Validation failed'); } else { sanitized.reviewLecturerAliases = reviewLecturerAliases; }
    }
  }

  if ('reviewTAAliases' in value) {
    if (value.reviewTAAliases !== null) {
      const reviewTAAliases = validateStringRecordMap(value.reviewTAAliases, 600, 50, 128);
      if (!reviewTAAliases) { console.warn('Validation failed'); } else { sanitized.reviewTAAliases = reviewTAAliases; }
    }
  }

  if ('reviewDismissedNameSuggestions' in value) {
    if (value.reviewDismissedNameSuggestions !== null) {
      const reviewDismissedNameSuggestions = validateStringArrayMap(value.reviewDismissedNameSuggestions, 600, 50, 128);
      if (!reviewDismissedNameSuggestions) { console.warn('Validation failed'); } else { sanitized.reviewDismissedNameSuggestions = reviewDismissedNameSuggestions; }
    }
  }

  return sanitized as StudentPlan;
}

export function sanitizeStudentPlan(value: unknown): StudentPlan | null {
  return sanitizeStudentPlanRecord(value, { allowSavedTracks: true });
}

export function sanitizeEnvelope(value: unknown): VersionedPlanEnvelope | null {
  if (!isPlainObject(value)) { console.warn('sanitizeEnvelope: not plain object', value); return null; }
  if (value.schemaVersion !== 2) { console.warn('sanitizeEnvelope: schemaVersion !== 2', value.schemaVersion); return null; }
  if (!Array.isArray(value.versions)) { console.warn('sanitizeEnvelope: versions not array'); return null; }
  if (value.versions.length === 0) { console.warn('sanitizeEnvelope: versions empty'); return null; }
  
  // Relax the length > 6 restriction just in case the user has too many versions! We can slice it.
  let rawVersions = value.versions as unknown[];
  if (rawVersions.length > 6) {
    console.warn('sanitizeEnvelope: too many versions, slicing to 6', rawVersions.length);
    rawVersions = rawVersions.slice(0, 6);
  }

  if (typeof value.activeVersionId !== 'string' || value.activeVersionId.length === 0) { console.warn('sanitizeEnvelope: invalid activeVersionId', value.activeVersionId); return null; }

  const versions: PlanVersion[] = [];
  for (const v of rawVersions) {
    if (!isPlainObject(v)) { console.warn('sanitizeEnvelope: version not plain object', v); continue; }
    if (typeof v.id !== 'string' || v.id.length === 0 || v.id.length > 128) { console.warn('sanitizeEnvelope: invalid v.id', v.id); continue; }
    
    let vName = v.name;
    if (typeof vName !== 'string' || vName.length === 0 || vName.length > 128) {
      console.warn('sanitizeEnvelope: invalid v.name, falling back', vName);
      vName = 'גרסה ללא שם';
    }
    
    if (!isPlainObject(v.plan)) { console.warn('sanitizeEnvelope: v.plan not plain object', v.plan); continue; }
    
    let createdAt = v.createdAt;
    let updatedAt = v.updatedAt;
    if (typeof createdAt !== 'number') { console.warn('sanitizeEnvelope: invalid createdAt', createdAt); createdAt = Date.now(); }
    if (typeof updatedAt !== 'number') { console.warn('sanitizeEnvelope: invalid updatedAt', updatedAt); updatedAt = Date.now(); }

    const plan = sanitizeStudentPlan(v.plan);
    if (!plan) { console.warn('sanitizeEnvelope: plan validation returned null for version', v.id); continue; }

    versions.push({ id: v.id, name: vName as string, plan, createdAt: createdAt as number, updatedAt: updatedAt as number });
  }

  if (versions.length === 0) {
    console.warn('sanitizeEnvelope: all versions failed validation');
    return null;
  }

  let finalActiveVersionId = value.activeVersionId as string;
  const hasActive = versions.some((v) => v.id === finalActiveVersionId);
  if (!hasActive) {
    console.warn('sanitizeEnvelope: activeVersionId not found, falling back to first version', finalActiveVersionId);
    finalActiveVersionId = versions[0].id;
  }

  return { schemaVersion: 2, versions, activeVersionId: finalActiveVersionId };
}
