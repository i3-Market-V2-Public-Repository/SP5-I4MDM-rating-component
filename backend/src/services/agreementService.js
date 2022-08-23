import got from "got"
import dotenv from "dotenv"

dotenv.config()

export function getAgreementsByConsumer(consumer_id, access_token=null){
    const finalURL = process.env.AGREEMENT_URL + "check_aggreements_by_consumer/" + consumer_id+ "/true" 
    got.get(finalURL, {
        headers:{
            // @ts-ignore
            access_token: access_token
        }
    }).then(res =>{
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved ${body.length} agreements for consumer ${body[0].cosumerId}`)
        return body
    }).catch(err => {
        console.log("[agreementService] ", err.message)
        //throw err
    })
}

export function getAgreementsByProvider(provider_id, access_token=null){
    const finalURL = process.env.AGREEMENT_URL + "check_aggreements_by_provider/" + provider_id+ "/true" 
    got.get(finalURL, {
        headers:{
            // @ts-ignore
            access_token: access_token
        }
    }).then(res =>{
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved ${body.length} agreements for provider ${body[0].providerId}`)
        return body
    }).catch(err => {
        console.log("[agreementService] ", err.message)
        //throw err
    })
}

export function getAgrrementbyID(agreement_id, access_token=null){
    const finalURL = process.env.AGREEMENT_URL + "get_agreement/" + agreement_id 
    got.get(finalURL, {
        headers:{
            // @ts-ignore
            access_token: access_token
        }
    }).then(res =>{
        let body = JSON.parse(res.body);
        console.log(`[agreementService] Retrieved agreement with id ${body.agreementId}`)
        return body
    }).catch(err => {
        console.log("[agreementService] ", err.message)
        //throw err
    })
}