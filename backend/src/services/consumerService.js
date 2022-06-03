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

    createConsumer = async function({did, name, email=null}){
        return this.datastore.createConsumer({did, name, email})
    }

    getConsumer = async function(did){
        return this.datastore.getConsumer(did)
    }

    editConsumer = async function(did, email){
        return this.datastore.editConsumer(did, email)
    }

    deleteConsumer = async function(did){
        return this.datastore.deleteConsumer(did)
    }

    getAllConsumers = async function(){
        return this.datastore.getAllConsumers()
    }

    getAllRatingsbyConsumer = async function(did){
        return this.datastore.getAllRatingsbyConsumer(did)
    }

    // getConsumerRating = async function(did){
    //     const ratings = this.getAllRatingsbyConsumer(did)
    //     let consumerRating=0
    //     for(let i=0; i<ratings.length; i++){
    //         consumerRating+= ratings[i].totalRating
    //     }
    //     return consumerRating / ratings.length
    // }
}

export default ConsumerService.init(db)