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
  const rulesFor = (regime: string) => rulesRepository.getRegimeRules(regime);

  // todo: maybe pass an object as params rather than positional arguments to allow more flexibility down the road
  // as a rule of thumb, when there are more than three arguments, it is getting out of control and it is better to pass
  // them in an object
  const applyRulesToCalculateInjectionDebit = async (
    rules: Rule[],
    initialFuelDebit: number,
    planeId: number,
    hour: number
  ) => {
    let fuelDebit = initialFuelDebit;

    // Easier to read than reduce for this async operations
    for (const rule of rules) {
      fuelDebit = await rule.apply(fuelDebit, planeId, hour);
    }

    return fuelDebit;
  };

  return async (planeId: number, hour: number) => {
    const { regime, fuelDebit } = await fuelDebitAdapter(planeId, hour);
    const rulesIds = await rulesFor(regime);
    const rulesToApply = rules.filter((r) => rulesIds.includes(r.id));

    return applyRulesToCalculateInjectionDebit(
      rulesToApply,
      fuelDebit,
      planeId,
      hour
    );
  };
};
