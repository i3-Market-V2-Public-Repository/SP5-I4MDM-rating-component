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
import { sendNotification, ACTIONS } from "../services/notificationService"
import dotenv from "dotenv"

dotenv.config
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

    getRatingbyAgreement = async function getRating(req, res, next) {
        const agreement_id = req.params.id
        try{
            const  rating = await ratingService.getRatingbyAgreement(agreement_id)
            if (!rating) return res.status(404).json({error: `Rating with onTransaction: ${agreement_id} does not exist`})
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
            console.log("[RatingController] Error retrieving all ratings")
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    createRating = async function createRating(req, res, next){
        const ratingObj = req.body
        //Auth stuff: A consumer can only create a rating as himself
        console.log("Chkecking JWT decoded user: "+req.id_token.sub)
        if (req.id_token.sub !== ratingObj.byConsumer){
            return (res.status(403).json({error: "You can only create ratings where you are consumer"}))
        }
        try{
            console.log("creating rating...")
            const rating = await ratingService.createRating(ratingObj)
            //send a notification that a rating was created
            if (process.env.NOTIFICATION_URL){
                console.log("Posting notification on "+process.env.NOTIFICATION_URL)
                sendNotification( 
                    ratingObj.byConsumer,
                    ratingObj.forProvider,
                    ACTIONS.new,
                    `A new rating has been posted by user ${ratingObj.byConsumer} for transaction ${ratingObj.onTransaction}`,
                    req.raw_id_token
                )
            }
            else{
                console.log("Notification URL not found")
            }
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

            if (process.env.NOTIFICATION_URL){
                sendNotification(
                    rating.byConsumer,
                    rating.forProvider,
                    ACTIONS.edit,
                    `A previous rating has been edited by user ${rating.byConsumer} for transaction ${rating.onTransaction}`,
                    req.raw_id_token
                )
                return res.status(200).json({
                    rating: rating
                })
            }
        }catch(err){
            console.log(`[RatingController] Error Editing provider with did ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    deleteRating = async function deleteRating(req, res, next){
        const id = req.params.id
        //Auth stuff: No one has access to this function (use debugging flag to access)
        if (!process.env.debug){
            return (res.status(403).json({error: "You are not authorized to delete ratings"}))
        }
        try{
        const rating = await ratingService.deleteRating(id)
            if (!rating) return res.status(404).json({error: `Rating with id: ${id} does not exist`})

            if (process.env.NOTIFICATION_URL){
                sendNotification(
                    "Rating Service Administrator",
                    rating.forProvider,
                    ACTIONS.deleted,
                    `A previous rating has been deleted by a platform administrator for transaction ${rating.onTransaction}`,
                    req.raw_id_token
                )
                return res.status(200).json({
                    rating: rating
                })
            }
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

            if (process.env.NOTIFICATION_URL){
                sendNotification(
                    rating.forProvider,
                    rating.byConsumer,
                    ACTIONS.edit,
                    `A response on your rating for transaction ${rating.onTransaction} was posted by user ${rating.forProvider}`,
                    req.raw_id_token
                )
            }
            return res.status(200).json({
                rating: rating
            })
        }catch(err){
            console.log(`[RatingController] Error responding to rating with id: ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    isAgreementRated = async function isAgreementRated(req, res, next){
        const id = req.params.id
        try{
            let isRated = await ratingService.isAgreementRated(id)
            return res.status(200).json(isRated)
        }catch(err){
            console.log(`[RatingController] Error checking agreement rated: ${id}: `+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    } 
}

export default new RatingController()