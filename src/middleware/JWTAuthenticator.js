import dotenv from 'dotenv'
import * as jose from 'jose'

dotenv.config()
export default function authenticateJWT(req, res, next){
    
    // @ts-ignore
    const JWKS = jose.createRemoteJWKSet(new URL(process.env.OIDC_URL + process.env.JWKS_PATH))

    const id_token = req.headers.id_token
    const access_token = req.headers.access_token
    if (id_token) {
        jose.jwtVerify(id_token, JWKS).then( result => {
            req.id_token = result.payload
            req.raw_id_token = id_token
            req.raw_access_token = access_token
            next();
        }).catch( err=>{
            console.log("JWTerror: "+err.message)
            return res.status(403).json({JWTerror : err.message})
        });
    } else {
        return res.status(401).json({error: "No logged in user"})
    }
};
