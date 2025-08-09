import { deleteUserById, getUsersList } from './user.service.js'
import { findUserById } from '../profile/profile.service.js'
import createError from 'http-errors'

export async function usersHandler(req) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'username',
    sortOrder = 'asc',
    search = '',
    birthdateFrom,
    birthdateTo,
  } = req.query;
  const { userId } = req.user
  
  return await getUsersList({
    userId,
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    birthdateFrom,
    birthdateTo,
  });
}

export async function deleteUserHandler (req) {
  const { id } = req.params
  
  const user = await findUserById(id)
  
  if (!user) throw createError(404, 'User not found')
  
  return await deleteUserById(user.id);
}
