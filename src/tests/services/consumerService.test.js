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
        did:"0xtemp2"
    }

    const CONSUMER_1 ={
        did:"0x0987654321"
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
})