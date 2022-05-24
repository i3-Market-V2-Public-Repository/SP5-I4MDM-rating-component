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
 *
 */

import dotenv from "dotenv"
import express from "express"
//const routes = require("./routes")
import {MongoDatastore} from "./datastores/mongoDatastore"

dotenv.config()
const BACKEND_PORT = process.env.BACKEND_PORT || 3001
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"

const db = new MongoDatastore(MONGO_URL, {
    useNewUrlParser: true,
    userFindAndModify: false,
    useUnifiedTopology: true
});

const server = express()
server.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}...`);
});
