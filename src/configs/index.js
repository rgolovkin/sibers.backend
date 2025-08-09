import * as METHODS from './http/constants.js'

// Logger
export const loggerConfig = {
		transport: {
				target: 'pino-pretty',
				options: {
						translateTime: 'HH:MM:ss Z',
						ignore: 'pid,hostname',
				},
		},
}

// Swagger
export const swaggerConfig = {
	openapi: {
		info: {
			title: 'Sibers API',
			description: 'Complete documentation for Sibers',
			version: '1.0.0'
		},
		exposeRoute: false,
		servers: [
			{
				url: `http://127.0.0.1:${process.env.PORT || 3000}`,
				description: 'Development'
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT token for authentication user'
				}
			}
		},
		security: [
			{
				bearerAuth: []
			}
		]
	}
}

export const swaggerUIConfig = {
		routePrefix: '/docs',
		uiConfig: {
				deepLinking: false,
		},
		staticCSP: true,
}

// CORS
export const corsConfig = {
		origin: [
				/^http:\/\/localhost:3000/,
				/^http:\/\/localhost:3001/,
				/^http:\/\/localhost:3004/,
				/^http:\/\/127.0.0.1:3000/
		],
		methods: Object.values(METHODS)
}
