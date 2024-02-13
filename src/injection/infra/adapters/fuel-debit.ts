import type { HttpClient } from '../../../lib/http-client.js';
import type { FuelDebitAdapter } from '../../domain/ports/secondary/fuel-debit-adapter.js';

type Response = {
  regime: string;
  fuelDebit: number;
};

export const fuelDebitAdapterWith = (
  httpClient: HttpClient,
  url: string
): FuelDebitAdapter => {
  return async (planeId: number, hour: number): Promise<Response> => {
    const query = new URL(url);
    query.searchParams.append('planeId', planeId.toString());
    query.searchParams.append('hour', hour.toString());

    return httpClient.get<Response>(query.toString());
  };
};
