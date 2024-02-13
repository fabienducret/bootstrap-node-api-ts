import type { FuelDebitAndRegimeAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import type { Rule } from './rules.js';

export const createRuleThree = (
  fuelDebitAndRegimeAdapter: FuelDebitAndRegimeAdapter
): Rule => {
  const getFirstDebit = async (planeId: number) => {
    const { fuelDebit } = await fuelDebitAndRegimeAdapter(planeId, 1);
    return fuelDebit;
  };

  const getAverageDebit = async (
    planeId: number,
    fuelDebit: number,
    hour: number
  ) => {
    const previousDebits = [hour - 1, hour - 2].map((previousHour) =>
      fuelDebitAndRegimeAdapter(planeId, previousHour)
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
      const [firstDebit, averageDebit] = await Promise.all([
        getFirstDebit(planeId),
        getAverageDebit(planeId, fuelDebit, hour),
      ]);

      return Math.ceil((averageDebit - firstDebit / 5) * 0.45);
    },
  };
};
