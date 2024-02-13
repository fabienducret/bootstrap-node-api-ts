import type { HttpClient } from '../../../lib/http-client.js';
import type { Regime } from '../../domain/models/regime.js';
import type { FuelDebitAndRegimeAdapter } from '../../domain/ports/secondary/fuel-debit-adapter.js';

type Response = {
  regime: Regime;
  fuelDebit: number;
};

export const fuelDebitAndRegimeAdapter =
  (httpClient: HttpClient, url: string): FuelDebitAndRegimeAdapter =>
  async (planeId: number, hour: number): Promise<Response> => {
    const query = new URL(url);
    query.searchParams.append('planeId', planeId.toString());
    query.searchParams.append('hour', hour.toString());

    return httpClient.get<Response>(query.toString());
  };
