/*
 * Copyright (c) 2020-2022 in alphabetical order:
 * Telesto Technologies
 *
 * This program and the accompanying materials are made
 * available under the terms of the EUROPEAN UNION PUBLIC LICENCE v. 1.2
 *
 *  License-Identifier: EUPL-1.2
 *
 *  Contributors:
 *    George Benos (Telesto Technologies)
 *
 */

import { MongoDatastore } from "../../datastores/mongoDatastore"
import dotenv from "dotenv"
import assert from 'assert'
import {ConsumerService} from "../../services/consumerService"
import {RatingService} from "../../services/ratingService"
import providerService from "../../services/providerService"

dotenv.config()

describe("providerService test suite", () => {

    const CONSUMER_1 ={
        did:"0x0987654321"
    }

    const CONSUMER_2 ={
        did:"0x0987656789"
    }

    const PROVIDER_1 = {
        did:"0x1234567890",
    }

    const PROVIDER_TEMP = {
        did:"0x000000000",
    }

    let ratingService
    let consumerService
    let db

    /**
     * Reset DB before start testing
     */
    before(async () => {
        db = new MongoDatastore(process.env.MONGO_URL, {
            useNewUrlParser: true,
            userFindAndModify: false,
            useUnifiedTopology: true
        })

        await new Promise(r => setTimeout(r, 1000));
        ratingService = RatingService.init(db)
        consumerService = ConsumerService.init(db)
    })
    
    it("should create a new rating",
        async () => {
            const rating = await ratingService.createRating({byConsumer:CONSUMER_1.did, forProvider:PROVIDER_1.did, onTransaction:"trans15", subRatings: [4,4,5,5], msg:"it just works"})
            const ratings = await ratingService.getAllRatings()
            assert.equal(ratings.length, 2, "Did not create new rating properly")

            await ratingService.deleteRating(rating.id)
        }
    );

    it("should get all ratings for consumer and only them",
        async () => {
            //rating by another consumer
            await ratingService.createRating({byConsumer:CONSUMER_2.did, forProvider:PROVIDER_TEMP.did, onTransaction:"trans16", subRatings: [5,5,5,5], msg:"it just works"})
            
            const ratings = await consumerService.getAllRatingsbyConsumer(CONSUMER_2.did)
            assert.equal(ratings.length, 1, "Did not get consumer ratings properly")
        }
    );

    it("should edit a pre-existing rating",
        async () => {
            const ratings = await providerService.getAllRatingsforProvider(PROVIDER_TEMP.did)
            const edited_rating = await ratingService.editRating(ratings[0].id, [4,4,4,4], "edited")

            assert.equal(edited_rating.comment, "edited", "Did not update rating message properly")
            assert.deepStrictEqual(edited_rating.subRatings, [4,4,4,4], "Did not update subRatings Properly")
        }
    );
})