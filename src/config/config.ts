import 'dotenv/config';

export type Config = {
  host: string;
  port: number;
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

  return {
    host,
    port: parseInt(port, 10),
  };
};
