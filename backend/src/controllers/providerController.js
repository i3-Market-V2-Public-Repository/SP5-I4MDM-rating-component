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
        try{
            const  provider = await providerService.getProvider(did)
            if (!provider) return res.status(404).json({error: `Provider with did ${did} does not exist`})
            return res.json({
                provider: provider
            })
        }catch(err){
            console.log("[ProviderController] Error retrieving provider: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    createProvider = async function createProvider(req, res, next){
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!process.env.debug){
            return (res.status(403).json({error: "You are not authorized to create new users"}))
        }
        const providerObj = req.body
        try{
            const provider = await providerService.createProvider(providerObj)
            return res.status(201).json({
                provider: provider
            })
        }catch(err){
            console.log("[ProviderController] Error creating new provider: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    editProvider = async function editProvider(req, res, next){
        const providerObj = req.body
        const did = req.params.did
        //Auth stuff: A user can only edit themselves
        if (req.id_token.sub !== did){
            return (res.status(403).json({error: "You are not authorized to edit this user"}))
        }
        try{
            const provider = await providerService.editProvider(did, providerObj.email)
            if (!provider) return res.status(404).json({error: `Provider with did ${did} does not exist`})
            return res.status(200).json({
                provider: provider
            })
        }catch(err){
            console.log(`[ProviderController] Error Editing provider with did ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    deleteProvider = async function deleteProvider(req, res, next){
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!process.env.debug){
            return (res.status(403).json({error: "You are not authorized to delete users"}))
        }
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
        try{
            const  providers = await providerService.getAllProviders()
            return res.json({
                providers: providers
            })
        }catch(err){
            console.log("[ProviderController] Error retrieving all providers")
            return res.status(err.status || 500).json({error: err.message})
        }
    }

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