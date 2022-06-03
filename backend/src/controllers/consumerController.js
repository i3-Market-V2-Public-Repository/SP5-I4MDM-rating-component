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
        const did = req.params.did
        const  consumer = await consumerService.getConsumer(did).catch((err) =>{
            console.log("[ConsumerController] Error retrieving consumer: "+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
        return res.json({
            consumer: consumer
        })
    }

    createConsumer = async function createConsumer(req, res, next){
        const consumerObj = req.body
        const consumer = await consumerService.createConsumer(consumerObj).catch(err =>{
            console.log("[ConsumerController] Error creating new consumer: "+ err.message)
            return res.status(500).json({error: err.message})
        })
        return res.status(201).json({
            consumer:consumer
        })
    }

    editConsumer = async function editConsumer(req, res, next){
        const consumerObj = req.body
        const did = req.params.did
        const consumer = await consumerService.editConsumer(did, consumerObj.email).catch(err =>{
            console.log(`[ConsumerController] Error Editing consumer with did ${did}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
        return res.status(200).json({
            consumer:consumer
        })
    }

    deleteConsumer = async function deleteConsumer(req, res, next){
        const did = req.params.did
        const consumer = await consumerService.deleteConsumer(did).catch(err =>{
            console.log(`[ConsumerController] Error deleting consumer with did ${did}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!consumer) return res.status(404).json({error: `Consumer with did ${did} does not exist`})
        return res.status(200).json({
            consumer:consumer
        })
    }

    getAllConsumers = async function getAllConsumers(req, res, next) {
        const  consumers = await consumerService.getAllConsumers().catch((err) =>{
            console.log("[ConsumerController] Error retrievingall consumers")
            return res.status(500).json({error: err.message})
        })
        return res.json({
            consumers: consumers
        })
    }

    getAllRatingsbyConsumer = async function getAllRatingsbyConsumer(req, res,next){
        const did = req.params.did
        const ratings = await consumerService.getAllRatingsbyConsumer(did).catch(err =>{
            console.log(`[ConsumerController] Error retrieving ratings for consumer with did ${did}: `+ err.message)
        })
        return res.json({
            ratings:ratings
        })
    }

}

export default new consumerController() 