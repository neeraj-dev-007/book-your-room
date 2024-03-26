import { NextFunction, Request, Response} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//adding userId to request so that when express forwards request to our auth handler to validate token then we get acess to it and 
// send it to frontend
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token) 
        return res.status(401).json({message: "Unauthorized"});

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
            req.userId = (decoded as JwtPayload).userId;
            //so that express can execute the next steps after our middleware logic.
            next();
        }
        catch( error ) {
            return res.status(401).json({message: "Unauthorized"});
        }
}

export default verifyToken;