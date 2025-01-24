import { Router } from 'express';


import { adminAuthMiddleware } from '../../middlewares/authMiddleware.js';
import {renderloginAdmin, loginAdmin} from '../../controllers/authController.js'
import {renderAdminDashboard} from '../../controllers/admin/rootController.js';
import  * as user from '../../controllers/admin/userController.js';
import * as role from '../../controllers/admin/roleController.js';
import * as category from '../../controllers/admin/categoryController.js'


const router = Router()


//////////////////////
//////////////////////
//// USER ROUTER /////
//////////////////////
//////////////////////

router.route('/login')
    .get(renderloginAdmin)
    .post(loginAdmin);

router.use(adminAuthMiddleware)


//////////////////////
//////////////////////
//ROOT ADMIN ROUTER //
//////////////////////
//////////////////////
router.get('/', renderAdminDashboard)


//////////////////////
//////////////////////
//// USER ROUTER /////
//////////////////////
//////////////////////

router.route('/user')
    .get(user.getAllUsers)
    .post(user.createUser);

router.get('/user/create', user.renderNewUserTemplate);

router.route('/user/:id')
    .get(user.getUserById)
    .put(user.updateUserById)
    .delete(user.deleteUser);

//////////////////////
//////////////////////
//// ROLE ROUTER /////
//////////////////////
//////////////////////

router.route('/role')
    .get(role.getAllRoles)
    .post(role.createRole);

router.get('/role/create', role.renderRoleForm);
    
router.route('/role/:id')
    .get(role.getRoleById)
    .put(role.updateRole)
    .delete(role.deleteRole);


//////////////////////
//////////////////////
/// CATEGORY ROUTER //
//////////////////////
//////////////////////
router.route('/category')
.get(category.getAllCategories)
.post(category.createCategoryController);


router.get('/category/create', category.renderCategoryForm);

router.route('/category/:id')
    .get(category.getCategoryById)
    .put(category.updateCategory)
    .delete(category.deleteCategory);



export default router;
