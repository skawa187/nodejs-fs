import express from "express";
import path from 'path';
import posts from './routes/posts.js';
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import connectDb, { syncDb } from './db.js';

const PORT = process.env.NODE_PORT || 8000

// connectDb();
// syncDb();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);
app.use('/api/posts', posts);

// Errors
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'public', 'index.html'));
})

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About</h1>');
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));