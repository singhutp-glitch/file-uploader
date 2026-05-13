import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

passport.use(
    new LocalStrategy({
        usernameField:'user_name',
        passwordField:'password',
    },async (username, password, done) => {
        try{
            const user = await prisma.user.findUnique(
                {
                    where:{
                        username:username,
                    },
                }
            )
            if(!user){
                return done(null,false,{message:'invalid username'});
            }
            const match = await bcrypt.compare(password,user.password);

            if(!match){
                return done(null,false,{message:'incorrect password'});
            }

            done(null,user);
        }catch(err){
            done(err);
        }
    })
);

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:id,
            },
        })

        done(null,user);
    }catch(err){
        done(err);
    }

});

export default passport;