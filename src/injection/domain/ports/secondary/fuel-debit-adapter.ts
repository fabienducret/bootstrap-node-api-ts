import type { Regime } from '../../models/regime.js';

export interface FuelDebitAndRegimeAdapter {
  (
    planeId: number,
    hour: number
  ): Promise<{ regime: Regime; fuelDebit: number }>;
}
