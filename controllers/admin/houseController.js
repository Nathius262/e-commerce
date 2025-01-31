import * as houseHelper from '../../helpers/houseHelper.js'

// Fetch all houses with pagination and render the houses page
export const getAllHouses = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { houses, totalItems, totalPages, currentPage } = await houseHelper.getAllHouses(page, limit);

    res.render('./admin/house/list', {
      houses,
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

// Controller to create a new house
export const createNewHouse= async (req, res) => {
  try {
    const { location, size, number_0f_rooms } = req.body;

    console.log(req.body)


    if(location || size || number_0f_rooms){
      const newHouse = await houseHelper.createHouse({ location, size, number_0f_rooms });
    }
    else{
      res.status(400).json({message:'fields required!'})
    }
    
    // Return success response
    return res.status(201).json({ message: 'data created successfully', redirectTo:"/admin/house/" });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in create New data:", error);
    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to create house', error: error.message || error });
  }
}

export const getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await houseHelper.getHouseById(id);
    res.status(200).render('./admin/house/update', {house:house, admin:true});
  } catch (error) {
    if (error.message === 'house not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//updates
export const updateHouse= async (req, res)=>{
  try {
    const {id} = req.params
    const { location, size, number_0f_rooms } = req.body;

    if(location || size || number_0f_rooms){
      const updatedData = await houseHelper.updateHouseById(id, location, size, number_0f_rooms);
    }
    
    // Return success response
    return res.status(201).json({ message: 'data updated successfully', redirectTo:"/admin/house/"+id });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in updateController:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to update house', error: error.message || error });
  }
}

// Delete a house
export const deleteHouse= async (req, res) => {
  const { id } = req.params;

  try {
    const success = await houseHelper.deleteHouseById(id);
    if (success) {
      const result = {redirectTo:"/admin/house", message:`data id "${id}" deleted`}
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

export const renderHouseForm = async (req, res) => {
  try {
    res.render('./admin/house/create', {admin:true})
  } catch (error) {
    res.send(500).json("Internal server error", error)
  }
}