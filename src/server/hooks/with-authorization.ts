import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatus } from '../http-status.js';

export const withAuthorization = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (!req.headers.authorization) {
    reply.status(HttpStatus.Forbidden);
    reply.send({ error: 'Forbidden' });
  }
};
