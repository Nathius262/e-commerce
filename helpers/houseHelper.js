import db from '../models/index.cjs';

// Create a new house
export const createHouse = async({location, size, number_0f_rooms}) => {
    return await db.House.create({location, size, number_0f_rooms});
}

export const getAllHouses = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { rows: houses, count: totalItems } = await db.House.findAndCountAll({
      limit,
      offset,
    });

    return {
      houses: houses.map(house => house.get({ plain: true })) || [],
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch a specific role by ID
export const getHouseById = async (id) => {
  try {
    const data = await db.House.findByPk(id);
    if (!data) {
      throw new Error('House not found');
    }
    const house = data.get({ plain: true });

    return house;
  } catch (error) {
    throw new Error(`Error fetching data by ID: ${error.message}`);
  }
};

// Update a role by ID
export const updateHouseById = async (id, location, size, number_0f_rooms) => {
  try {
    const house = await db.House.findByPk(id);
    if (!house) {
      throw new Error('House not found');
    }
    house.location = location || house.location;
    house.size = size || house.size;
    house.number_0f_rooms = number_0f_rooms || house.number_0f_rooms;
   
    await house.save();
    return house;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
};

// Delete a role by ID
export const deleteHouseById = async (id) => {
  try {
    const house = await db.House.findByPk(id);
    if (!house) {
      throw new Error('House not found');
    }
    await house.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error deleting house: ${error.message}`);
  }
};
