import { editProfileSchema, getUserProfileScheme, profileScheme } from './profile.schemas.js'
import { editProfileHandler, getUserProfileHandler, profileHandler } from './profile.handlers.js'

export const profileRoutePrefix = '/api/v1/profile'

export default function registerRoutes (app, options, done) {
	app.route({
		method: 'GET',
		path: '/',
		preValidation: [app.authenticate],
		schema: profileScheme,
		handler: profileHandler
	})
	
	app.route({
		method: 'GET',
		path: '/:id',
		preValidation: [app.authenticate],
		schema: getUserProfileScheme,
		handler: getUserProfileHandler
	})
	
	app.route({
		method: 'PUT',
		path: '/edit',
		preValidation: [app.authenticate],
		schema: editProfileSchema,
		handler: editProfileHandler
	})
	
	done()
}
