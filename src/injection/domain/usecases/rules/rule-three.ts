import type { FuelDebitAdapter } from '../../ports/secondary/fuel-debit-adapter.js';
import type { Rule } from './rules.js';
import {RuleIdentifier} from "./rules.js";

export const createRuleThree = (fuelDebitAdapter: FuelDebitAdapter): Rule => {
  const getFirstDebit = async (planeId: number) => {
    const { fuelDebit } = await fuelDebitAdapter(planeId, 1);
    return fuelDebit;
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

    const sumDebits = fuelDebits.reduce((sum, { fuelDebit }) => {
      return fuelDebit + sum;
    }, fuelDebit);

    return sumDebits / 3;
  };

  return {
    id: RuleIdentifier.THREE,
    apply: async (
      fuelDebit: number,
      planeId: number,
      hour: number
    ) => {
      const [firstDebit, averageDebit] = await  Promise.all([
        getFirstDebit(planeId),
        getAverageDebit(planeId, fuelDebit, hour)
      ]);

      return Math.ceil((averageDebit - firstDebit / 5) * 0.45);
    },
  };
};
