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
        try{
            const  rating = await ratingService.getRating(id)
            if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
            return res.json({
                rating: rating
            })
        }catch(err){
            console.log("[RatingController] Error retrieving rating: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    getAllRatings = async function getAllRatings(req, res, next) {
        try{
            const  ratings = await ratingService.getAllRatings()
            return res.json({
                ratings: ratings
            })
        }catch(err){
            console.log("[ConsumerController] Error retrieving all ratings")
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    createRating = async function createRating(req, res, next){
        const ratingObj = req.body
        //Auth stuff: A consumer can only create a rating as himself
        if (req.id_token.sub !== ratingObj.byConsumer){
            return (res.status(403).json({error: "You can only create ratings where you are consumer"}))
        }
        try{
            const rating = await ratingService.createRating(ratingObj)
            return res.status(201).json({
                rating: rating
            })
        }catch(err){
            console.log("[RatingController] Error creating new rating: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    editRating = async function editRating(req, res, next){
        const ratings = req.body.subRatings || []
        const msg = req.body.msg || ""
        const id = req.params.id
        try{
            //Auth stuff: A consumer can only edit a rating of their own
            let rating = await ratingService.getRating(id)
            if (!rating){
                return (res.status(404).json({error: `Rating with id=${id} does not exist`}))
            }
            else if (rating.byConsumer !== req.id_token.sub){
                return (res.status(403).json({error: "You are not authorized to edit this rating"}))
            }
            rating = await ratingService.editRating(id, ratings, msg)
            if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
            return res.status(200).json({
                rating: rating
            })
        }catch(err){
            console.log(`[RatingController] Error Editing provider with did ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    deleteRating = async function deleteRating(req, res, next){
        const id = req.params.id
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!req.id_token.debug){
            return (res.status(403).json({error: "You are not authorized to delete ratings"}))
        }
        try{
        const rating = await ratingService.deleteRating(id)
            if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})
            return res.status(200).json({
                rating: rating
            })
        }catch(err){
            console.log(`[RatingController] Error deleting rating with id: ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    respondToRating = async function respondToRating(req, res, next){
        const id = req.params.id
        const response = req.body.response
        try{
            //Auth stuff: A provider can only respond to a rating that refers to him
            let rating = await ratingService.getRating(id)
            if (!rating){
                return (res.status(404).json({error: `Rating with id=${id} does not exist`}))
            }
            else if (rating.forProvider !== req.id_token.sub){
                return (res.status(403).json({error: "You are not authorized to respond to this rating"}))
            }
            rating = await ratingService.respondToRating(id, response)
            if (!rating) return res.status(422).json({error: `Rating with id: ${id} does not exist`})
            return res.status(200).json({
                rating: rating
            })
        }catch(err){
            console.log(`[RatingController] Error responding to rating with id: ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default new RatingController()