import { fetchUserById, fetchAllUsers, createNewUser, updateUserAndRoles, deleteUserById } from '../../helpers/userHelper.js';


export const renderNewUserTemplate = async (req, res) => {
  try {
    res.status(200).render('./admin/user/create')
  } catch (error) {
    res.status(500).json('Internal Server Error', error)
  }
}

// Get all users (Admin HTML rendering)
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const data = await fetchAllUsers(page, limit);
    res.render('./admin/user/list', {admin:true, users: data.users, pagination: { currentPage: data.currentPage, totalPages: data.totalPages, totalItems: data.totalItems } });
  } catch (error) {
    res.status(500).json(error)
  }
};

// Get a user by ID (Admin HTML rendering)
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await fetchUserById(id); // Assuming fetchUserById is a helper function

    res.render('./admin/user/update', { user, admin:true });
  } catch (error) {
    console.log(error)
    res.status(404).render('./errors/404', { url: `${req.protocol}://${req.get('host')}${req.originalUrl}` });
  }
};


// Create a new user (Admin HTML rendering)
export const createUser = async (req, res) => {
  try {
    const newUser = await createNewUser(req.body);
    res.json({message:'user created successfully', redirectTo: '/admin/user', admin:true}); // Redirect to user list
  } catch (error) {
    console.log(error)
    console.log(error.message)
    res.status(500).json(error);
  }
};

// Update a user (Admin HTML rendering)
// Controller for updating a user and their roles
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { email, first_name, last_name, is_seller, is_admin, address, p_country, p_state, p_city} = req.body;

  try {
    // Update the user and their roles
    const updatedUser = await updateUserAndRoles(id, { email, first_name, last_name, is_seller, is_admin, address, p_country, p_state, p_city });

    // Redirect to the user edit page after updating
    return res.json({message:`"${first_name} ${last_name}" succeffully updated their profile`, redirectTo:`/admin/user/${id}`});
  } catch (error) {
    return res.status(500).json({error});
  }
};

// Delete a user (Admin HTML rendering)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteUserById(id);
    res.redirect('/admin/user', {admin:true}); // Redirect to user list after deletion
  } catch (error) {
    res.status(500).json(error);
  }
};
