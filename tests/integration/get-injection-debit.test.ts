import { test } from '@japa/runner';
import { createServerWith } from '../../src/server/server.js';
import { getInjectionDebitUseCase } from '../../src/injection/domain/usecases/get-injection-debit.js';
import { createRules } from '../../src/injection/domain/usecases/rules/rules.js';
import { inMemoryRulesRepository } from '../../src/injection/infra/repositories/in-memory-rules.js';
import { getInjectionDebitController } from '../../src/injection/infra/controllers/get-injection-debit.js';

const stubFuelDebitAdapter = async (
  planeId: number,
  hour: number
): Promise<{ regime: string; fuelDebit: number }> => {
  if (hour === 2) {
    return {
      regime: 'A',
      fuelDebit: 1000,
    };
  }

  return {
    regime: 'A',
    fuelDebit: 500,
  };
};

const createServer = () => {
  return createServerWith({
    health: async () => {},
    updateRegime: async () => {},
    getInjectionDebit: getInjectionDebitController(
      getInjectionDebitUseCase({
        rules: createRules(stubFuelDebitAdapter),
        rulesRepository: inMemoryRulesRepository(),
        fuelDebitAdapter: stubFuelDebitAdapter,
      })
    ),
  });
};

test.group('get-injection-debit', async (group) => {
  const host = 'localhost';
  const port = 3000;
  const server = createServer();

  group.setup(async () => {
    await server.run(host, port);
  });

  group.teardown(async () => {
    await server.close();
  });

  test('returns debit with success', async ({ assert }) => {
    // Act
    const response = await fetch(
      `http://${host}:${port}/injection-debit?planeId=1&hour=1`
    );

    // Assert
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      debit: 375,
    });
  });
});
