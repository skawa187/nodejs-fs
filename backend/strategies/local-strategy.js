import passport from "passport";
import { Strategy } from "passport-local";
import { testUsers } from "../utils/const.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const user = testUsers.find((user) => user.id === id);
        if (!user) throw new Error('Can not find the user to deserialize.');
        // console.log(`Deserializing user id ${id}`);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new Strategy((username, password, done) => {
        try {
            const user = testUsers.find((user) => user.username === username);
            if (!user) throw new Error('User not found.');
            if (user.password !== password) throw new Error('Invalid login information.');
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport;