import { Config, initConfig } from './config/config.js';
import { healthController } from './health/controllers/health.js';
import { Controllers, createServerWith } from './server/server.js';

const controllers = (): Controllers => {
  return {
    health: healthController,
  };
};

const handleError = (e: Error) => {
  console.error(e);
  process.exit(1);
};

const runServer = (c: Config) => {
  const server = createServerWith(controllers());
  server.run(c.host, c.port);
};

const main = () => {
  try {
    const config = initConfig();
    runServer(config);
  } catch (e: unknown) {
    handleError(e as Error);
  }
};

main();
