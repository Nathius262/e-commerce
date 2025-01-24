import * as electronicHelper from '../../helpers/electronicHelper.js'

// Fetch all electronics with pagination and render the electronics page
export const getAllElectronics = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { electronics, totalItems, totalPages, currentPage } = await electronicHelper.getAllElectronics(page, limit);

    res.render('./admin/electronic/list', {
      electronics,
      currentPage,
      totalPages,
      totalItems,
      limit,
      admin:true
    });
  } catch (error) {
    console.error('Error fetching color:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to create a new electronic
export const createNewElectronic= async (req, res) => {
  try {
    const { brand, model, warranty_period } = req.body;


    if(brand || model || warranty_period){
      const newElectronic = await electronicHelper.createElectroic({ brand, model, warranty_period });
    }
    else{
      res.status(400).json({message:'fields required!'})
    }
    
    // Return success response
    return res.status(201).json({ message: 'data created successfully', redirectTo:"/admin/electronic/" });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in createNewcategory:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to create electronic', error: error.message || error });
  }
}

export const getElectronicById = async (req, res) => {
  const { id } = req.params;
  try {
    const electronic = await electronicHelper.getElectronicById(id);
    res.status(200).render('./admin/electronic/update', {electronic:electronic, admin:true});
  } catch (error) {
    if (error.message === 'electronic not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//updates
export const updateElectronic= async (req, res)=>{
  try {
    const {id} = req.params
    const { brand, model, warranty_period } = req.body;

    if(brand || model || warranty_period){
      const updatedData = await electronicHelper.updateCategoryById(id, brand, model, warranty_period);
    }
    
    // Return success response
    return res.status(201).json({ message: 'data updated successfully', redirectTo:"/admin/electronic/"+id });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in updateController:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to update electronic', error: error.message || error });
  }
}

// Delete a electronic
export const deleteElectronic = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await electronicHelper.deleteElectronicById(id);
    if (success) {
      const result = {redirectTo:"/admin/electronic", message:`data id "${id}" deleted`}
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

export const renderElectronicForm = async (req, res) => {
  try {
    res.render('./admin/electronic/create', {admin:true})
  } catch (error) {
    res.send(500).json("Internal server error", error)
  }
}