import type { Regime } from '../../domain/models/regime.js';
import type { RulesRepository } from '../../domain/ports/secondary/rules-repository.js';
import { UpdateRegimeOperation } from '../../domain/usecases/update-regime.js';

export const inMemoryRulesRepository = (): RulesRepository => {
  const regimes = new Map<Regime, number[]>([
    ['A', [1, 2, 5]],
    ['B', [3, 4, 5]],
    ['C', [1, 5]],
    ['D', [5, 6]],
  ]);

  return {
    rulesIdsFor: async (regime: Regime): Promise<number[]> => {
      const rulesIds = regimes.get(regime);

      if (!rulesIds) {
        return [];
      }

      return rulesIds;
    },

    updateRegime: async (
      regime: Regime,
      rule: number,
      operation: UpdateRegimeOperation
    ): Promise<number[]> => {
      const rulesIds = regimes.get(regime);

      if (!rulesIds) {
        return [];
      }

      let updatedRules = rulesIds;
      const ruleAlreadyExists = rulesIds.includes(rule);
      const isAddOperation = operation === UpdateRegimeOperation.Add;
      const isDeletionOperation = operation === UpdateRegimeOperation.Delete;

      if (isAddOperation && !ruleAlreadyExists) {
        updatedRules.push(rule);
      }

      if (isDeletionOperation && ruleAlreadyExists) {
        updatedRules = rulesIds.filter((r) => r !== rule);
      }

      regimes.set(regime, updatedRules);

      return updatedRules;
    },
  };
};
