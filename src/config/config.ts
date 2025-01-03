export type Config = {
  server: {
    host: string;
    port: number;
  };
};

export const initConfig = (): Config => {
  process.loadEnvFile();

  return {
    server: initServerConfig(),
  };
};

const initServerConfig = () => {
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
