import { FastifyInstance } from 'fastify';
import { Controllers } from './server.js';
import { withAuthorization } from './hooks/with-authorization.js';

export const loadRoutes = (
  server: FastifyInstance,
  controllers: Controllers
): void => {
  server.register(publicRoutesWith(controllers));
  server.register(privateRoutesWith(controllers));
};

const publicRoutesWith = (controllers: Controllers) => {
  return async (server: FastifyInstance) => {
    server.get('/health', controllers.health);
  };
};

const privateRoutesWith = (controllers: Controllers) => {
  return async (server: FastifyInstance) => {
    server.addHook('preHandler', withAuthorization);

    server.get('/health/private', controllers.health);
  };
};
