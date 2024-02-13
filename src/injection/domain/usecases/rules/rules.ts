import type { FuelDebitAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import { createRuleFive } from './rule-five.js';
import { createRuleFour } from './rule-four.js';
import { createRuleOne } from './rule-one.js';
import { createRuleThree } from './rule-three.js';
import { createRuleTwo } from './rule-two.js';

export interface Rule {
  id(): number;
  apply(debit: number, planeId: number, hour: number): Promise<number>;
}

export const createRules = (fuelDebitAdapter: FuelDebitAdapter) => [
  createRuleOne(fuelDebitAdapter),
  createRuleTwo(),
  createRuleThree(fuelDebitAdapter),
  createRuleFour(),
  createRuleFive(),
];
