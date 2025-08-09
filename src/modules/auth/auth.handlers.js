import {createUser, findUserByUsername} from "./auth.service.js";
import createError from "http-errors";
import bcrypt from "bcrypt";
import { signToken } from '../../plugins/jwt.js'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
	throw new Error('JWT_SECRET is not defined in environment variables')
}

export async function registerHandler (req, reply) {
		const {
				username,
				password,
				firstName,
				lastName,
				gender,
				birthdate
		} = req.body;
		
		const existedUser = await findUserByUsername(username)
		
		if (existedUser) throw createError(400, 'This username is already registered.');
		
		const hashedPassword = await bcrypt.hash(password, 10);
		
		const user = await createUser({
				username,
				password: hashedPassword,
				firstName,
				lastName,
				gender,
				birthdate
		})
	
		const token = signToken({ userId: user.id });
	
		return reply.send({
			message: 'Registration successful',
			token,
		});
}

export async function loginHandler (req, reply) {
	const { username, password } = req.body;
	
	const user = await findUserByUsername(username);
	
	if (!user) {
		throw createError(404, 'User not found');
	}
	
	const comparePassword = await bcrypt.compare(password, user.password);
	
	if (!comparePassword) {
		throw createError(401, 'Wrong password');
	}
	
	const token = signToken({ userId: user.id });
	
	return reply.send({
		message: 'Login successful',
		token,
	});
}
