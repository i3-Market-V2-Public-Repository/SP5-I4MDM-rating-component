import dotenv from 'dotenv'
import * as jose from 'jose'

dotenv.config()
export default function authenticateJWT(req, res, next){

    // @ts-ignore
    const JWKS = jose.createRemoteJWKSet(new URL(process.env.OIDC_URL + process.env.JWKS_PATH))

    const authHeader = req.headers.id_token
    if (authHeader) {
        const token = authHeader
        jose.jwtVerify(token, JWKS).then( result => {
            req.id_token = result.payload;
            req.raw_token = token
            next();
        }).catch( err=>{
            return res.status(403).json({error : err.message})
        });
    } else {
        return res.status(401).json({error: "No logged in user"})
    }
};
