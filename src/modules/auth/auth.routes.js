import {loginHandler, registerHandler} from "./auth.handlers.js";
import {loginSchema, registerSchema} from "./auth.schemas.js";

export const authRoutePrefix = '/api/v1/auth'

export default function registerRoutes (app, options, done) {
		app.route({
				method: 'POST',
				path: '/register',
				schema: registerSchema,
				handler: registerHandler,
		})
		
		app.route({
				method: 'POST',
				path: '/login',
				schema: loginSchema,
				handler: loginHandler
		})
	
		done()
}
