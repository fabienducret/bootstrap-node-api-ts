import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateRegimeOperation } from '../../domain/usecases/update-regime.js';
import { HttpStatus } from '../../../server/http-status.js';
import type { UpdateRegime } from '../../domain/ports/primary/update-regime.js';
import type { Regime } from '../../domain/models/regime.js';

export type RequestUpdateRegime = FastifyRequest<{
  Params: { regime?: Regime };
  Body: { rule?: number; operation?: UpdateRegimeOperation };
}>;

export const updateRegimeController = (updateRegime: UpdateRegime) => {
  return async (req: RequestUpdateRegime, reply: FastifyReply) => {
    const regime = req.params.regime;
    const rule = req.body.rule;
    const operation = req.body.operation || UpdateRegimeOperation.Add;

    if (!regime || !rule) {
      reply.status(HttpStatus.BadRequest);
      reply.send('Missing parameter');
      return;
    }

    const success = await updateRegime(regime, rule, operation);

    reply.send({ success });
  };
};
