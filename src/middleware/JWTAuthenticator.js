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
            //decode claims if present
            if (req.id_token.verified_claims.untrusted[0]){
                const enc_claim = result.payload.verified_claims.untrusted[0]
                const dec_claim = jose.decodeJwt(enc_claim)
                //req.id_token.verified_claims.untrusted[0] = dec_claim
                req.id_token.username = dec_claim.vc.credentialSubject.username
            }
            next();
        }).catch( err=>{
            console.log("JWTerror: "+err.message)
            return res.status(403).json({JWTerror : err.message})
        });
    } else {
        return res.status(401).json({error: "No logged in user"})
    }
};
