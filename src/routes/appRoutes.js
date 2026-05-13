import express from 'express'
import appController from '../controllers/appController.js'
import signUpValidator from '../validators/authValidator.js';

const router = express.Router();

router.get('/',appController.getHome)
router.get('/sign-up',appController.getSignUp)
router.post('/sign-up',signUpValidator,appController.postSignUp)


router.get('/login',appController.getLogin)
router.post('/sign-up',signUpValidator,appController.postSignUp)


export default router;