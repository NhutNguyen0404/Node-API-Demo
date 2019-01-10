import { Router } from 'express';
import Login from '../controllers/login.controller';
import validate  from 'express-validation';
import validations from '../validation/login';
const router = new Router();

router.post('/login', validate (validations.login), Login.login); // req.body

export default router;