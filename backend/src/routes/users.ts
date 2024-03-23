/*res.json eventually calls res.send, but before that it:

respects the json spaces and json replacer app settings
ensures the response will have utf-8 charset and application/json Content-Type
*/

import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
/* 1. we are checking if user already exists using email
2. If not then we will save user in mongoDB and while saving the user we will encrypt password through code in user.ts file.
3. After saving user we will create a JWT for user and save userId inside it. JWT_SECRET_KEY  is in env file.
4. After that we will put this JWT in Cookie and send 200 Success response back.
*/
router.post("/register", [
    check("firstName","First Name is required").isString(),
    check("lastName","Last name is required").isString(),
    check("email","Enmail is required").isString(),
    check("password","Password with 6 or more characters required").isLength({min:6}),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if(user) {
            return res.status(400).json({message: "User already exists"});
        }

        user = new User(req.body)
        await user.save();

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d"});
        res.cookie("auth_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 86400000, });
        return res.sendStatus(200);
    }
    catch ( error ) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
});

export default router;