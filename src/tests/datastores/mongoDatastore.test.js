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
// import Provider from "../../models/providerModel"
// import Consumer from "../../models/consumerModel"
import Rating from "../../models/ratingModel"
import assert from 'assert'
import mongoose from "mongoose"

dotenv.config()

describe("mongoDatastore test suite", () => {

    const PROVIDER_1 = {
        did:"0x1234567890",
    }
    const PROVIDER_2 = {
        did:"0x1234554321",
    }
    const CONSUMER_1 ={
        did:"0x0987654321",
    }
    const CONSUMER_2 = {
        did:"0x9876556789",
    }

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
        await mongoose.connection.db.dropDatabase();
    })

    it("should return empty array when there are no ratings",
        async () => {
            const ratings = await db.getAllRatings()
            assert.deepEqual(ratings, []);
        }
    );

    it("should create a new rating in the database",
        async() =>{
            await db.createRating({byConsumer:CONSUMER_1.did, forProvider:PROVIDER_1.did, onTransaction:"agreement1", subRatings: [5,5,5,4], msg:"it just works"})
            const numRatings = await Rating.countDocuments({});
            assert.equal(numRatings, 1, "Failed to create the ratings")
        }
    )

    it("should NOT create an illegal new rating in the database",
        async() =>{
            await assert.rejects(async()=>{
                await db.createRating({byConsumer:CONSUMER_1.did, forProvider:PROVIDER_1.did, onTransaction:"agreement2", subRatings: [7,5,5,4], msg:"it just does not work"})
            })
            const numRatings = await Rating.countDocuments({});
            assert.equal(numRatings, 1, "Created an illegal rating")
        }
    )

    it("should NOT create other illegal new rating in the database",
    async() =>{
            await assert.rejects(async()=>{
                await db.createRating({byConsumer:CONSUMER_1.did, forProvider:PROVIDER_1.did, onTransaction:"agreement3", subRatings: [5,5,5,4,2, 3], msg:"it just does not work"})
            })
            const numRatings = await Rating.countDocuments({});
            assert.equal(numRatings, 1, "Created an illegal rating")
        }
    )

    it("should NOT create a legal but duplicate new rating in the database",
    async() =>{
            await assert.rejects(async()=>{
                await db.createRating({byConsumer:CONSUMER_1.did, forProvider:PROVIDER_1.did, onTransaction:"agreement1", subRatings: [7,5,5,4], msg:"it just does not work"})
            })
            const numRatings = await Rating.countDocuments({});
            assert.equal(numRatings, 1, "Created an illegal rating")
        }
    )

    it("should get the total rating of a rating object",
        async() =>{
            const ratingObj = await db.getAllRatings()
            assert.equal(4.75, ratingObj[0].totalRating, "Total rating is not calculated correctly")
        }
    )

    it("should respond to a single rating", 
        async() =>{
            let ratingObj = await db.getAllRatings()
            ratingObj = ratingObj[0]
            await db.respondtoRating(ratingObj._id, "Indeed it does")
            const res = await db.getRating(ratingObj._id)
            assert.equal("Indeed it does", res.response)
        })
});
