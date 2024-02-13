import { Config, initConfig } from './config/config.js';
import { healthController } from './health/controllers/health.js';
import { getInjectionDebitUseCase } from './injection/domain/usecases/get-injection-debit.js';
import { createRules } from './injection/domain/usecases/rules/rules.js';
import { updateRegimeUseCase } from './injection/domain/usecases/update-regime.js';
import { fuelDebitAdapterWith } from './injection/infra/adapters/fuel-debit.js';
import { getInjectionDebitController } from './injection/infra/controllers/get-injection-debit.js';
import { updateRegimeController } from './injection/infra/controllers/update-regime.js';
import { inMemoryRulesRepository } from './injection/infra/repositories/in-memory-rules.js';
import { defaultHttpClient } from './lib/http-client.js';
import { Controllers, createServerWith } from './server/server.js';

const main = () => {
  try {
    const config = initConfig();
    runServer(config);
  } catch (e: unknown) {
    console.error(e);
    process.exit(1);
  }
};

const runServer = (c: Config) => {
  const server = createServerWith(controllers(c));
  server.run(c.host, c.port);
};

const controllers = (c: Config): Controllers => {
  const fuelDebitAdapter = fuelDebitAdapterWith(
    defaultHttpClient(),
    c.fuelDebitUrl
  );

  return {
    health: healthController,
    getInjectionDebit: getInjectionDebitController(
      getInjectionDebitUseCase({
        rules: createRules(fuelDebitAdapter),
        rulesRepository: inMemoryRulesRepository(),
        fuelDebitAdapter,
      })
    ),
    updateRegime: updateRegimeController(
      updateRegimeUseCase(inMemoryRulesRepository())
    ),
  };
};

main();
