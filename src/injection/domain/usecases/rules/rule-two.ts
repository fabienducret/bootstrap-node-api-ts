import type { Rule } from './rules.js';
import {RuleIdentifier} from "./rules.js";

export const createRuleTwo = (): Rule => {
  return {
    id: RuleIdentifier.TWO,
    apply: async (fuelDebit: number): Promise<number> => {
      const max = 5000;

      return fuelDebit < max ? fuelDebit : max;
    },
  };
};
