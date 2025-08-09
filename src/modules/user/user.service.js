import User from '../auth/auth.model.js'
import { Op } from 'sequelize'
import createError from 'http-errors'

export async function getUsersList({ userId, page, limit, sortBy, sortOrder, search, birthdateFrom, birthdateTo }) {
  const offset = (page - 1) * limit;
  
  const where = {
    id: {
      [Op.not]: userId,
    }
  };
  
  if (search.trim()) {
    where[Op.or] = [
      { username: { [Op.like]: `%${search}%` } },
      { firstName: { [Op.like]: `%${search}%` } },
    ];
  }
  
  if (birthdateFrom || birthdateTo) {
    where.birthdate = {};
    if (birthdateFrom) {
      where.birthdate[Op.gte] = birthdateFrom;
    }
    if (birthdateTo) {
      where.birthdate[Op.lte] = birthdateTo;
    }
  }
  
  try {
    const { count, rows } = await User.findAndCountAll({
      where,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit,
      offset,
      attributes: ['id', 'username', 'firstName', 'lastName', 'birthdate', 'gender'],
    });
    
    return {
      total: count,
      page,
      limit,
      users: rows,
    };
  } catch (error) {
    console.log(error);
    throw createError(400, error);
  }
}

export async function deleteUserById (id) {
  try {
    return await User.destroy({ where: { id } });
  } catch (e) {
    console.error(e)
    throw createError(400, e);
  }
}
