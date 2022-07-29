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
import consumerService from "../services/consumerService"

export class consumerController{

    getConsumer = async function getConsumer(req, res, next) {
        const did = req.params.did;
        try{
            const consumer = await consumerService.getConsumer(did)
            if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
            return res.json({
                consumer: consumer
            })
        }catch(err){
            console.log("[ConsumerController] Error retrieving consumer: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    createConsumer = async function createConsumer(req, res, next){
        const consumerObj = req.body
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!req.id_token.debug){
            return (res.status(403).json({error: "You are not authorized to create new users"}))
        }
        try{  
            const consumer = await consumerService.createConsumer(consumerObj)
            return res.status(201).json({
                consumer:consumer
            })
        }catch(err){
            console.log("[ConsumerController] Error creating new consumer: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    editConsumer = async function editConsumer(req, res, next){
        const consumerObj = req.body
        const did = req.params.did
        //Auth stuff: A user can only edit themselves
        if (req.id_token.did !== did){
            return (res.status(403).json({error: "You are not authorized to edit this user"}))
        }
        try{
            const consumer = await consumerService.editConsumer(did, consumerObj.email)
            if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
            return res.status(200).json({
                consumer:consumer
            })
        }catch(err){
            console.log(`[ConsumerController] Error Editing consumer with did ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    deleteConsumer = async function deleteConsumer(req, res, next){
        const did = req.params.did
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!req.id_token.debug){
            return (res.status(403).json({error: "You are not authorized to delete users"}))
        }
        try{
            const consumer = await consumerService.deleteConsumer(did)
            if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
            return res.status(200).json({
                consumer:consumer
            })
        }catch(err){
            console.log(`[ConsumerController] Error deleting consumer with did ${did}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    getAllConsumers = async function getAllConsumers(req, res, next) {
        try{
        const  consumers = await consumerService.getAllConsumers()
            return res.json({
                consumers: consumers
            })
        }catch(err){
            console.log("[ConsumerController] Error retrieving all consumers")
            return res.status(err.status || 500).json({error: err.message})
        }
    }

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

}

export default new consumerController() 