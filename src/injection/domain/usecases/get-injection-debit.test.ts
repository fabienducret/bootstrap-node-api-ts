import { test } from '@japa/runner';
import { getInjectionDebitUseCase } from './get-injection-debit.js';
import { inMemoryRulesRepository } from '../../infra/repositories/in-memory-rules.js';

const stubRules = [
  {
    id: (): number => 1,
    apply: async (debit: number) => {
      return debit * 0.75;
    },
  },
  {
    id: (): number => 2,
    apply: async (debit: number) => {
      const max = 500;
      return debit < max ? debit : max;
    },
  },
];

const stubFuelDebitAndRegimeAdapter = async () => {
  return {
    regime: 'A' as const,
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
      fuelDebitAndRegimeAdapter: stubFuelDebitAndRegimeAdapter,
    });

    const debit = await getInjectionDebit(planeId, hour);

    assert.equal(debit, 500);
  });
});
