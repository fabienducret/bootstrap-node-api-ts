import type { Regime } from '../../models/regime.js';
import type { UpdateRegimeOperation } from '../../usecases/update-regime.js';

export interface RulesRepository {
  rulesIdsFor(regime: Regime): Promise<number[]>;
  updateRegime(
    regime: Regime,
    rule: number,
    operation: UpdateRegimeOperation
  ): Promise<number[]>;
}
