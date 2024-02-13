import type { RulesRepository } from '../../domain/ports/secondary/rules-repository.js';
import { UpdateRegimeOperation } from '../../domain/usecases/update-regime.js';

export const inMemoryRulesRepository = (): RulesRepository => {
  const regimes = new Map([
    ['A', [1, 2, 5]],
    ['B', [3, 4, 5]],
    ['C', [1, 5]],
    ['D', [5, 6]],
  ]);

  return {
    idsFor: async (regime: string): Promise<number[]> => {
      const rulesIds = regimes.get(regime);

      if (!rulesIds) {
        return [];
      }

      return rulesIds;
    },

    updateRegime: async (
      regime: string,
      rule: number,
      operation: UpdateRegimeOperation
    ): Promise<number[]> => {
      const rulesIds = regimes.get(regime);

      if (!rulesIds) {
        return [];
      }

      let updatedRules = rulesIds;

      if (operation === UpdateRegimeOperation.Add && !rulesIds.includes(rule)) {
        updatedRules.push(rule);
      }

      if (
        operation === UpdateRegimeOperation.Delete &&
        rulesIds.includes(rule)
      ) {
        updatedRules = rulesIds.filter((r) => r !== rule);
      }

      regimes.set(regime, updatedRules);

      return updatedRules;
    },
  };
};
