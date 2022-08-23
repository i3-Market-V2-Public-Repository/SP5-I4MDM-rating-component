import got from "got"
import dotenv from "dotenv"

dotenv.config()

export class AgreementService {

    getAgreementsByConsumer = async function getAgreementsByConsumer(consumer_id, access_token=null){
        const finalURL = process.env.AGREEMENT_URL + "check_agreements_by_consumer/" + consumer_id+ "/true" 
        console.log(finalURL)
        const res = await got.get(finalURL, {
            headers:{
                // @ts-ignore
                access_token: access_token
            }
        }).catch(err => {
            console.log("[agreementService] ", err.message)
            throw err
        })
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved ${body.length} agreements for consumer ${body[0].cosumerId}`)
        return body
    }
    
    getAgreementsByProvider = async function getAgreementsByProvider(provider_id, access_token=null){
        const finalURL = process.env.AGREEMENT_URL + "check_agreements_by_provider/" + provider_id+ "/true" 
        const res = await got.get(finalURL, {
            headers:{
                // @ts-ignore
                access_token: access_token
            }
        }).catch(err => {
            console.log("[agreementService] ", err.message)
            throw err
        })
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved ${body.length} agreements for provider ${body[0].providerId}`)
        return body
    }
    
    getAgreementbyID = async function getAgrrementbyID(agreement_id, access_token=null){
        const finalURL = process.env.AGREEMENT_URL + "get_agreement/" + agreement_id 
        const res = await got.get(finalURL, {
            headers:{
                // @ts-ignore
                access_token: access_token
            }
        }).catch(err => {
            console.log("[agreementService] ", err.message)
            throw err
        })
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved agreement with id ${body.agreementId}`)
        return body
    }
}

export default new AgreementService()