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

dotenv.config()

describe("providerService test suite", () => {

    const CONSUMER_TEMP = {
        did:"0xtemp2",
        name:"Consumer Temp",
        email: "consumer@email.com"
    }

    const CONSUMER_1 ={
        did:"0x0987654321",
        name:"Summer Conne",
        email: "consumer@email.com"
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

    it("Should create a new consumer in the datastore",
        async() =>{
            const cons = await consumerService.createConsumer(CONSUMER_TEMP)
            assert(cons.id, "Did not create new consumer")
        }
    );

    it("Should delete a consumer from the datastore",
        async() =>{
            await consumerService.deleteConsumer(CONSUMER_TEMP.did)
            const cons = await consumerService.deleteConsumer(CONSUMER_TEMP.did)
            assert(!cons, "Did not create new consumer")
        }
    );

    it("should forward a read request to the datastore and return the proper results",
        async ()=>{
            const consumer = await consumerService.getConsumer(CONSUMER_1.did)
            assert.equal(consumer.did, CONSUMER_1.did, "ConsumerService did not retrieve consumer properly")
        }
    );

    it("should forward a write request to the datastore and return the proper results",
        async ()=>{
            const consumer = await consumerService.editConsumer(CONSUMER_1.did, 'test@test.com')
            assert.equal(consumer.email, 'test@test.com', "ConsumerService did not update consumer properly")
        }
    );
})