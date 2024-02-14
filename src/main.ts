import { Config, initConfig } from './config/config.js';
import { healthController } from './health/controllers/health.js';
import { getInjectionDebitUseCase } from './injection/domain/usecases/get-injection-debit.js';
import { createRules } from './injection/domain/usecases/rules/rules.js';
import { updateRegimeUseCase } from './injection/domain/usecases/update-regime.js';
import { fuelDebitAdapter } from './injection/infra/adapters/fuel-debit-adapter.js';
import { getInjectionDebitController } from './injection/infra/controllers/get-injection-debit.js';
import { updateRegimeController } from './injection/infra/controllers/update-regime.js';
import { inMemoryRulesRepository } from './injection/infra/repositories/in-memory-rules.js';
import { defaultHttpClient } from './lib/http-client.js';
import { Controllers, createServerWith } from './server/server.js';

const main = () => {
  try {
    runServer(initConfig());
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
};

const runServer = (config: Config) => {
  const server = createServerWith(controllers(config));
  server.run(config.host, config.port);
};

const controllers = (config: Config): Controllers => {
  const adapter = fuelDebitAdapter(
    defaultHttpClient(),
    config.fuelDebitUrl
  );

  return {
    health: healthController,
    getInjectionDebit: getInjectionDebitController(
      getInjectionDebitUseCase({
        rules: createRules(adapter),
        rulesRepository: inMemoryRulesRepository(),
        fuelDebitAdapter: adapter,
      })
    ),
    updateRegime: updateRegimeController(
      updateRegimeUseCase(inMemoryRulesRepository())
    ),
  };
};

main();
