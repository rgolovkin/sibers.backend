import { deleteUserScheme, usersScheme } from './user.schemas.js'
import { deleteUserHandler, usersHandler } from './user.handlers.js'

export const usersRoutePrefix = '/api/v1/users'

export default function registerRoutes (app, options, done) {
	app.route({
		method: 'GET',
		path: '/list',
		preValidation: [app.authenticate],
		schema: usersScheme,
		handler: usersHandler
	})
	
	app.route({
		method: 'DELETE',
		path: '/delete/:id',
		preValidation: [app.authenticate, app.verifyIsAdmin],
		schema: deleteUserScheme,
		handler: deleteUserHandler
	})
	
	done()
}
