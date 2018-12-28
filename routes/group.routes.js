import { Router } from 'express';
import GroupController from '../controllers/group.controller';
import validate  from 'express-validation';
import validations from '../validation/user';
const router = new Router();

router.get('/groups', GroupController.getAll);
router.post('/groups', validate (validations.create),  GroupController.create);
router.put('/groups/:id', validate (validations.update), GroupController.update);
router.delete('/groups/:id', GroupController.delete);

export default router;