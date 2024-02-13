import type { Regime } from '../models/regime.js';
import type { UpdateRegime } from '../ports/primary/update-regime.js';
import type { RulesRepository } from '../ports/secondary/rules-repository.js';

export enum UpdateRegimeOperation {
  Add = 'add',
  Delete = 'delete',
}

const isAdded = (rulesIds: number[], rule: number) => rulesIds.includes(rule);

const isDeleted = (rulesIds: number[], rule: number) =>
  !rulesIds.find((r) => r === rule);

export const updateRegimeUseCase = (
  rulesRepository: RulesRepository
): UpdateRegime => {
  return async (
    regime: Regime,
    rule: number,
    operation: UpdateRegimeOperation
  ) => {
    const rulesIds = await rulesRepository.updateRegime(
      regime,
      rule,
      operation
    );

    if (operation === UpdateRegimeOperation.Add) {
      return isAdded(rulesIds, rule);
    }

    if (operation === UpdateRegimeOperation.Delete) {
      return isDeleted(rulesIds, rule);
    }

    return false;
  };
};
