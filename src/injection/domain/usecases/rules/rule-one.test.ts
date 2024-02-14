import { test } from '@japa/runner';
import { createRuleOne } from './rule-one.js';
import {Regime} from "../update-regime.js";

const stubFuelDebitAdapter = async (): Promise<{
  regime: string;
  fuelDebit: number;
}> => {
  return {
    regime: Regime.A,
    fuelDebit: 500,
  };
};

test.group('rule-one', async () => {
  const ruleOne = createRuleOne(stubFuelDebitAdapter);

  test('with success', async ({ assert }) => {
    const fuelDebit = 1000;
    const planeId = 1;
    const hour = 2;
    const toto = await ruleOne.apply(fuelDebit, planeId, hour);

    assert.equal(toto, 375);
  });
});
