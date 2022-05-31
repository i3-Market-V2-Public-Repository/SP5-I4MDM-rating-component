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

import db from "../datastores/mongoDatastore";

let service = {}

export class ProviderService {

    /**
     * Singleton constructor
     * @returns A new instance of Provider service if none was initialized previously, or the already initialized instance
     */
    static init = function(datastore){
        if (Object.keys(service).length == 0){  //empty object
            service = new ProviderService()
            service.datastore = datastore;
        }
        return service;
    }

    createProvider = async function({did, name, email=null}){
        return this.datastore.createProvider({did, name, email})
    }

    getProvider = async function(did){
        return this.datastore.getProvider(did)
    }

    editProvider = async function(did, email){
        return this.datastore.editProvider(did, email)
    }

    getAllRatingsforProvider = async function(did){
        return this.datastore.getAllRatingsforProvider(did)
    }

    getProviderRating = async function(did){
        const ratings = await this.getAllRatingsforProvider(did)
        let providerRating=0
        for(let i=0; i<ratings.length; i++){
            providerRating+= ratings[i].totalRating
        }
        return providerRating / ratings.length
    }

    respondtoRating = async function (id, response){
        return this.datastore.respondtoRating(id, response)
    }
}

export default ProviderService.init(db)