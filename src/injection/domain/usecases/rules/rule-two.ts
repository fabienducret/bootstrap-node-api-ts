import type { Rule } from './rules.js';

export const createRuleTwo = (): Rule => {
  return {
    id: (): number => 2,
    apply: async (fuelDebit: number): Promise<number> => {
      const max = 5000;

      return fuelDebit < max ? fuelDebit : max;
    },
  };
};
