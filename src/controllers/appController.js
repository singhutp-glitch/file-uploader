import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import prisma from '../../lib/prisma.js'
import passport from "passport";
import fs from "node:fs/promises";

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


const postFileUpload = async (req,res)=>{
    console.log(req.file);
    const {folderId} = req.params;
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
    folder: {
      connect: {
        id: +folderId,
      },
    },
  },
});
    res.redirect('/folder/'+folderId);
};

const getFolders = async (req, res) => {

  try {

    const folders =
      await prisma.folder.findMany({
        where: {
          userId: req.user.id,
        },
      });

    res.render("folders-section", {
      folders,
    });

  } catch (err) {

    console.error(err);

    res.status(500)
      .send("Error fetching folders");
  }
};

const postCreateFolder =async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors :errors.array()})
    }

    try{
        const {folder_name} = req.body;
        await prisma.folder.create({
            data:{
                folderName:folder_name,
                userId:req.user.id,
            }
        });

        res.redirect('/folders');
    }catch(err){
        console.error(err);
        res.status(500).send('Error creating folder');
    }
};

const getOneFolder = async(req,res) =>{
  const folderId = +req.params.folderId;
  const folder = await prisma.folder.findFirst({
    where:{
      id:folderId,
      userId:req.user.id
    }
  })

  const files = await prisma.file.findMany({
    where:{
      userId:req.user.userId,
      folderId: +folderId
    }
  })
  res.render('inside-folder',{files :files,folder:folder});
}

const postDeleteFile = async (req,res) =>{

  try{
  const folderId = parseInt(req.params.folderId);
  const fileId = parseInt(req.params.fileId);

  const file = await prisma.file.findFirst({
    where:{
      id:fileId,
      userId:req.user.id,
      folderId:folderId
    }
  })
  if(!file){
    return res.status(404).send('file not found');
  }

  await fs.unlink(file.filePath);

  await prisma.file.delete({
    where:{
      id:fileId
    }
  });
  res.redirect('/folder/'+folderId);
  }catch(err){
    console.error(err);
    res.status(500).send('Error deleting file');
  } 
  
}

export default {
    getHome,
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    postFileUpload,
    getFolders,
    postCreateFolder,
    getOneFolder,
    postDeleteFile
}