import passport from "passport";
import { Strategy } from "passport-local";
import User from '../models/userModel.js';
import { compareSync } from "bcrypt";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        if (!user) throw new Error('Can not find the user to deserialize.');
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const dbUser = await User.findOne({where: { username }});
            if (!dbUser) throw new Error (`User ${username} not found`);
            if (!compareSync(password, dbUser.password)) throw new Error('Incorrect password');
            // if (dbUser.password !== password) throw new Error('Incorrect password');
            done(null, dbUser.toJSON());
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport;