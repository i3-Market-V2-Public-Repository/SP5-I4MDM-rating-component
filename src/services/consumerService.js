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

let service = {}
import db from "../datastores/mongoDatastore"

export class ConsumerService {

    /**
     * Singleton constructor
     * @returns A new instance of Provider service if none was initialized previously, or the already initialized instance
     */
    static init = function(datastore){
        if(Object.keys(service).length == 0){  //empty object
            service = new ConsumerService()
            service.datastore = datastore;
        }
        return service;
    }

    getAllRatingsbyConsumer = async function(did){
        return this.datastore.getAllRatingsbyConsumer(did)
    }
}

export default ConsumerService.init(db)