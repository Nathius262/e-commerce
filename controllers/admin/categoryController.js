import * as categoryHelper from '../../helpers/categoryHelper.js'

// Fetch all categories with pagination and render the categories page
export const getAllCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { categories, totalItems, totalPages, currentPage } = await categoryHelper.getAllCategories(page, limit);

    res.render('./admin/category/list', {
      categories,
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

// Controller to create a new category
export async function createCategoryController(req, res) {
  try {
    const { name, description } = req.body;


    if(name || description){
      const newCategory = await categoryHelper.createCategory({ name, description });
    }
    else{
      res.status(400).json({message:'fields required!'})
    }
    
    // Return success response
    return res.status(201).json({ message: 'Category created successfully', redirectTo:"/admin/category/" });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in createCategoryController:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to create category', error: error.message || error });
  }
}

export const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryHelper.fetchCategoryById(id);
    res.status(200).render('./admin/category/update', {category:category, admin:true});
  } catch (error) {
    if (error.message === 'Category not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//updates
export const updateCategory = async (req, res)=>{
  try {
    const {id} = req.params
    const { name, description } = req.body;

    if(name || description){
      const updatedcategory = await categoryHelper.updateCategoryById(id, name, description);
    }
    
    // Return success response
    return res.status(201).json({ message: 'Category updated successfully', redirectTo:"/admin/category/"+id });
  } catch (error) {
    // Log the detailed error to get more information
    console.error("Error in createCategoryController:", error);

    // Return a detailed error response
    return res.status(500).json({ message: 'Failed to update category', error: error.message || error });
  }
}

// Delete a category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const success = await categoryHelper.deleteCategoryById(id);
    if (success) {
      const result = {redirectTo:"/admin/category", message:`Category id "${id}" deleted`}
      res.status(204).json(result);  // No content
    }
  } catch (error) {
    if (error.message === 'Category not found') {
      return res.status(404).json({ error: error.message });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const renderCategoryForm = async (req, res) => {
  try {
    res.render('./admin/category/create', {admin:true})
  } catch (error) {
    res.send(500).json("Internal server error", error)
  }
}