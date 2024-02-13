import type { Rule } from './rules.js';

export const createRuleFive = (): Rule => {
  return {
    id: (): number => 5,
    apply: async (fuelDebit: number): Promise<number> => {
      const min = 0;

      return fuelDebit > min ? fuelDebit : min;
    },
  };
};
