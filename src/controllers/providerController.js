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
import agreementService from "../services/agreementService"
import providerService from "../services/providerService"

export class providerController{
    
    getAllRatingsforProvider = async function getAllRatingsforProvider(req, res,next){
        const did = req.params.did
        try{
            const ratings = await providerService.getAllRatingsforProvider(did)
            return res.json({
                ratings:ratings
            })
        }catch(err){
            console.log(`[ProviderController] Error retrieving ratings for provider with did ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    getAgreementsByProvider = async function getAgreementsByProvider(req, res, next) {
        const pk = req.params.pk
        try{
            const  agreements = await agreementService.getAgreementsByProvider(pk, req.raw_access_token)
            return res.json({
                agreements: agreements
            })
        }catch(err){
            console.log(`[ProviderController] Error retrieving agreements for provider with pk ${pk}: `+err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    getProviderRating = async function getProviderRating(req, res, next){
        const did = req.params.did
        try{
            const rating = await providerService.getProviderRating(did)
            return res.json({
                totalRating: rating
            })
        }catch(err){
            console.log(`[ProviderController] Error calculating total rating for provider ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default new providerController() 