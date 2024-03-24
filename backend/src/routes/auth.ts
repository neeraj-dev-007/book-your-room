/* we are creating login route separately as we are not directly interacting with user here unlike register user. */

import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";

const router = express.Router();


router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({min:6})
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({
            email
        });

        if(!user) {
            return res.status(400).json({message:"Invalid Credentials"}); 
        }
        /*we can't decrypt password once it's encrypted so we use bcrypt.compare to compare the 2 passwords.
        we return the same message "Invalid Credentials" for both email and password mismatch so that the 
        malicious entity doesn't get to know that the email does exist. If we return the error Password Mismatch then
        that gives a clue that the email does exist in database so we return the same error instead.
        */
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"});
        }
       
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {expiresIn: "1d"});
        res.cookie("auth_token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge:86400000,});
        //we are returning userId to frontend as it cannot access jwt in cookie so it can use this userId to communicate with backend.
        return res.status(200).json({userId: user.id});
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error!"});
    }

});

export default router;