/**
 * Tests for the plan initialization guard and Optigrade transcript utilities.
 *
 * The auto-init effect gates on `initializedTracks.includes(key)`.
 * These tests verify the logic directly without needing a React/Zustand environment.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadTranspiledModule(relativePath) {
  const absolutePath = join(repoRoot, ...relativePath.split('/'));
  const source = readFileSync(absolutePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`);
}

// Load transcriptImport after patching its relative import
async function loadTranscriptImport(courseNormalizeUrl) {
  const absolutePath = join(repoRoot, 'src', 'utils', 'transcriptImport.ts');
  const source = readFileSync(absolutePath, 'utf8')
    .replace("'./courseNumberNormalize'", `'${courseNormalizeUrl}'`)
    .replace('"./courseNumberNormalize"', `"${courseNormalizeUrl}"`);
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`);
}

const normalizeModule = await loadTranspiledModule('src/utils/courseNumberNormalize.ts');
const normalizeModuleUrl = `data:text/javascript;base64,${Buffer.from(
  ts.transpileModule(readFileSync(join(repoRoot, 'src', 'utils', 'courseNumberNormalize.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText,
).toString('base64')}`;
const transcriptModule = await loadTranscriptImport(normalizeModuleUrl);

const { toSapEightDigitCourseIdForStorage, normalizeCourseIdKey, expandCourseIdVariants } = normalizeModule;
const { gradesRecordFromTranscriptPayload, gradesWithSemesterFromTranscriptPayload } = transcriptModule;

// ── courseNumberNormalize ────────────────────────────────────────────────────

test('toSapEightDigitCourseIdForStorage: converts 6-digit to 8-digit SAP format', () => {
  // Pattern: 0 + first3 + 0 + last3
  assert.equal(toSapEightDigitCourseIdForStorage('234114'), '02340114'); // CS/EE course
  assert.equal(toSapEightDigitCourseIdForStorage('104036'), '01040036'); // Math course
  assert.equal(toSapEightDigitCourseIdForStorage('044159'), '00440159'); // EE lab course (faculty 044)
});

test('toSapEightDigitCourseIdForStorage: leaves 8-digit SAP values unchanged', () => {
  assert.equal(toSapEightDigitCourseIdForStorage('02340114'), '02340114');
  assert.equal(toSapEightDigitCourseIdForStorage('01040036'), '01040036');
});

test('toSapEightDigitCourseIdForStorage: converts 7-digit to 8-digit', () => {
  assert.equal(toSapEightDigitCourseIdForStorage('3940800'), '03940800');
});

test('normalizeCourseIdKey: converts 8-digit SAP back to 6-digit legacy', () => {
  assert.equal(normalizeCourseIdKey('02340114'), '234114');
  assert.equal(normalizeCourseIdKey('01040036'), '104036');
});

test('normalizeCourseIdKey: leaves non-SAP strings unchanged', () => {
  assert.equal(normalizeCourseIdKey('234114'), '234114');
});

test('expandCourseIdVariants: returns all three variants deduped', () => {
  const variants = expandCourseIdVariants('234114');
  assert.ok(variants.includes('234114'));
  assert.ok(variants.includes('02340114'));
  // deduped — no duplicates
  assert.equal(variants.length, new Set(variants).size);
});

// ── transcriptImport ─────────────────────────────────────────────────────────

test('gradesRecordFromTranscriptPayload: extracts numeric grades', () => {
  const courses = [
    { course_id: '234114', grade: '95', is_numeric_grade: true, is_pass: false },
    { course_id: '104036', grade: '82', is_numeric_grade: true, is_pass: false },
  ];
  const result = gradesRecordFromTranscriptPayload(courses);
  assert.equal(result['02340114'], '95');
  assert.equal(result['01040036'], '82');
});

test('gradesRecordFromTranscriptPayload: handles pass/fail courses', () => {
  // 6-digit '394900' → 8-digit '03940900' (PE sport course)
  const courses = [{ course_id: '394900', grade: '', is_pass: true, is_numeric_grade: false }];
  const result = gradesRecordFromTranscriptPayload(courses);
  assert.equal(result['03940900'], '-1');
});

test('gradesRecordFromTranscriptPayload: skips invalid rows', () => {
  const courses = [
    null,
    { course_id: '', grade: '90', is_numeric_grade: true },
    { course_id: 234114, grade: '90' }, // non-string id
  ];
  const result = gradesRecordFromTranscriptPayload(courses);
  assert.equal(Object.keys(result).length, 0);
});

test('gradesWithSemesterFromTranscriptPayload: includes semester string', () => {
  const courses = [
    { course_id: '234114', grade: '88', is_numeric_grade: true, is_pass: false, semester: '2022-2023 Winter' },
  ];
  const result = gradesWithSemesterFromTranscriptPayload(courses);
  assert.equal(result['02340114'].grade, '88');
  assert.equal(result['02340114'].semester, '2022-2023 Winter');
});

// ── Initialization guard logic ───────────────────────────────────────────────
// The effect in App.tsx does:
//   const key = catalogYear ? `${trackId}:${catalogYear}` : trackId;
//   if (!initializedTracks?.includes(key)) return;
// These tests verify the logic directly.

function shouldAutoInit(initializedTracks, trackId, catalogYear) {
  const key = catalogYear ? `${trackId}:${catalogYear}` : trackId;
  return !!(initializedTracks?.includes(key));
}

test('auto-init guard: returns false for first-time user (empty initializedTracks)', () => {
  assert.equal(shouldAutoInit([], 'ee', 2025), false);
  assert.equal(shouldAutoInit([], 'cs', null), false);
});

test('auto-init guard: returns true after markTrackInitialized adds key', () => {
  // Simulate markTrackInitialized: adds "ee:2025"
  const initializedTracks = ['ee:2025'];
  assert.equal(shouldAutoInit(initializedTracks, 'ee', 2025), true);
});

test('auto-init guard: returns false after resetToDefault removes key', () => {
  // Simulate resetToDefault: filters out keys starting with "ee:"
  const before = ['ee:2025', 'cs'];
  const after = before.filter((id) => id !== 'ee' && !id.startsWith('ee:'));
  assert.equal(shouldAutoInit(after, 'ee', 2025), false);
  // cs key is unaffected
  assert.equal(shouldAutoInit(after, 'cs', null), true);
});

test('auto-init guard: existing user with populated initializedTracks is backward compatible', () => {
  // User from before this feature: initializedTracks already has key
  const initializedTracks = ['cs:2025', 'ee', 'ee_combined:2021'];
  assert.equal(shouldAutoInit(initializedTracks, 'cs', 2025), true);
  assert.equal(shouldAutoInit(initializedTracks, 'ee', null), true);
  assert.equal(shouldAutoInit(initializedTracks, 'ee_combined', 2021), true);
  // Different year not in the list
  assert.equal(shouldAutoInit(initializedTracks, 'cs', 2021), false);
});

// ── transcriptParser ─────────────────────────────────────────────────────────

// Load transcriptParser after patching its import of transcriptImport
async function loadTranscriptParser(transcriptImportUrl) {
  const absolutePath = join(repoRoot, 'src', 'utils', 'transcriptParser.ts');
  const source = readFileSync(absolutePath, 'utf8')
    .replace("'./transcriptImport'", `'${transcriptImportUrl}'`)
    .replace('"./transcriptImport"', `"${transcriptImportUrl}"`);
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(transpiled).toString('base64')}`);
}

const transcriptImportUrl = `data:text/javascript;base64,${Buffer.from(
  ts.transpileModule(
    readFileSync(join(repoRoot, 'src', 'utils', 'transcriptImport.ts'), 'utf8')
      .replace("'./courseNumberNormalize'", `'${normalizeModuleUrl}'`)
      .replace('"./courseNumberNormalize"', `"${normalizeModuleUrl}"`),
    { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } },
  ).outputText,
).toString('base64')}`;

const { parseTranscriptLines } = await loadTranscriptParser(transcriptImportUrl);

test('parseTranscriptLines: numeric grade with name', () => {
  const lines = ['00440102 Introduction to EE 3.0 95 2022-2023 Winter'];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 1);
  assert.equal(result[0].course_id, '00440102');
  assert.equal(result[0].grade, '95');
  assert.equal(result[0].is_numeric_grade, true);
  assert.equal(result[0].is_pass, false);
  assert.equal(result[0].semester, '2022-2023 Winter');
});

test('parseTranscriptLines: numeric grade without name', () => {
  const lines = ['01040036 5.0 82 2022-2023 Spring'];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 1);
  assert.equal(result[0].course_id, '01040036');
  assert.equal(result[0].grade, '82');
  assert.equal(result[0].is_numeric_grade, true);
  assert.equal(result[0].name, '');
});

test('parseTranscriptLines: Pass grade without credits', () => {
  const lines = ['03940900 Pass 2022-2023 Winter'];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 1);
  assert.equal(result[0].course_id, '03940900');
  assert.equal(result[0].is_pass, true);
  assert.equal(result[0].grade, 'Pass');
  assert.equal(result[0].semester, '2022-2023 Winter');
});

test('parseTranscriptLines: Exemption with points', () => {
  const lines = ['00460195 Algorithms 3.0 Exemption with points 2021-2022 Winter'];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 1);
  assert.equal(result[0].course_id, '00460195');
  assert.equal(result[0].is_pass, true);
  assert.equal(result[0].grade, 'Exemption with points');
});

test('parseTranscriptLines: multi-line course name (pending prefix)', () => {
  const lines = [
    'Introduction to',         // prefix line (no course ID)
    '00440102 EE 3.0 90 2022-2023 Winter',
  ];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 1);
  assert.equal(result[0].course_id, '00440102');
  assert.ok(result[0].name.includes('Introduction to'));
});

test('parseTranscriptLines: skips non-course lines', () => {
  const lines = [
    'Transcript of John Doe  ID: 123456789',
    'for the degree Bachelor of Science',
    'in the faculty of Electrical Engineering',
    'accumulated 120.5 credit points out of 157.5 credit points with a GPA of 85.3',
    '',
    'Page 1 of 2',
  ];
  const result = parseTranscriptLines(lines);
  assert.equal(result.length, 0);
});
