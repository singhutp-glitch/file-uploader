import {body} from 'express-validator'

const updateFolderValidator = [
    body('newName')
    .trim()
    .notEmpty()
    .withMessage('folder name must not be empty')
    .isLength({max:50})
    .withMessage('folder name is too long')
];

export default updateFolderValidator;