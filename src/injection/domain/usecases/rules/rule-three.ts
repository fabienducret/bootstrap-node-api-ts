import type { FuelDebitAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import type { Rule } from './rules.js';

export const createRuleThree = (fuelDebitAdapter: FuelDebitAdapter): Rule => {
  const getFirstDebit = async (planeId: number) => {
    const response = await fuelDebitAdapter(planeId, 1);
    return response.fuelDebit;
  };

  const getAverageDebit = async (
    planeId: number,
    fuelDebit: number,
    hour: number
  ) => {
    const previousDebits = [hour - 1, hour - 2].map((previousHour) =>
      fuelDebitAdapter(planeId, previousHour)
    );

    const fuelDebits = await Promise.all(previousDebits);

    const sumDebits = fuelDebits.reduce((sum, debit) => {
      return debit.fuelDebit + sum;
    }, fuelDebit);

    return sumDebits / 3;
  };

  return {
    id: (): number => 3,
    apply: async (
      fuelDebit: number,
      planeId: number,
      hour: number
    ): Promise<number> => {
      const firstDebit = await getFirstDebit(planeId);
      const averageDebit = await getAverageDebit(planeId, fuelDebit, hour);

      return Math.ceil((averageDebit - firstDebit / 5) * 0.45);
    },
  };
};
