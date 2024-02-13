import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { loadRoutes } from './routes.js';
import type { RequestGetInjectionDebit } from '../injection/infra/controllers/get-injection-debit.js';
import type { RequestUpdateRegime } from '../injection/infra/controllers/update-regime.js';

export type Controllers = {
  health: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  getInjectionDebit: (
    req: RequestGetInjectionDebit,
    reply: FastifyReply
  ) => Promise<void>;
  updateRegime: (
    req: RequestUpdateRegime,
    reply: FastifyReply
  ) => Promise<void>;
};

interface Server {
  run: (host: string, port: number) => Promise<string>;
  close: () => Promise<void>;
}

export const createServerWith = (controllers: Controllers): Server => {
  const server = Fastify();
  loadRoutes(server, controllers);

  return {
    run: async (host: string, port: number): Promise<string> => {
      console.log(`starting server on ${host}:${port}`);
      return server.listen({ host: host, port: port });
    },
    close: async (): Promise<void> => {
      await server.close();
    },
  };
};
