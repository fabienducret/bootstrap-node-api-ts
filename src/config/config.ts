export type Config = {
  host: string;
  port: number;
};

export const initConfig = (): Config => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process.loadEnvFile(); // must be handle by future version of TS

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
