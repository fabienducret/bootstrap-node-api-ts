import type { Rule } from './rules.js';

export const createRuleFour = (): Rule => {
  return {
    id: (): number => 4,
    apply: async (fuelDebit: number): Promise<number> => {
      const max = 3000;

      return fuelDebit < max ? fuelDebit : max;
    },
  };
};
