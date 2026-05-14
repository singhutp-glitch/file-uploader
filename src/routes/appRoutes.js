import express from 'express'
import appController from '../controllers/appController.js'
import signUpValidator from '../validators/authValidator.js';
import loginValidator from '../validators/loginValidator.js';
import newFolderValidator from '../validators/newFolderValidator.js';
import updateFolderValidator from '../validators/updateFolderValidator.js'
import ensureAuth from '../middleware/ensureAuth.js';
import upload from '../middleware/multer.js'

const router = express.Router();

router.get('/',appController.getHome)
router.get('/sign-up',appController.getSignUp)
router.post('/sign-up',signUpValidator,appController.postSignUp)


router.get('/login',appController.getLogin)
router.post('/login',loginValidator,appController.postLogin)

router.post('/folder/:folderId/upload',ensureAuth,upload.single("file"),appController.postFileUpload)

router.get('/folders',ensureAuth,appController.getFolders)

router.post('/create-folder',ensureAuth,newFolderValidator,appController.postCreateFolder)

router.get('/folder/:folderId',ensureAuth,appController.getOneFolder)

router.post('/folder/:folderId/file/:fileId/delete',ensureAuth,appController.postDeleteFile)

router.get('/folder/:folderId/update',ensureAuth,appController.getUpdateFolder)
router.post('/folder/:folderId/update',ensureAuth,updateFolderValidator,appController.postUpdateFolder)



export default router;