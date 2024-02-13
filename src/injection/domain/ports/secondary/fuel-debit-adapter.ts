export interface FuelDebitAdapter {
  (
    planeId: number,
    hour: number
  ): Promise<{ regime: string; fuelDebit: number }>;
}
