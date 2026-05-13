import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma.js'
import passport from "passport";

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

const getLogin = (req,res)=>{
    res.render('login-form');
};


const postLogin = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors :errors.array()})
    }
    
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login'
    })(req,res,next);
};


const getFileUpload = (req,res)=>{
    res.render('upload-form');
};

const postFileUpload = async (req,res)=>{
    console.log(req.file);
    await prisma.file.create({
  data: {

    originalName:
      req.file.originalname,

    storedName:
      req.file.filename,

    filePath:
      req.file.path,

    mimeType:
      req.file.mimetype,

    size:
      req.file.size,

    user: {
      connect: {
        id: req.user.id,
      },
    },
  },
});
    res.send('file is uploaded');
};

const getFolders = (req,res)=>{
    res.render('folders-section');
};


export default {
    getHome,
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    getFileUpload,
    postFileUpload,
    getFolders
}