import { test } from '@japa/runner';
import { createRuleOne } from './rule-one.js';
import type { Regime } from '../../models/regime.js';

const stubFuelDebitAdapter = async (): Promise<{
  regime: Regime;
  fuelDebit: number;
}> => {
  return {
    regime: 'A' as const,
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
