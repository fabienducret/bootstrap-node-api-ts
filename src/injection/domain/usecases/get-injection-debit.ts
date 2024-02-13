import type { Regime } from '../models/regime.js';
import type { GetInjectionDebit } from '../ports/primary/get-injection-debit.js';
import type { FuelDebitAndRegimeAdapter } from '../ports/secondary/fuel-debit-adapter.js';
import type { RulesRepository } from '../ports/secondary/rules-repository.js';
import type { Rule } from './rules/rules.js';

type Params = {
  rules: Rule[];
  rulesRepository: RulesRepository;
  fuelDebitAndRegimeAdapter: FuelDebitAndRegimeAdapter;
};

export const getInjectionDebitUseCase = ({
  rules,
  rulesRepository,
  fuelDebitAndRegimeAdapter,
}: Params): GetInjectionDebit => {
  const rulesIdsFor = async (regime: Regime) =>
    rulesRepository.rulesIdsFor(regime);

  const applyRulesToCalculateInjectionDebit = async (
    rules: Rule[],
    initialFuelDebit: number,
    planeId: number,
    hour: number
  ): Promise<number> => {
    let fuelDebit = initialFuelDebit;

    for (const rule of rules) {
      fuelDebit = await rule.apply(fuelDebit, planeId, hour);
    }

    return fuelDebit;
  };

  return async (planeId: number, hour: number): Promise<number> => {
    const { regime, fuelDebit } = await fuelDebitAndRegimeAdapter(
      planeId,
      hour
    );
    const rulesIds = await rulesIdsFor(regime);
    const rulesToApply = rules.filter((r) => rulesIds.includes(r.id()));

    return applyRulesToCalculateInjectionDebit(
      rulesToApply,
      fuelDebit,
      planeId,
      hour
    );
  };
};
