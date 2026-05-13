import {body} from 'express-validator'

const loginValidator = [
    body('user_name')
    .notEmpty()
    .withMessage('username must not be empty')
    .escape(),
    body('password')
    .notEmpty()
    .withMessage('password must not be empty')
];

export default loginValidator;