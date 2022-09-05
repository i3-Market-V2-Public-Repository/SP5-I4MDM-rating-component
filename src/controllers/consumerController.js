/*
 * Copyright (c) 2022
 * Telesto Technologies
 *
 * This program and the accompanying materials are made
 * available under the terms of the EUROPEAN UNION PUBLIC LICENCE v. 1.2
 * which is available at https://gitlab.com/i3-market/code/wp3/t3.3/nodejs-tokenization-treasury-api/-/blob/master/LICENCE.md
 *
 *  License-Identifier: EUPL-1.2
 *
 *  Contributors:
 *    George Benos (Telesto Technologies)
 */
import agreementService from "../services/agreementService";
import consumerService from "../services/consumerService"

export class consumerController{


    getAllRatingsbyConsumer = async function getAllRatingsbyConsumer(req, res,next){
        const did = req.params.did
        try{
            const ratings = await consumerService.getAllRatingsbyConsumer(did)
            return res.json({
                ratings:ratings
            })
        }catch(err){
            console.log(`[ConsumerController] Error retrieving ratings for consumer with did ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    getAgreementsByConsumer = async function getAgreementsByConsumer(req, res, next) {
        const pk = req.params.pk
        try{
            const  agreements = await agreementService.getAgreementsByConsumer(pk, req.raw_access_token)
            return res.json({
                agreements: agreements
            })
        }catch(err){
            console.log(`ConsumerController] Error retrieving agreements for consumer with pk: ${pk}`)
            return res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default new consumerController() 