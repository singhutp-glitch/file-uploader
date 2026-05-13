import express from 'express'
import appController from '../controllers/appController.js'
const router = express.Router();

router.get('/',appController.getHome)
router.get('/sign-up',appController.getSignUp)

export default router;