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

export class RatingService {

    /**
     * Singleton constructor
     * @returns A new instance of Provider service if none was initialized previously, or the already initialized instance
     */
    static init = function(database){
        
        if (Object.keys(service).length == 0){  //empty object
            service = new RatingService()
            service.datastore = database;
        }
        return service;
    }

    createRating = async function({from, to, ratings, msg="",}){
        return this.datastore.createRating({from, to, ratings, msg})
    }

    editRating = async function(id, ratings, msg=null){
        return this.datastore.editRating(id, ratings, msg)
    }

    getRating = async function(id){
        return this.datastore.getRating(id)
    }

    getAllRatings= async function(){
        return this.datastore.getAllRatings()
    }
}

export default RatingService.init(db)