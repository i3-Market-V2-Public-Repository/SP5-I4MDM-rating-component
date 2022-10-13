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

    getAllRatingsforProvider = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }

    getAllRatingsbyConsumer = async function(did){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }

    /**
     * Rating Section
     */
    createRating = async function({byConsumer, forProvider, onTransaction, subRatings,  msg=""}){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    editRating = async function(id, subRatings, msg=null){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getRating = async function(id){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getRatingbyAgreement = async function(agreement_id){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getRatingbyFields = async function(byConsumer, forProvider, onTransaction){
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

    getRatingsbyTransaction = async function(transaction_id){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    getQuestionnaire = async function(){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve([])
    }

    updateQuestionnaire = async function(questions){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }

    seedQuestionnaire = async function(questionnaire){
        throw new Error("Cannot execute an abstract method")
        return Promise.resolve()
    }
}
