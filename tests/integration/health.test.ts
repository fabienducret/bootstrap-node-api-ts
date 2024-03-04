import { expect, test, describe, beforeAll, afterAll } from 'vitest';
import { healthController } from '../../src/health/controllers/health.js';
import { createServerWith } from '../../src/server/server.js';

const createServer = () => {
  return createServerWith({
    health: healthController,
  });
};

describe('health', async () => {
  const host = 'localhost';
  const port = 3000;
  const server = createServer();

  beforeAll(async () => {
    await server.run(host, port);
  });

  afterAll(async () => {
    await server.close();
  });

  test('returns ok', async () => {
    // Act
    const response = await fetch(`http://${host}:${port}/health`);

    // Assert
    expect(response.status).equal(200);
    expect(await response.text()).equal('ok');
  });
});
