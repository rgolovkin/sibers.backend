import fp from 'fastify-plugin';
import { verifyToken } from './jwt.js';
import User from '../modules/auth/auth.model.js'

export default fp(async function (fastify) {
  // Decorator for checking authorization
  fastify.decorate('authenticate', async function (request, reply) {
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.code(401).send({ message: 'Missing or invalid Authorization header' });
      }
      
      const token = authHeader.split(' ')[1];
      
      request.user = verifyToken(token);
      
    } catch (err) {
      reply.code(err.statusCode || 401).send({ message: err.message || 'Unauthorized' });
    }
  });
  
  // Decorator for checking for admin role
  fastify.decorate('verifyIsAdmin', async function (request, reply) {
    const { userId } = request.user;
    const user = await User.findOne({ where: { id: userId} })
    if (!user || user.role !== 'ADMIN') {
      return reply.code(403).send({ message: 'Forbidden: Admin access required' });
    }
  });
});
