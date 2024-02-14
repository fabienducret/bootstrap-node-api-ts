import type { UpdateRegimeOperation } from '../../usecases/update-regime.js';

export interface RulesRepository {
  getRegimeRules(regime: string): Promise<number[]>;
  updateRegime(
    regime: string,
    rule: number,
    operation: UpdateRegimeOperation
  ): Promise<number[]>;
}
