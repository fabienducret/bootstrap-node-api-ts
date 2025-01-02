import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { loadRoutes } from './routes.js';

export type Controllers = {
  health: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
};

interface Server {
  run: ({ host, port }: { host: string; port: number }) => Promise<string>;
  close: () => Promise<void>;
}

export const createServerWith = (controllers: Controllers): Server => {
  const server = Fastify();
  loadRoutes(server, controllers);

  return {
    run: async ({ host, port }): Promise<string> => {
      console.log(`starting server on ${host}:${port}`);
      return server.listen({ host, port });
    },
    close: async (): Promise<void> => {
      await server.close();
    },
  };
};
