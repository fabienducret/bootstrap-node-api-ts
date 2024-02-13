import { test } from '@japa/runner';
import { createServerWith } from '../../src/server/server.js';
import { updateRegimeController } from '../../src/injection/infra/controllers/update-regime.js';
import { updateRegimeUseCase } from '../../src/injection/domain/usecases/update-regime.js';
import { inMemoryRulesRepository } from '../../src/injection/infra/repositories/in-memory-rules.js';
import { HttpStatus } from '../../src/server/http-status.js';

const createServer = () => {
  return createServerWith({
    health: async () => {},
    updateRegime: updateRegimeController(
      updateRegimeUseCase(inMemoryRulesRepository())
    ),
    getInjectionDebit: async () => {},
  });
};

test.group('update-regime', async (group) => {
  const host = 'localhost';
  const port = 3000;
  const server = createServer();

  group.setup(async () => {
    await server.run(host, port);
  });

  group.teardown(async () => {
    await server.close();
  });

  test('returns success', async ({ assert }) => {
    // Act
    const response = await fetch(`http://${host}:${port}/regime/A`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'true',
      },
      body: JSON.stringify({
        rule: 10,
      }),
    });

    // Assert
    assert.equal(response.status, HttpStatus.OK);
    assert.deepEqual(await response.json(), {
      success: true,
    });
  });
});
