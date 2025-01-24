import passport from "passport";
import {Strategy as JWTStrategy} from 'passport-jwt'
import { ExtractJwt } from "passport-jwt";
import User from "../../modal/user/user.js";
import dotenv from 'dotenv';

dotenv.config();


const opts=
{
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :`${process.env.SECRET}`,

}

passport.use(new JWTStrategy(opts, async function(payLoad, done)
{
    try {
        
        // payload contains the user information 
        // using the payload we are trying to find the user in DB
        console.log(payLoad);
        
        const user= await User.findById(payLoad._id);
        if(!user)
            {
                return done(null, false);  
            }else
            {
                return done(null, user);
            }
            
        } catch (error) {
            console.log(error);
         return done(null, false);
        }
        
    }))
export default passport;