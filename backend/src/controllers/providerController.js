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
import providerService from "../services/providerService"

export class providerController{

    getProvider = async function getProvider(req, res, next) {
        const did = req.params.did
        const  provider = await providerService.getProvider(did).catch((err) =>{
            console.log("[ProviderController] Error retrieving provider: "+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!provider) return res.status(404).json({error: `Provider with did ${did} does not exist`})
        return res.json({
            provider: provider
        })
    }

    createProvider = async function createProvider(req, res, next){
        const providerObj = req.body
        const provider = await providerService.createProvider(providerObj).catch(err =>{
            console.log("[ProviderController] Error creating new provider: "+ err.message)
            return res.status(500).json({error: err.message})
        })
        return res.status(201).json({
            provider: provider
        })
    }

    editProvider = async function editProvider(req, res, next){
        const providerObj = req.body
        const did = req.params.did
        const provider = await providerService.editProvider(did, providerObj.email).catch(err =>{
            console.log(`[ProviderController] Error Editing provider with did ${did}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!provider) return res.status(404).json({error: `Provider with did ${did} does not exist`})
        return res.status(200).json({
            provider: provider
        })
    }

    deleteProvider = async function deleteProvider(req, res, next){
        const did = req.params.did
        const provider = await providerService.deleteProvider(did).catch(err =>{
            console.log(`[ProviderController] Error deleting provider with did ${did}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!provider) return res.status(404).json({error: `Provider with did ${did} does not exist`})
        return res.status(200).json({
            provider: provider
        })
    }

    getAllProviders = async function getAllProviders(req, res, next) {
        const  providers = await providerService.getAllProviders().catch((err) =>{
            console.log("[ProviderController] Error retrieving all providers")
            return res.status(500).json({error: err.message})
        })
        return res.json({
            providers: providers
        })
    }

    getAllRatingsforProvider = async function getAllRatingsforProvider(req, res,next){
        const did = req.params.did
        let ratings
        try{
            ratings = await providerService.getAllRatingsforProvider(did)
        }catch(err){
            console.log(`[ProviderController] Error retrieving ratings for provider with did ${did}: `+ err.message)
            return res.status(err.status).json({error: err.message})
        }
        return res.json({
            ratings:ratings
        })
    }

    respondtoRating = async function respondtoRating(req, res, next){
        const id = req.params.id
        const response = req.body.response
        const rating = await providerService.respondtoRating(id, response).catch(err =>{
            console.log(`[ProviderController] Error responding to rating ${id}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        return res.json({
            rating: rating
        })
    }

    getProviderRating = async function getProviderRating(req, res, next){
        const did = req.params.did
        let rating
        try{
            rating = await providerService.getProviderRating(did)}
        catch(err){
            console.log(`[ProviderController] Error calculating total rating for provider ${did}: `+ err.message)
            return res.status(err.status).json({error: err.message})
        }
        return res.json({
            totalRating: rating
        })
    }

}

export default new providerController() 