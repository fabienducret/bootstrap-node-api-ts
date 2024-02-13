import type { GetInjectionDebit } from '../ports/primary/get-injection-debit.js';
import type { FuelDebitAdapter } from '../ports/secondary/fuel-debit-adapter.js';
import type { RulesRepository } from '../ports/secondary/rules-repository.js';
import type { Rule } from './rules/rules.js';

type Params = {
  rules: Rule[];
  rulesRepository: RulesRepository;
  fuelDebitAdapter: FuelDebitAdapter;
};

export const getInjectionDebitUseCase = ({
  rules,
  rulesRepository,
  fuelDebitAdapter,
}: Params): GetInjectionDebit => {
  const rulesFor = async (regime: string) => rulesRepository.idsFor(regime);

  const applyRulesToCalculateInjectionDebit = (
    rules: Rule[],
    intialFuelDebit: number,
    planeId: number,
    hour: number
  ): Promise<number> => {
    return rules.reduce(async (fuelDebit, rule) => {
      return rule.apply(await fuelDebit, planeId, hour);
    }, Promise.resolve(intialFuelDebit));
  };

  return async (planeId: number, hour: number): Promise<number> => {
    const { regime, fuelDebit } = await fuelDebitAdapter(planeId, hour);
    const rulesIds = await rulesFor(regime);
    const rulesToApply = rules.filter((r) => rulesIds.includes(r.id()));

    return applyRulesToCalculateInjectionDebit(
      rulesToApply,
      fuelDebit,
      planeId,
      hour
    );
  };
};
