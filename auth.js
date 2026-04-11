import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Person from './models/person.js';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
         const user = await Person.findOne({username});
         if (!user) {
             return done(null, false, {message: 'User not found'});
         }
         const isMatch = await user.comparePassword(password);
         if (isMatch) {
             return done(null, false, {message: 'Invalid password'});
         }
         return done(null, user);
        } catch (error) {
         return done(error, false, {message: 'Internal server error'});
        }
     }
 ));

 app.use(passport.initialize());

 export const auth = passport.authenticate('local', { session: false });