import got from "got"
import dotenv from "dotenv"

dotenv.config()

export class AgreementService {

    getAgreementsByConsumer = async function getAgreementsByConsumer(consumer_pk, access_token=undefined){
        const finalURL = process.env.AGREEMENT_URL + "check_agreements_by_consumer/" + consumer_pk
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
        const retlist = []
        for(let agreement in body){
            // @ts-ignore
            if (agreement.state === 4)    retlist.push(agreement)   //state is terminated (completed)
        }
        return retlist
    }
    
    getAgreementsByProvider = async function getAgreementsByProvider(provider_pk, access_token=undefined){
        const finalURL = process.env.AGREEMENT_URL + "check_agreements_by_provider/" + provider_pk
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
        const retlist = []
        for(let agreement in body){
            // @ts-ignore
            if (agreement.state === 4)    retlist.push(agreement)   //state is terminated (completed)
        }
        return retlist
    }
    
    getAgreementbyID = async function getAgrrementbyID(agreement_id, access_token=undefined){
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