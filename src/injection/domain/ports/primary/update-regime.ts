import type { Regime } from '../../models/regime.js';
import type { UpdateRegimeOperation } from '../../usecases/update-regime.js';

export interface UpdateRegime {
  (
    regime: Regime,
    rule: number,
    operation: UpdateRegimeOperation
  ): Promise<boolean>;
}
