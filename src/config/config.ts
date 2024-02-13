import 'dotenv/config';

export type Config = {
  host: string;
  port: number;
  fuelDebitUrl: string;
};

export const initConfig = (): Config => {
  const host = process.env.SERVER_HOST;

  if (!host) {
    throw new Error('missing var SERVER_HOST');
  }

  const port = process.env.SERVER_PORT;

  if (!port) {
    throw new Error('missing var SERVER_PORT');
  }

  const fuelDebitUrl = process.env.FUEL_DEBIT_URL;

  if (!fuelDebitUrl) {
    throw new Error('missing var FUEL_DEBIT_URL');
  }

  return {
    host,
    port: parseInt(port, 10),
    fuelDebitUrl,
  };
};
