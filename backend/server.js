import express from "express";
import rootRouter from './routes/root.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import connectDb, { syncDb } from './db.js';

const PORT = process.env.NODE_PORT || 8000

// connectDb();
// syncDb();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session(
    {
        secret: process.env.NODE_SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 60000 * 60, }
    }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use('/', rootRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));