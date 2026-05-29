import multer from 'multer';
import path from "node:path";

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/');
    },

    filename:(req,file,cb) =>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null,uniqueName);
    }

});

const allowedMimeTypes = [
    "image/png",

    "image/jpeg",

    "image/webp",

    "application/pdf",

    "text/plain",
]

const fileFilter = (req,file,cb) => {
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type'),false)
    }
};

const upload = multer({ storage,
    limits: {
        fileSize:1*1024*1024
    },
    fileFilter
});

export default upload;