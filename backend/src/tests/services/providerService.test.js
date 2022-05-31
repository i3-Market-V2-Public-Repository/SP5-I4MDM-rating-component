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
import mongoose from "mongoose"
import {ProviderService} from "../../services/providerService"
import {RatingService} from "../../services/ratingService"

dotenv.config()

describe("providerService test suite", () => {

    const PROVIDER_1 = {
        did:"0x1234567890",
        name:"Prov Ider",
        email: "provider@email.com"
    }

    const CONSUMER_1 ={
        did:"0x0987654321",
        name:"Summer Conne",
        email: "consumer@email.com"
    }

    const CONSUMER_2 = {
        did:"0x9876556789",
        name:"Summer Conne the second",
        email: "consumer@email.com"
    }

    const RATINGS = [
        {from:CONSUMER_1.did, to:PROVIDER_1.did, ratings: [5,5,5,5], msg:"it just works"},
        {from:CONSUMER_2.did, to:PROVIDER_1.did, ratings: [4,4,4,4], msg:"it still just works"},
        {from:CONSUMER_1.did, to:PROVIDER_1.did, ratings: [5,5,5,4], msg:"still going on"},
        {from:CONSUMER_2.did, to:PROVIDER_1.did, ratings: [1,2,1,0], msg:"not good"},
    ]

    let ratingService
    let providerService
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
        providerService = ProviderService.init(db)
    })

    it("should calculate the average rating of a provider based on all their ratings",
        async () => {
            for (let i=0; i<RATINGS.length; i++){
                await ratingService.createRating(RATINGS[i])
            }
            const rating = await providerService.getProviderRating(PROVIDER_1.did)
            assert.equal(rating, 3.9,"Did not calculate provider's rating properly")
        }
    );

    it("should forward a read request to the datastore and return the proper results",
        async ()=>{
            const provider = await providerService.getProvider(PROVIDER_1.did)
            assert.equal(provider.did, PROVIDER_1.did, "ProviderService did not retrieve provider properly")
        }
    );

    it("should forward a write request to the datastore and return the proper results",
        async ()=>{
            const ratings = await ratingService.getAllRatings()
            await providerService.respondtoRating(ratings[0].id, "Yes it does")
            const rating = await ratingService.getRating(ratings[0].id)
            assert.equal(rating.response, "Yes it does", "ProviderService could not update rating properly")
        }
    );
})