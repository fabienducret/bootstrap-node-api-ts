import type { UpdateRegimeOperation } from '../../usecases/update-regime.js';

export interface UpdateRegime {
  (
    regime: string,
    rule: number,
    operation: UpdateRegimeOperation
  ): Promise<boolean>;
}
