import type { FuelDebitAndRegimeAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import type { Rule } from './rules.js';

export const createRuleOne = (
  fuelDebitAndRegimeAdapter: FuelDebitAndRegimeAdapter
): Rule => {
  const getPreviousDebit = async (planeId: number, hour: number) => {
    if (hour <= 1) {
      return 0;
    }

    const { fuelDebit } = await fuelDebitAndRegimeAdapter(planeId, hour - 1);
    return fuelDebit;
  };

  return {
    id: (): number => 1,
    apply: async (
      fuelDebit: number,
      planeId: number,
      hour: number
    ): Promise<number> => {
      const previousDebit = await getPreviousDebit(planeId, hour);

      return Math.ceil((fuelDebit - previousDebit) * 0.75);
    },
  };
};
