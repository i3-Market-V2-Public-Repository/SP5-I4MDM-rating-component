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

export class GenericDatastore{

    constructor(){
       if(GenericDatastore.constructor === GenericDatastore) throw new Error("Cannot instantiate an abstract class")
    }
    /**
     * Provider Section
     */
    createProvider = function({did, name, email=null}){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getProvider = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    editProvider = async function(did, email){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getAllRatingsforProvider = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }

    /**
     * Consumer Section
     */
    createConsumer = async function({did, name, email=null}){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    editConsumer = async function(did, email){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getConsumer = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getAllRatingsbyConsumer = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }

    /**
     * Rating Section
     */
    createRating = async function({from, to, ratings,  msg="",}){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    editRating = async function(id, ratings, msg=null){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getRating = async function(id){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    respondtoRating = async function (id, response){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getAllRatings= async function(){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }
}
