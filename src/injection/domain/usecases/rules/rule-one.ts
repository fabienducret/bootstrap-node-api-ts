import type { FuelDebitAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import type { Rule } from './rules.js';

export const createRuleOne = (fuelDebitAdapter: FuelDebitAdapter): Rule => {
  const getPreviousDebit = async (planeId: number, hour: number) => {
    if (hour <= 1) {
      return 0;
    }

    const response = await fuelDebitAdapter(planeId, hour - 1);
    return response.fuelDebit;
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
