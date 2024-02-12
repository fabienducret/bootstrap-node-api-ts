import { FastifyReply, FastifyRequest } from 'fastify';

export const withAuthorization = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (!req.headers.authorization) {
    reply.status(403);
    reply.send({ error: 'Forbidden' });
  }
};
