import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gradesWithSemesterFromTranscriptPayload, transcriptSemesterToSlot } from '../utils/transcriptImport';
import { extractLinesFromPdf } from '../utils/pdfTextExtractor';
import { parseTranscriptLines } from '../utils/transcriptParser';

interface Props {
  catalogYear: number | null;
  trackId: string;
  onClose: () => void;
  addCourseToSemester: (courseId: string, semester: number) => void;
  setGrade: (courseId: string, grade: number | null, semester?: number) => void;
  toggleCompleted: (courseId: string) => void;
  markTrackInitialized: (key: string) => void;
  addSemester: () => void;
  maxSemester: number;
}

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; placed: number; graded: number }
  | { status: 'error'; message: string };

export function GradeSheetModal({
  catalogYear, trackId, onClose,
  addCourseToSemester, setGrade, toggleCompleted, markTrackInitialized,
  addSemester, maxSemester,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });

  function handleFile(f: File) {
    if (f.type !== 'application/pdf') {
      setSubmitState({ status: 'error', message: 'יש להעלות קובץ PDF בלבד' });
      return;
    }
    setFile(f);
    setSubmitState({ status: 'idle' });
  }

  async function handleSubmit() {
    if (!file) return;
    setSubmitState({ status: 'loading' });

    try {
      // Parse PDF client-side — no backend or auth required
      const buffer = await file.arrayBuffer();
      const lines = await extractLinesFromPdf(buffer);
      const rows = parseTranscriptLines(lines);
      const gradesWithSemester = gradesWithSemesterFromTranscriptPayload(rows);

      if (Object.keys(gradesWithSemester).length === 0) {
        throw new Error('לא נמצאו קורסים בקובץ. ודא שהעלית גיליון ציונים בפורמט האנגלי של הטכניון');
      }

      // Map transcript semester labels → sequential slot numbers (1 = earliest semester)
      const semLabels = Object.values(gradesWithSemester).map(({ semester }) => semester);
      const slotMap = transcriptSemesterToSlot(semLabels);

      // Expand semester columns if the transcript spans more than the current plan
      const neededSemesters = slotMap.size > 0 ? Math.max(...slotMap.values()) : 0;
      for (let i = maxSemester; i < neededSemesters; i++) {
        addSemester();
      }

      let placed = 0;
      let graded = 0;

      for (const [courseId, { grade, semester }] of Object.entries(gradesWithSemester)) {
        const slot = (semester !== null ? slotMap.get(semester) : undefined) ?? 0;
        addCourseToSemester(courseId, slot);
        toggleCompleted(courseId);
        placed++;

        if (grade !== '-1' && grade !== null) {
          setGrade(courseId, Number(grade));
          graded++;
        }
      }

      // Ensure the auto-init guard treats this as an initialized plan
      const key = catalogYear ? `${trackId}:${catalogYear}` : trackId;
      markTrackInitialized(key);

      setSubmitState({ status: 'success', placed, graded });
    } catch (err) {
      setSubmitState({
        status: 'error',
        message: err instanceof Error ? err.message : 'שגיאה לא ידועה',
      });
    }
  }

  const content = (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">סריקת גיליון ציונים</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >×</button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-600">
            העלה את גיליון הציונים שלך מהטכניון (PDF אנגלי). הקורסים יוסדרו אוטומטית לפי תכנית הלימודים.
          </p>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
              dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
            <div className="text-4xl mb-2">📄</div>
            {file ? (
              <p className="text-sm font-medium text-blue-700">{file.name}</p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">גרור PDF לכאן או לחץ לבחירה</p>
                <p className="text-xs text-gray-400 mt-1">קבצי PDF בלבד</p>
              </>
            )}
          </div>

          {/* Status messages */}
          {submitState.status === 'error' && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              ❌ {submitState.message}
            </div>
          )}
          {submitState.status === 'success' && (
            <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
              ✅ הוספו {submitState.placed} קורסים, {submitState.graded} עם ציונים
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {submitState.status === 'success' ? 'סגור' : 'ביטול'}
          </button>
          {submitState.status !== 'success' && (
            <button
              onClick={handleSubmit}
              disabled={!file || submitState.status === 'loading'}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitState.status === 'loading' ? '⏳ מעבד...' : 'סרוק ויבא'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
