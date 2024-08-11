import express from "express";
import rootRouter from './routes/root.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDb, syncDb } from './db.js';
import { createClient } from 'redis';
import RedisStore from "connect-redis";

const PORT = process.env.NODE_PORT || 3000;
process.env.TZ = 'Europe/Warsaw';
// Session config
const rs = await createClient({ url: process.env.REDIS_URL }).on('error', err => console.log('Redis Client Error', err)).connect();
const sessionOpts =     {
    store: new RedisStore({ client: rs }),
    secret: process.env.NODE_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 360, }
};

// DB Sync
syncDb();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use('/', rootRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

console.log(`Time is ${ new Date().toString() }`);
app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));