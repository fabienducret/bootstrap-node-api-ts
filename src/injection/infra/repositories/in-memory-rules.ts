import type { RulesRepository } from '../../domain/ports/secondary/rules-repository.js';
import {Regime, UpdateRegimeOperation} from '../../domain/usecases/update-regime.js';

export const inMemoryRulesRepository = (): RulesRepository => {
  const regimes = new Map<Regime, number[]>([
    [Regime.A, [1, 2, 5]],
    [Regime.B, [3, 4, 5]],
    [Regime.C, [1, 5]],
    [Regime.D, [5, 6]],
  ]);

  return {
    getRegimeRules: async (regime: Regime) => {
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
    ) => {
      const rulesIds = regimes.get(regime);

      if (!rulesIds) {
        return [];
      }

      let updatedRules = rulesIds;
      const ruleAlreadyExists = rulesIds.includes(rule);
      const isAddOperation = operation === UpdateRegimeOperation.Add;
      const isDeletionOperation = operation === UpdateRegimeOperation.Delete;

      if (isAddOperation&& !ruleAlreadyExists) {
        updatedRules.push(rule);
      }

      if (
        isDeletionOperation &&
        ruleAlreadyExists
      ) {
        updatedRules = rulesIds.filter((r) => r !== rule);
      }

      regimes.set(regime, updatedRules);

      return updatedRules;
    },
  };
};
