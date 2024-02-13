import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../../../server/http-status.js';
import type { GetInjectionDebit } from '../../domain/ports/primary/get-injection-debit.js';

export type RequestGetInjectionDebit = FastifyRequest<{
  Querystring: { planeId?: number; hour?: number };
}>;

export const getInjectionDebitController = (
  getInjectionDebit: GetInjectionDebit
) => {
  return async (req: RequestGetInjectionDebit, reply: FastifyReply) => {
    const planeId = req.query.planeId;
    const hour = req.query.hour;

    if (!planeId || !hour) {
      reply.status(HttpStatus.BadRequest);
      reply.send('Missing parameter');
      return;
    }

    const debit = await getInjectionDebit(planeId, hour);

    reply.send({ debit });
  };
};
