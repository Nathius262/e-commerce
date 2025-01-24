import db from '../models/index.cjs';

// Create a new electronic
export const createElectroic = async({brand, model, warranty_period}) => {
    return await db.Electronic.create({brand, model, warranty_period});
}

export const getAllElectronics = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { rows: electronics, count: totalItems } = await db.Electronic.findAndCountAll({
      limit,
      offset,
    });

    return {
      electronics: electronics.map(electronic => electronic.get({ plain: true })) || [],
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch a specific role by ID
export const getElectronicById = async (id) => {
  try {
    const data = await db.Electronic.findByPk(id);
    if (!data) {
      throw new Error('Electronic not found');
    }
    const electronic = data.get({ plain: true });

    return electronic;
  } catch (error) {
    throw new Error(`Error fetching data by ID: ${error.message}`);
  }
};

// Update a role by ID
export const updateElectronicById = async (id, brand, model, warranty_period) => {
  try {
    const electronic = await db.Electronic.findByPk(id);
    if (!electronic) {
      throw new Error('Electronic not found');
    }
    electronic.brand = brand || electronic.brand;
    electronic.model = model || electronic.model;
    electronic.warranty_period = warranty_period || electronic.warranty_period;
    await electronic.save();
    return electronic;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
};

// Delete a role by ID
export const deleteElectronicById = async (id) => {
  try {
    const electronic = await db.Electronic.findByPk(id);
    if (!electronic) {
      throw new Error('Electronic not found');
    }
    await electronic.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error deleting electronic: ${error.message}`);
  }
};
