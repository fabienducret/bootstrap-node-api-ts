import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from "axios";

export const withAuthorization = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  if (!req.headers.authorization) {
    reply.status(HttpStatusCode.Forbidden);
    reply.send({ error: 'Forbidden' });
  }
};
