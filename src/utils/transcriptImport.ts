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

type SemesterParsed = { year: number; season: number }; // 0=Winter, 1=Spring, 2=Summer

function parseSemesterLabel(label: string): SemesterParsed | null {
  // Handles both Technion transcript formats:
  //   New: "2021-2022 Winter"  (4-digit second year)
  //   Old: "2021-22 Winter"    (2-digit second year, older PDF style)
  // Also handles "Summer" — e.g. "2022-2023 Summer"
  const m = label.match(/^(\d{4})-\d{2,4}\s+(Winter|Spring|Summer)$/i);
  if (!m) return null;
  const season = /winter/i.test(m[2]) ? 0 : /spring/i.test(m[2]) ? 1 : 2;
  return { year: parseInt(m[1], 10), season };
}

/**
 * Converts transcript semester labels (e.g. "2021-2022 Winter") into
 * sequential slot numbers starting at 1, ordered chronologically.
 * Unrecognised/null labels are not included — callers fall back to slot 0.
 */
export function transcriptSemesterToSlot(labels: Iterable<string | null>): Map<string, number> {
  const unique = new Map<string, SemesterParsed>();
  for (const label of labels) {
    if (!label || unique.has(label)) continue;
    const parsed = parseSemesterLabel(label);
    if (parsed) unique.set(label, parsed);
  }
  const sorted = [...unique.entries()].sort(
    ([, a], [, b]) => a.year !== b.year ? a.year - b.year : a.season - b.season,
  );
  return new Map(sorted.map(([label], i) => [label, i + 1]));
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
