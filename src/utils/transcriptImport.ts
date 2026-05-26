/**
 * Transcript import utilities.
 * Ported from Optigrade (https://github.com/Galsiegel/Optigrade).
 *
 * Processes the `courses` array returned by the Optigrade PDF-parsing backend
 * (`POST /api/v1/transcripts/parse-pdf`) into course-ID → grade/semester maps.
 */

import { toSapEightDigitCourseIdForStorage } from './courseNumberNormalize';

export type TranscriptCourseRow = {
  course_id?: unknown;
  grade?: unknown;
  is_pass?: unknown;
  is_numeric_grade?: unknown;
  semester?: unknown;
  name?: unknown;
};

export type GradeWithSemester = {
  grade: string;
  semester: string | null;
};

/** "-1" is the canonical value stored for pass/fail courses. */
const PASS_FAIL_DB = '-1';

function rowToGradeString(row: TranscriptCourseRow): string | null {
  const idRaw = row.course_id;
  if (typeof idRaw !== 'string') return null;
  const courseId = idRaw.trim();
  if (!courseId) return null;

  if (row.is_pass === true) return PASS_FAIL_DB;

  const gradeStr = String(row.grade ?? '').trim();
  if (gradeStr === 'Pass') return PASS_FAIL_DB;

  if (row.is_numeric_grade === true && /^\d+$/.test(gradeStr)) {
    const n = Number(gradeStr);
    if (n >= 0 && n <= 100) return String(n);
    return null;
  }

  if (/exemption/i.test(gradeStr)) return PASS_FAIL_DB;

  if (/^\d+(?:\.\d+)?$/.test(gradeStr)) {
    const n = Number(gradeStr.replace(',', '.'));
    if (Number.isFinite(n) && n >= 0 && n <= 100) return String(Math.round(n));
  }

  return null;
}

/** Converts a raw courses payload into a `courseId → grade string` map. */
export function gradesRecordFromTranscriptPayload(courses: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!Array.isArray(courses)) return out;
  for (const item of courses) {
    if (!item || typeof item !== 'object') continue;
    const g = rowToGradeString(item as TranscriptCourseRow);
    if (g === null) continue;
    const rawId = String((item as TranscriptCourseRow).course_id ?? '').trim();
    if (!rawId) continue;
    out[toSapEightDigitCourseIdForStorage(rawId)] = g;
  }
  return out;
}

/** Converts a raw courses payload into a `courseId → {grade, semester}` map. */
export function gradesWithSemesterFromTranscriptPayload(
  courses: unknown,
): Record<string, GradeWithSemester> {
  const out: Record<string, GradeWithSemester> = {};
  if (!Array.isArray(courses)) return out;
  for (const item of courses) {
    if (!item || typeof item !== 'object') continue;
    const g = rowToGradeString(item as TranscriptCourseRow);
    if (g === null) continue;
    const r = item as TranscriptCourseRow;
    const rawId = String(r.course_id ?? '').trim();
    if (!rawId) continue;
    const id = toSapEightDigitCourseIdForStorage(rawId);
    const sem = String(r.semester ?? '').trim();
    out[id] = { grade: g, semester: sem || null };
  }
  return out;
}
