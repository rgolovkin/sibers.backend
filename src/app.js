import path from 'path'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyView from '@fastify/view'
import handlebars from 'handlebars'
import Swagger from '@fastify/swagger'
import SwaggerUI from '@fastify/swagger-ui'
import fastifyStatic from '@fastify/static'
import { corsConfig, loggerConfig, swaggerConfig, swaggerUIConfig } from './configs/index.js'
import authRoutes, { authRoutePrefix } from './modules/auth/auth.routes.js'
import formbody from '@fastify/formbody'
import profileRoutes, { profileRoutePrefix } from './modules/profile/profile.routes.js'
import jwtAuth from './plugins/authentificate.js';
import usersRoutes, { usersRoutePrefix } from './modules/user/user.routes.js'

const app = Fastify({
	ignoreTrailingSlash: true,
	logger: loggerConfig
})

await app.register(formbody)

await app.register(jwtAuth);

const viewsRoot = path.resolve('src/views')
const publicRoot = path.resolve('src/public')

await app.register(cors, corsConfig)

await app.register(fastifyView, {
	engine: { handlebars },
	root: viewsRoot,
	includeViewExtension: true,
	options: {
		partials: {
			header: 'partials/header.hbs',
			footer: 'partials/footer.hbs'
		}
	}
})

await app.register(fastifyStatic, {
	root: publicRoot,
	prefix: '/public/'
})

await app.register(Swagger, swaggerConfig)
await app.register(SwaggerUI, swaggerUIConfig)

await app.register(authRoutes, { prefix: authRoutePrefix })
await app.register(profileRoutes, { prefix: profileRoutePrefix })
await app.register(usersRoutes, { prefix: usersRoutePrefix })

app.get('/', async (req, reply) => {
	reply.redirect('/login')
})

app.get('/login', async (req, reply) => {
	return reply.view('auth/login', { title: 'Sibers' })
})

app.get('/register', async (req, reply) => {
	return reply.view('auth/register', { title: 'Sibers' });
});

app.get('/profile', async (req, reply) => {
	return reply.view('profile/user', { title: 'Sibers' });
});

app.get('/profile/:id', async (req, reply) => {
	return reply.view('profile/user', { title: 'Sibers', userId: req.params.id });
});

app.get('/dashboard', async (req, reply) => {
	return reply.view('users/dashboard', { user: req.user });
});

app.setNotFoundHandler((req, reply) => {
	reply.status(404).view('404', { title: 'Page Not Found' })
})

export default app
