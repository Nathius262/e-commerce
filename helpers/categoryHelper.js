import db from '../models/index.cjs';

export const getAllCategories = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { rows: categories, count: totalItems } = await db.Category.findAndCountAll({
      limit,
      offset,
    });

    return {
      categories: categories.map(category => category.get({ plain: true })),
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch a specific role by ID
export const fetchCategoryById = async (id) => {
  try {
    const data = await db.Category.findByPk(id);
    if (!data) {
      throw new Error('Category not found');
    }
    const category = data.get({ plain: true });

    return category;
  } catch (error) {
    throw new Error(`Error fetching data by ID: ${error.message}`);
  }
};

// Update a role by ID
export const updateCategoryById = async (id, name, description) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    return category;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
};

// Delete a role by ID
export const deleteCategoryById = async (id) => {
  try {
    const category = await db.Category.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};


// Create a new category
export async function createCategory({name, description}) {
  return await db.Category.create({name, description});
}