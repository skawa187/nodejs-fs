import express from 'express';
import path from 'node:path';

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('custom', 'cookie', { maxAge: 60000 * 60 });
    res.sendFile(path.resolve('public', 'index.html'));
});

router.get('/about', (req, res) => {
    console.log(req.cookies);
    res.status(200).send('<h1>About</h1>');
});


export default router;