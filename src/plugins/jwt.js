import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
if (!secret) {
	throw new Error('JWT_SECRET is not defined in environment variables');
}

export function signToken(payload, options = {}) {
	return jwt.sign(payload, secret, {
		expiresIn: '1h',
		...options,
	});
}

// verify JWT token function
export function verifyToken(token) {
	try {
		return jwt.verify(token, secret);
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			err.statusCode = 401;
			err.message = 'Token expired';
		} else if (err.name === 'JsonWebTokenError') {
			err.statusCode = 401;
			err.message = 'Invalid token';
		}
		throw err;
	}
}
