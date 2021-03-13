import {NextFunction, Request, Response} from "express";
import * as jwt from 'jsonwebtoken';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.JWT_PRIVATE, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      req.token = token;
      next();
    });
}