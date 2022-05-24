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

import mongoose from "mongoose"
import Provider from "./../models/provider"
import Consumer from "./../models/consumer"
import Rating from "../models/rating";

export class MongoDatastore{

    constructor(uri, options){
        mongoose.connect(uri, {
            dbName: options.dbName,
            user:options.user,
            autoIndex: options.autoIndex || true,
            useNewUrlParser: options. useNewUrlParser || true,
            useUnifiedTopology: options.useUnifiedTopology || true
        }).then(
            (value) => {console.log("Connected successfuly to database"); return value},
            (err) => {console.log(`cannot connect to database with error ${err}`)}
        )
    }

    /**
     * Provider Section
     */
    createProvider = async function({did, name, email=null}){
        const provider = await Provider.create({
            did: did,
            name: name,
            email: email
        }).catch(err => {console.log(err.message); throw err})
        console.log(`provider ${name} created successfully`)
        return provider
    }

    getProvider = async function(did){
        const provider = await Provider.findOne({did:did}).catch(err => {console.log(err.message); throw err})
        console.log(`provider ${provider.did} retrieved successfully`)
        return provider
    }

    editProvider = async function(did, email){
        const provider = await Provider.findOneAndUpdate(
            {did:did},
            {email: email}
        ).catch(err => {console.log(err.message); throw err})
        console.log(`provider ${provider.name} updated successfully`)
        return provider
    }

    /**
     * Consumer Section
     */
    createConsumer = async function({did, name, email=null}){
        const consumer = await Consumer.create({
            did: did,
            name: name,
            email: email
        }).catch(err => {console.log(err.message); throw err})
        console.log(`consumer ${name} created successfully`)
        return consumer
    }

    editConsumer = async function(did, email){
        const consumer = await Consumer.findOneAndUpdate(
            {did:did},
            {email:email}
        ).catch(err => {console.log(err.message); throw err})
        console.log(`consumer ${consumer.name} updated successfully`)
        return consumer
    }

    getConsumer = async function(did){
        const consumer = await Consumer.findOne({did:did}).catch(err => {console.log(err.message); throw err})
        console.log(`consumer ${consumer.did} retrieved successfully`)
        return consumer
    }

    /**
     * Rating Section
     */
    createRating = async function({from, to, ratings,  msg="",}){
        const fromObj = await Consumer.findOne({did: from})
        const toObj = await Provider.findOne({did: to})

        const rating = await Rating.create({
            subRatings: ratings,
            byConsumer: fromObj._id,
            forProvider: toObj._id,
            comment: msg
        }).catch(err => {console.log(err.message); throw err})
        console.log(`rating for provider ${toObj.name} by consumer ${fromObj.name} created successfully`)
        return rating
    }

    editRating = async function(id, ratings, msg=null){
        let rating
        if(msg){
            rating = await Rating.findByIdAndUpdate(id, {
                subratings: ratings,
                comment:msg, response:""
            }).catch(err => {console.log(err.message); throw err})
            console.log(`rating ${id} and its comment updated successfully`)
        }
        else{
            rating = await Rating.findByIdAndUpdate(id, {
                subratings: ratings,
                response:""
            }).catch(err => {console.log(err.message); throw err})
            console.log(`rating ${id} updated successfully`)
        }
        return rating
    }

    getRating = async function(id){
        const rating = await Rating.findById(id).catch(err => {console.log(err.message); throw err})
        console.log(`Retrieved rating ${rating.id} from the database`)
        return rating
    }

    respondtoRating = async function (id, response){
        const rating = await Rating.findByIdAndUpdate(id, 
            {response:response}
        ).catch(err => {console.log(err.message); throw err})
        console.log(`rating ${id} responded successfully`)
        return rating
    }

    getAllRatings= async function(){
        const ratings = await Rating.find({})
        return ratings
    }

    getAllRatingsforProvider = async function(did){
        const provider = await Provider.findOne({did: did})
        const ratings = await Rating.find({forProvider:provider._id}, function (err, doc) {
            if (err){
                console.log(err.message)
                return []
            } 
            else return ratings
        })
    }

    getAllRatingsbyConsumer = async function(did){
        const consumer = await Consumer.findOne({did: did})
        const ratings = await Rating.find({byConsumer:consumer._id}, function (err, doc) {
            if (err){
                console.log(err.message)
                return []
            } 
            else return ratings
        })
    }
}
