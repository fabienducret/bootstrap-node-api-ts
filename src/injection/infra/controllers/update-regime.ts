import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateRegimeOperation } from '../../domain/usecases/update-regime.js';
import type { UpdateRegime } from '../../domain/ports/primary/update-regime.js';

export type RequestUpdateRegime = FastifyRequest<{
  Params: { regime?: string };
  Body: { rule?: number; operation?: string };
}>;

export const updateRegimeController = (updateRegime: UpdateRegime) => {
  const operationFrom = (rawOperation?: string) => {
    if (rawOperation === 'delete') {
      return UpdateRegimeOperation.Delete;
    }

    return UpdateRegimeOperation.Add;
  };

  return async (req: RequestUpdateRegime, reply: FastifyReply) => {
    const regime = req.params.regime;
    const rule = req.body.rule;
    const rawOperation = req.body.operation;

    if (!regime || !rule) {
      reply.status(400);
      reply.send('Missing paramter');
      return;
    }

    const operation = operationFrom(rawOperation);
    const success = await updateRegime(regime, rule, operation);

    reply.send({ success });
  };
};
