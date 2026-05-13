import express from "express";
import session from "express-session";
import prisma from '../lib/prisma.js'
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "passport";
import routes from "./routes/appRoutes.js"
import './config/passport.js'

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },

    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
  res.locals.user = req.user
  next();
})

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});