import User from "./auth.model.js";
import createError from "http-errors";

export async function findUserByUsername (username) {
		return await User.findOne({
				where: { username },
		})
}

export async function createUser (data) {
		try {
				return await User.create({ ...data });
		} catch (e) {
				console.error(e)
				throw createError(400, e);
		}
}
