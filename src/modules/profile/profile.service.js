import User from '../auth/auth.model.js'
import createError from 'http-errors'


export async function findUserById (id) {
	try {
		return await User.findOne({
			where: {
				id
			},
			attributes: {
				exclude: ['password'],
			}
		})
	} catch (e) {
		console.log(e)
		throw createError(400, e);
	}
}

export async function updateUserProfile (id, data) {
	try {
		return await User.update(data, { where: { id } });
	} catch (e) {
		console.log(e);
		throw createError(400, e);
	}
}
