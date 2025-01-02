import { Config, initConfig } from './config/config.js';
import { healthController } from './health/controllers/health.js';
import { Controllers, createServerWith } from './server/server.js';

const main = async () => {
  try {
    const config = initConfig();
    await runServer(config);
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
};

const runServer = async (config: Config): Promise<void> => {
  const server = createServerWith(controllers());
  await server.run(config.server);
};

const controllers = (): Controllers => {
  return {
    health: healthController,
  };
};

main();
