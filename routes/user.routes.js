import { Router } from 'express';
import UserController from '../controllers/user.controller';
import validate  from 'express-validation';
import validations from '../validation/user';
const router = new Router();

// Get all users
// ResfulAPI: 
// Get data: method: GET
// Create new data: method: POST
// Update data: method: PUT
// Delete data: method: DELETE
// PATCH... Update

// Resful naming.
// CRUD user
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getOneUser);// req.params
router.post('/users', validate (validations.createUser), UserController.create); // req.body
router.put('/users/change-password', validate (validations.updatePassword), UserController.changePassword);
router.put('/users/:id', validate (validations.updateUser), UserController.updateUser); // req.body
router.delete('/users/:id', UserController.deleteUser);


export default router;