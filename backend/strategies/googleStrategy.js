import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleUser from "../models/googleUserModel.js";

passport.serializeUser((user, cb) => {
    const { id , displayName, email, photo } = user;
    cb(null, { id , displayName, email, photo });
});

passport.deserializeUser(async (user, cb) => {
    try {
        const dbUser = await GoogleUser.findByPk(user.id);
        return dbUser ? cb(null, user) : cb(null, null);
    } catch (err) {
        cb(err, null);
    }
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/api/auth/google/redirect',
        scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid'],
    }, async (accessToken, refreshToken, profile, cb) => {
        try {
            const dbUser = await GoogleUser.findOne({ where: { googleId: profile.id } });
            if (!dbUser) {
                const newUser = GoogleUser.build({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails.find(el => el.value)?.value,
                    photo: profile.photos.find(el => el.value)?.value,
                    provider: profile.provider,
                    refreshToken: refreshToken,
                });
                newUser.save();
                return cb(null, newUser);
            }
            return cb(null, dbUser);
        } catch (err) {
            console.log('Google Strategy error ', err);
            return cb(err, null);
        }
    })
);

export default passport;