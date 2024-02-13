export interface GetInjectionDebit {
  (planeId: number, hour: number): Promise<number>;
}
