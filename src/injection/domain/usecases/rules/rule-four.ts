import type { Rule } from './rules.js';
import {RuleIdentifier} from "./rules.js";

export const createRuleFour = (): Rule => {
  return {
    id: RuleIdentifier.FOUR,
    apply: async (fuelDebit: number) => {
      const max = 3000;

      return fuelDebit < max ? fuelDebit : max;
    },
  };
};
