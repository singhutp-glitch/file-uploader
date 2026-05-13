import {body} from 'express-validator'

const signUpValidator = [
    body('user_name').trim()
    .isLength({min:3})
    .withMessage('username must be at least 3 character long')
    .escape(),
    body('password')
    .isLength({min:3})
    .withMessage('password must be at least 3 character long')
];

export default signUpValidator;