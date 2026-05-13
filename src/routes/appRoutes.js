import express from 'express'
import appController from '../controllers/appController.js'
import signUpValidator from '../validators/authValidator.js';
import loginValidator from '../validators/loginValidator.js';
import ensureAuth from '../middleware/ensureAuth.js';
import upload from '../middleware/multer.js'

const router = express.Router();

router.get('/',appController.getHome)
router.get('/sign-up',appController.getSignUp)
router.post('/sign-up',signUpValidator,appController.postSignUp)


router.get('/login',appController.getLogin)
router.post('/login',loginValidator,appController.postLogin)

router.get('/upload',appController.getFileUpload)
router.post('/upload',ensureAuth,upload.single("file"),appController.postFileUpload)

router.get('/folders',appController.getFolders)


export default router;