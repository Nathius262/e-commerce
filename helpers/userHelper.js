import db from '../models/index.cjs'; // Adjust the import as per your project structure
import bcrypt from 'bcrypt';

// Fetch a user by ID along with their roles
export const fetchUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id, {
      include: [{
        model: db.Role,
        as: 'roles',
        through: { attributes: [] } // Exclude join table attributes
      },
      {
        model:db.Address,
        as:'address',
        attributes: ['street_address', 'city', 'state', 'country']   
      }
    ]
    });

    if (!user) throw new Error('User not found');
    
    // Convert Sequelize instance to plain JS object
    const plainUser = user.get({ plain: true });
    
    return plainUser;
  } catch (error) {
    throw error;
  }
};

// Fetch all users with pagination
// Fetch all users with pagination
export const fetchAllUsers = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
  
    try {
      const { count, rows: users } = await db.User.findAndCountAll({
        attributes: { exclude: ['password'] }, // Exclude sensitive fields
        include: {
          model: db.Role,
          as: 'roles',
          attributes: ['id', 'name'],
          through: { attributes: [] }
        },
        limit,
        offset
      });
  
      // Convert each user instance to a plain object
      const plainUsers = users.map(user => user.get({ plain: true }));
  
      const totalPages = Math.ceil(count / limit);
  
      return { users: plainUsers, currentPage: page, totalPages, totalItems: count };
    } catch (error) {
      throw error;
    }
  };
  

// Create a new user
export const createNewUser = async ({ first_name, last_name, email, password, roleIds = [], address, p_country, p_state, p_city }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = await db.Role.findOne({ where: { name: 'buyer' } });
    if (!userRole) throw new Error('Default role "buyer" not found');

    const newUser = await db.User.create({ first_name, last_name, email, password: hashedPassword });
    const allRoles = roleIds.length > 0 ? [userRole.id, ...roleIds] : [userRole.id];

    await newUser.setRoles(allRoles);

    // Only update the address if any of the address fields are not empty
    if (address || p_country || p_state || p_city) {
      // Fetch the existing address by userId
      await db.Address.create({
        userId: newUser.id,
        street_address: address,
        city: p_city,
        state: p_state,
        country: p_country,
      });
    }


    const createdUser = await fetchUserById(newUser.id);
    return createdUser;
  } catch (error) {
    throw error;
  }
};

// Update a user and their roles
export const updateUserAndRoles = async (id, { email, first_name, last_name, is_seller, is_admin, address, p_country, p_state, p_city }) => {
  try {
    // Fetch the user by ID
    const user = await db.User.findByPk(id);
    if (!user) throw new Error('User not found');

    // Update user fields
    user.email = email || user.email;
    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    await user.save();

    // Fetch the role IDs for 'user', 'staff', and 'admin'
    const buyerRole = await db.Role.findOne({ where: { name: 'buyer' } });
    const adminRole = is_admin ? await db.Role.findOne({ where: { name: 'admin' } }) : null;
    const sellerRole = is_seller ? await db.Role.findOne({ where: { name: 'seller' } }) : null;

    // Build the role array to include the 'user' role always
    const roleIds = [buyerRole.id];
    if (adminRole) roleIds.push(adminRole.id);
    if (sellerRole) roleIds.push(sellerRole.id);

    // Update user roles
    await user.setRoles(roleIds); // This updates the user's roles in the database

    // Only update the address if any of the address fields are not empty
    if (address || p_country || p_state || p_city) {
      // Fetch the existing address by userId
      const existingAddress = await db.Address.findOne({ where: { userId: id } });

      if (existingAddress) {
        // Update the existing address if it exists
        await existingAddress.update({
          street_address: address || existingAddress.street_address,
          city: p_city || existingAddress.city,
          state: p_state || existingAddress.state,
          country: p_country || existingAddress.country,
        });
      } else {
        // If no address exists, create a new address (optional, if you want to handle this case)
        await db.Address.create({
          userId: id,
          street_address: address,
          city: p_city,
          state: p_state,
          country: p_country,
        });
      }
    }

    // Return the updated user with roles and address
    const updatedUser = await db.User.findByPk(id, {
      include: [
        {
          model: db.Role,
          as: 'roles',
          through: { attributes: [] }, // Exclude join table attributes
        },
        {
          model: db.Address, // Include the user's address
          as: 'address',
        },
      ],
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

// Delete a user by ID
export const deleteUserById = async (id) => {
  try {
    const user = await db.User.findByPk(id);
    if (!user) throw new Error('User not found');

    await user.destroy();
  } catch (error) {
    throw error;
  }
};
