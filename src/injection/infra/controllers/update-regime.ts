import {FastifyReply, FastifyRequest} from 'fastify';
import {UpdateRegimeOperation} from '../../domain/usecases/update-regime.js';
import type {UpdateRegime} from '../../domain/ports/primary/update-regime.js';
import {HttpStatusCode} from "axios";


export type RequestUpdateRegime = FastifyRequest<{
  Params: { regime?: string };
  // todo: Enforce validation, operation should always exist, same for rule
  Body: { rule: number; operation?: UpdateRegimeOperation };
}>;


export const updateRegimeController = (updateRegime: UpdateRegime) => {
  return async (req: RequestUpdateRegime, reply: FastifyReply) => {
    const regime = req.params.regime;
    const rule = req.body.rule;
    // todo: enforce validation on the payload so that operation matches the UpdateRegimeOperation type
    const operation = req.body.operation || UpdateRegimeOperation.Add;

    if (!regime || !rule) {
      reply.status(HttpStatusCode.BadRequest);
      reply.send('Missing parameter');
      return;
    }

    const success = await updateRegime(regime, rule, operation);

    reply.send({ success });
  };
};
