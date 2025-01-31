import { Router } from 'express';


import { adminAuthMiddleware } from '../../middlewares/authMiddleware.js';
import {renderloginAdmin, loginAdmin} from '../../controllers/authController.js'
import {renderAdminDashboard} from '../../controllers/admin/rootController.js';
import  * as user from '../../controllers/admin/userController.js';
import * as role from '../../controllers/admin/roleController.js';
import * as category from '../../controllers/admin/categoryController.js'
import * as electronic from '../../controllers/admin/electronicController.js'
import * as car from '../../controllers/admin/carController.js'
import * as house from '../../controllers/admin/houseController.js'


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


//////////////////////
//////////////////////
// ELECTRONIC ROUTER //
//////////////////////
//////////////////////
router.route('/electronic')
.get(electronic.getAllElectronics)
.post(electronic.createNewElectronic);


router.get('/electronic/create', electronic.renderElectronicForm);

router.route('/electronic/:id')
    .get(electronic.getElectronicById)
    .put(electronic.updateElectronic)
    .delete(electronic.deleteElectronic);


    
//////////////////////
//////////////////////
// CAR ROUTE /////////
//////////////////////
//////////////////////
router.route('/car')
.get(car.getAllCars)
.post(car.createNewCar);


router.get('/car/create', car.renderCarForm);

router.route('/car/:id')
    .get(car.getCarById)
    .put(car.updateCar)
    .delete(car.deleteCar);


//////////////////////
//////////////////////
// HOUSE ROUTE ///////
//////////////////////
//////////////////////
router.route('/house')
.get(house.getAllHouses)
.post(house.createNewHouse);


router.get('/house/create', house.renderHouseForm);

router.route('/house/:id')
    .get(house.getHouseById)
    .put(house.updateHouse)
    .delete(house.deleteHouse);

export default router;
