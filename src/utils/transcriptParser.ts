/**
 * Client-side Technion transcript parser.
 * Ported from Optigrade backend (https://github.com/Galsiegel/Optigrade)
 * `backend/student_loader/parse_transcript.py`.
 *
 * Parses text lines extracted from a Technion English transcript PDF and
 * returns structured course records compatible with TranscriptCourseRow.
 */

import type { TranscriptCourseRow } from './transcriptImport';

// Semester suffix shared across all patterns
const SEM = String.raw`(\d{4}-\d{4}\s+(?:Winter|Spring|Summer))`;

// Patterns ordered from most-specific (no-name) to least-specific (with-name),
// matching the exact order in the Python parser.
const PATTERNS: [string, RegExp][] = [
  // ── No-name variants ──────────────────────────────────────────────────────
  ['numeric_no_name',        new RegExp(String.raw`^(\d{8})\s+(\d+(?:\.\d+)?)\s+(\d+)\s+${SEM}\s*$`)],
  ['pass_credits_no_name',   new RegExp(String.raw`^(\d{8})\s+(\d+(?:\.\d+)?)\s+Pass\s+${SEM}\s*$`)],
  ['pass_no_name_no_cred',   new RegExp(String.raw`^(\d{8})\s+Pass\s+${SEM}\s*$`)],
  ['exempt_without_no_name', new RegExp(String.raw`^(\d{8})\s+Exemption without points\s+${SEM}\s*$`)],
  // ── With-name variants ────────────────────────────────────────────────────
  ['numeric',                new RegExp(String.raw`^(\d{8})\s+(.*?)\s+(\d+(?:\.\d+)?)\s+(\d+)\s+${SEM}\s*$`)],
  ['pass_credits',           new RegExp(String.raw`^(\d{8})\s+(.*?)\s+(\d+(?:\.\d+)?)\s+Pass\s+${SEM}\s*$`)],
  ['exempt_with',            new RegExp(String.raw`^(\d{8})\s+(.*?)\s+(\d+(?:\.\d+)?)\s+Exemption with points\s+${SEM}\s*$`)],
  ['pass_no_credits',        new RegExp(String.raw`^(\d{8})\s+(.*?)\s*Pass\s+${SEM}\s*$`)],
  ['exempt_without',         new RegExp(String.raw`^(\d{8})\s+(.*?)\s*Exemption without points\s+${SEM}\s*$`)],
];

/** Lines that look like headers/footers to ignore as prefix candidates. */
const HEADER_RE = /Transcript of |for the degree |in the faculty of |accumulated \d|GPA of |Page \d|Student ID|^\s*$/i;

type ParsedCourse = {
  raw_id: string;
  name: string;
  grade: string;
  semester: string;
  is_pass: boolean;
  is_numeric_grade: boolean;
};

function parseLine(line: string, prefix: string): ParsedCourse | null {
  const trimmed = line.trim();
  for (const [tag, pat] of PATTERNS) {
    const m = pat.exec(trimmed);
    if (!m) continue;
    const g = m.slice(1); // capture groups

    if (tag === 'numeric_no_name') {
      return { raw_id: g[0], name: prefix, grade: g[2], semester: g[3].trim(), is_pass: false, is_numeric_grade: true };
    }
    if (tag === 'pass_credits_no_name') {
      return { raw_id: g[0], name: prefix, grade: 'Pass', semester: g[2].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'pass_no_name_no_cred') {
      return { raw_id: g[0], name: prefix, grade: 'Pass', semester: g[1].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'exempt_without_no_name') {
      return { raw_id: g[0], name: prefix, grade: 'Exemption without points', semester: g[1].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'numeric') {
      const name = [prefix, g[1].trim()].filter(Boolean).join(' ');
      return { raw_id: g[0], name, grade: g[3], semester: g[4].trim(), is_pass: false, is_numeric_grade: true };
    }
    if (tag === 'pass_credits') {
      const name = [prefix, g[1].trim()].filter(Boolean).join(' ');
      return { raw_id: g[0], name, grade: 'Pass', semester: g[3].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'exempt_with') {
      const name = [prefix, g[1].trim()].filter(Boolean).join(' ');
      return { raw_id: g[0], name, grade: 'Exemption with points', semester: g[3].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'pass_no_credits') {
      const name = [prefix, g[1].trim()].filter(Boolean).join(' ');
      return { raw_id: g[0], name, grade: 'Pass', semester: g[2].trim(), is_pass: true, is_numeric_grade: false };
    }
    if (tag === 'exempt_without') {
      const name = [prefix, g[1].trim()].filter(Boolean).join(' ');
      return { raw_id: g[0], name, grade: 'Exemption without points', semester: g[2].trim(), is_pass: true, is_numeric_grade: false };
    }
  }
  return null;
}

/**
 * Parse text lines extracted from a Technion transcript PDF into structured
 * course rows. Handles multi-line course names via a pending-prefix buffer.
 */
export function parseTranscriptLines(lines: string[]): TranscriptCourseRow[] {
  const results: TranscriptCourseRow[] = [];
  const pendingPrefix: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      pendingPrefix.length = 0;
      continue;
    }

    const prefix = pendingPrefix.join(' ').trim();
    const parsed = parseLine(trimmed, prefix);

    if (parsed) {
      results.push({
        course_id: parsed.raw_id,
        name: parsed.name,
        grade: parsed.grade,
        is_pass: parsed.is_pass,
        is_numeric_grade: parsed.is_numeric_grade,
        semester: parsed.semester,
      });
      pendingPrefix.length = 0;
    } else if (!HEADER_RE.test(trimmed)) {
      // Looks like a wrapped course name — buffer it as a potential prefix
      pendingPrefix.push(trimmed);
    } else {
      // Header/footer line — discard prefix
      pendingPrefix.length = 0;
    }
  }

  return results;
}
