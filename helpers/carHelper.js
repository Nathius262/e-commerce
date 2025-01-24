import db from '../models/index.cjs';

// Create a new car
export const createCar = async({brand, model, model_year, mileage, engine_type}) => {
    return await db.Car.create({brand, model, model_year, mileage, engine_type});
}

export const getAllCars = async (page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { rows: cars, count: totalItems } = await db.Car.findAndCountAll({
      limit,
      offset,
    });

    return {
      cars: cars.map(car => car.get({ plain: true })) || [],
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch a specific role by ID
export const getCarById = async (id) => {
  try {
    const data = await db.Car.findByPk(id);
    if (!data) {
      throw new Error('Car not found');
    }
    const car = data.get({ plain: true });

    return car;
  } catch (error) {
    throw new Error(`Error fetching data by ID: ${error.message}`);
  }
};

// Update a role by ID
export const updateCarById = async (id, brand, model, model_year, mileage, engine_type) => {
  try {
    const car = await db.Car.findByPk(id);
    if (!car) {
      throw new Error('Car not found');
    }
    car.brand = brand || car.brand;
    car.model = model || car.model;
    car.model_year = model_year || car.model_year;
    car.mileage = mileage || car.mileage;
    car.engine_type = engine_type || car.engine_type;
    
    await car.save();
    return car;
  } catch (error) {
    throw new Error(`Error updating role: ${error.message}`);
  }
};

// Delete a role by ID
export const deleteCarById = async (id) => {
  try {
    const car = await db.Car.findByPk(id);
    if (!car) {
      throw new Error('Car not found');
    }
    await car.destroy();
    return true;
  } catch (error) {
    throw new Error(`Error deleting car: ${error.message}`);
  }
};
