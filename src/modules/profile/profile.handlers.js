import { findUserById, updateUserProfile } from './profile.service.js'
import createError from 'http-errors'

export async function profileHandler (req) {
  const { userId } = req.user;
  
  const user = await findUserById(userId)
  
  if (!user) throw createError(404, 'User not found')
  
  return user;
}

export async function getUserProfileHandler (req) {
  const { id } = req.params
  
  const user = await findUserById(id)
  
  if (!user) throw createError(404, 'User not found')
  
  return user;
}

export async function editProfileHandler (req) {
  const { username, firstName, lastName, gender } = req.body;
  let { userId } = req.user;
  
  if (req.query['id']) {
    userId = req.query['id'];
  }
  
  const user = await findUserById(userId);
  
  if (!user) throw createError(404, 'User not found');
  
  return await updateUserProfile(user.id, { username, firstName, lastName, gender })
}
