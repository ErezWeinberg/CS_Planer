import type { TrackDefinition, TrackId } from '../../types';
import { eeTrack } from './ee';
import { csTrack } from './cs';
import { eeMathTrack } from './ee_math';
import { eePhysicsTrack } from './ee_physics';
import { eeCombinedTrack } from './ee_combined';
import { ceTrack } from './ce';
import { cs3YearTrack } from './cs_3_year';
import { cs4YearTrack } from './cs_4_year';
import { seTrack } from './se';
import { mathCsTrack } from './math_cs';
import { csMathTrack } from './cs_math';

const TRACK_MAP: Record<TrackId, TrackDefinition> = {
  ee: eeTrack,
  cs: csTrack,
  ee_math: eeMathTrack,
  ee_physics: eePhysicsTrack,
  ee_combined: eeCombinedTrack,
  ce: ceTrack,
  cs_3_year: cs3YearTrack,
  cs_4_year: cs4YearTrack,
  se: seTrack,
  math_cs: mathCsTrack,
  cs_math: csMathTrack,
};

export function getTrackDefinition(trackId: TrackId | null | undefined): TrackDefinition | undefined {
  if (!trackId) return undefined;
  return TRACK_MAP[trackId];
}
