import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import validate  from 'express-validation';
import validations from '../validation/group';
import middleware from '../middleware/group';
const router = new Router();

router.get('/groups', GroupController.getAll);
router.get('/groups/:id', GroupController.getById);
router.post('/groups', [validate (validations.create)],  GroupController.create);
router.put('/groups/:id', [validate (validations.update), middleware.checkId], GroupController.update);
router.delete('/groups/:id', GroupController.delete);

export default router;