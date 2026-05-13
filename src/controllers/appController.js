import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma.js'

const getHome = (req,res)=>{
    res.render('homePage');
};

const getSignUp = (req,res)=>{
    res.render('sign-up-form');
};

const postSignUp = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors :errors.array()})
    }
    try{
            const {user_name,password} = req.body;
            const hashed_password = await bcrypt.hash(password,10);

            await prisma.user.create({
                data:{
                        username:user_name,
                        password:hashed_password,
                    }
                });
            res.redirect('/');


    }catch(err){
        console.error(err);
        res.status(500).send('Error creating user');
    }

};

export default {
    getHome,
    getSignUp,
    postSignUp
}