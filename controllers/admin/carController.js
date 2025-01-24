import * as carHelper from '../../helpers/carHelper.js'

// Fetch all cars with pagination and render the cars page
export const getAllCars = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { cars, totalItems, totalPages, currentPage } = await carHelper.getAllElectronics(page, limit);

    res.render('./admin/car/list', {
      cars,
      currentPage,
      totalPages,
      totalItems,
      limit,
      admin:true
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to create a new car
export const createNewCar= async (req, res) => {
  try {
    const { brand, model, model_year, mileage, engine_type } = req.body;


    if(brand || model || model_year || mileage || engine_type){
      const newCar = await carHelper.createCar({ brand, model, model_year, mileage, engine_type });
    }
    else{
      res.status(400).json({message:'fields required!'})
    }
    
    // Return success response
    return res.status(201).json({ message: 'data created successfully', redirectTo:"/admin/car/" });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in create New data:", error);
    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to create car', error: error.message || error });
  }
}

export const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await carHelper.getCarById(id);
    res.status(200).render('./admin/car/update', {car:car, admin:true});
  } catch (error) {
    if (error.message === 'car not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//updates
export const updateCar= async (req, res)=>{
  try {
    const {id} = req.params
    const { brand, model, model_year, mileage, engine_type } = req.body;

    if(brand || model || model_year || mileage || engine_type){
      const updatedData = await carHelper.updateCarById(id, brand, model, model_year, mileage, engine_type);
    }
    
    // Return success response
    return res.status(201).json({ message: 'data updated successfully', redirectTo:"/admin/car/"+id });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in updateController:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to update car', error: error.message || error });
  }
}

// Delete a car
export const deleteCar= async (req, res) => {
  const { id } = req.params;

  try {
    const success = await carHelper.deleteCarById(id);
    if (success) {
      const result = {redirectTo:"/admin/car", message:`data id "${id}" deleted`}
      res.status(204).json(result);  // No content
    }
  } catch (error) {
    if (error.message === 'data not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const renderCarForm = async (req, res) => {
  try {
    res.render('./admin/car/create', {admin:true})
  } catch (error) {
    res.send(500).json("Internal server error", error)
  }
}