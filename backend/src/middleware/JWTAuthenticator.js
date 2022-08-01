import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
export default function authenticateJWT(req, res, next){

    const authHeader = req.headers.id_token
    if (authHeader) {
        const token = authHeader
        // @ts-ignore
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({error : err.message})
            }
            req.id_token = user;
            next();
        });
    } else {
        return res.status(401).json({error: "No logged in user"})
    }
};