import type { Rule } from './rules.js';
import {RuleIdentifier} from "./rules.js";

export const createRuleFive = (): Rule => {
  return {
    id: RuleIdentifier.FIVE,
    apply: async (fuelDebit: number)=> {
      const min = 0;

      return fuelDebit > min ? fuelDebit : min;
    },
  };
};
