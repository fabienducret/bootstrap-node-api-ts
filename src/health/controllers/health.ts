import { FastifyReply, FastifyRequest } from 'fastify';

export const healthController = async (
  _req: FastifyRequest,
  reply: FastifyReply
) => {
  reply.send('ok');
};
