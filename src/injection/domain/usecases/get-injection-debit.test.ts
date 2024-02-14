import {test} from '@japa/runner';
import {getInjectionDebitUseCase} from './get-injection-debit.js';
import {inMemoryRulesRepository} from '../../infra/repositories/in-memory-rules.js';
import {RuleIdentifier} from "./rules/rules.js";
import {Regime} from "./update-regime.js";

const stubRules = [
  {
    id: RuleIdentifier.ONE,
    apply: async (debit: number) => {
      return debit * 0.75;
    },
  },
  {
    id: RuleIdentifier.TWO,
    apply: async (debit: number) => {
      const max = 500;
      return debit < max ? debit : max;
    },
  },
];

const stubFuelDebitAdapter = async () => {
  return {
    regime: Regime.A,
    fuelDebit: 1000,
  };
};

test.group('get-injection-debit', async () => {
  test('with success', async ({ assert }) => {
    const planeId = 1;
    const hour = 1;

    const getInjectionDebit = getInjectionDebitUseCase({
      rules: stubRules,
      rulesRepository: inMemoryRulesRepository(),
      fuelDebitAdapter: stubFuelDebitAdapter,
    });

    const debit = await getInjectionDebit(planeId, hour);

    assert.equal(debit, 500);
  });
});
