import { FastifyReply, FastifyRequest } from 'fastify';
import type { GetInjectionDebit } from '../../domain/ports/primary/get-injection-debit.js';
import {HttpStatusCode} from "axios";

export type RequestGetInjectionDebit = FastifyRequest<{
  Querystring: { planeId?: number; hour?: number };
}>;

export const getInjectionDebitController = (
  getInjectionDebit: GetInjectionDebit
) => {
  return async (req: RequestGetInjectionDebit, reply: FastifyReply) => {
    const { planeId, hour } = req.query;

    if (!planeId || !hour) {
      reply.status(HttpStatusCode.BadRequest);
      reply.send('Missing parameter');

      return;
    }

    const debit = await getInjectionDebit(planeId, hour);

    reply.send({ debit });
  };
};
