import { Router } from 'express';
import Logout from '../controllers/logout.controller';
const router = new Router();

router.post('/logout', Logout.logout); // req.body

export default router;