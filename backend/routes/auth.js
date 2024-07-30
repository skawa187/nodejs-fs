import express from 'express';
import passport from '../strategies/local-strategy.js';

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => { 
    res.sendStatus(200);
});

router.post('/logout', (req, res) => {
    if (!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if (err) return res.sendStatus(500);
        res.sendStatus(200);
    })
});

router.get('/status', (req, res) => {
    console.log(req.user);
    return req.user ? res.send(req.user) : res.status(401).json({msg: 'Unauthorized user'});
});

export default router;