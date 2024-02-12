import { test } from '@japa/runner';
import { healthController } from '../../src/health/controllers/health.js';
import { createServerWith } from '../../src/server/server.js';

const createServer = () => {
  return createServerWith({
    health: healthController,
  });
};

test.group('health', async (group) => {
  const host = 'localhost';
  const port = 3000;
  const server = createServer();

  group.setup(async () => {
    await server.run(host, port);
  });

  group.teardown(async () => {
    await server.close();
  });

  test('returns ok', async ({ assert }) => {
    // Act
    const response = await fetch(`http://${host}:${port}/health`);

    // Assert
    assert.equal(response.status, 200);
    assert.equal(await response.text(), 'ok');
  });
});
