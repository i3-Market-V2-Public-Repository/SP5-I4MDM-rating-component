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

import ratingService from "../services/ratingService"

export class RatingController{

    getRating = async function getRating(req, res, next) {
        const id = req.params.id
        const  rating = await ratingService.getRating(id).catch((err) =>{
            console.log("[RatingController] Error retrieving rating: "+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
        return res.json({
            rating: rating
        })
    }

    getAllRatings = async function getAllRatings(req, res, next) {
        const  ratings = await ratingService.getAllRatings().catch((err) =>{
            console.log("[ConsumerController] Error retrieving all ratings")
            return res.status(500).json({error: err.message})
        })
        return res.json({
            ratings: ratings
        })
    }

    createRating = async function createRating(req, res, next){
        const ratingObj = req.body
        const rating = await ratingService.createRating(ratingObj).catch(err =>{
            console.log("[RatingController] Error creating new rating: "+ err.message)
            return res.status(err.status).json({error: err.message})
        })
        return res.status(201).json({
            rating: rating
        })
    }

    editRating = async function editRating(req, res, next){
        const ratings = req.body.subRatings || []
        const msg = req.body.msg || ""
        const id = req.params.id
        const rating = await ratingService.editRating(id, ratings, msg).catch(err =>{
            console.log(`[RatingController] Error Editing provider with did ${id}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
        return res.status(200).json({
            rating: rating
        })
    }

    deleteRating = async function deleteRating(req, res, next){
        const id = req.params.id
        const rating = await ratingService.deleteRating(id).catch(err =>{
            console.log(`[RatingController] Error deleting rating with id: ${id}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
        return res.status(200).json({
            rating: rating
        })
    }

    respondToRating = async function respondToRating(req, res, next){
        const id = req.params.id
        const response = req.body.response
        const rating = await ratingService.respondToRating(id, response).catch(err =>{
            console.log(`[RatingController] Error responding to rating with id: ${id}: `+ err.message)
            return res.status(500).json({error: err.message})
        })
        if (!rating) return res.status(422).json({error: `Rating with id: ${id} does not exist`})
        return res.status(200).json({
            rating: rating
        })
    }
}

export default new RatingController()