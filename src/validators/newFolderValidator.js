import {body} from 'express-validator'

const newFolderValidator = [
    body('folder_name')
    .trim()
    .notEmpty()
    .withMessage('folder name must not be empty')
    .isLength({max:50})
    .withMessage('folder name is too long')
];

export default newFolderValidator;