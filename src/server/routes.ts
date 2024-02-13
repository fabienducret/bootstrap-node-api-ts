import { FastifyInstance } from 'fastify';
import { withAuthorization } from './hooks/with-authorization.js';
import type { Controllers } from './server.js';

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

    server.get('/injection-debit', controllers.getInjectionDebit);
  };
};

const privateRoutesWith = (controllers: Controllers) => {
  return async (server: FastifyInstance) => {
    server.addHook('preHandler', withAuthorization);

    server.get('/health/private', controllers.health);
    server.patch('/regime/:regime', controllers.updateRegime);
  };
};
