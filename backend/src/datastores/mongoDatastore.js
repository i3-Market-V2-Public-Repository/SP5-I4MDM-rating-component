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
import dotenv from "dotenv"
import Provider from "./../models/provider"
import Consumer from "./../models/consumer"
import Rating from "../models/rating";
import { GenericDatastore } from "./genericDatastore";
import e from "express";

export class MongoDatastore extends GenericDatastore{

    constructor(uri, options){
        super()
        mongoose.connect(uri, {
            dbName: options.dbName,
            user:options.user,
            autoIndex: options.autoIndex || true,
            // @ts-ignore
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
        console.log(`[mongoDatastore]provider ${name} created successfully`)
        return provider
    }

    getProvider = async function(did){
        const provider = await Provider.findOne({did:did}).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore]provider ${provider.did} retrieved successfully`)
        return provider
    }

    editProvider = async function(did, email){
        const provider = await Provider.findOneAndUpdate(
            {did:did},
            {email: email}
        ).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore]provider ${provider.name} updated successfully`)
        return provider
    }

    getAllRatingsforProvider = async function(did){
        const provider = await Provider.findOne({did: did})
        const ratings = await Rating.find({forProvider:provider.did}).catch(err =>{
            console.log(err.message)
            return []
        }) 
        return ratings
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
        console.log(`[mongoDatastore]consumer ${name} created successfully`)
        return consumer
    }

    editConsumer = async function(did, email){
        const consumer = await Consumer.findOneAndUpdate(
            {did:did},
            {email:email},
            {new: true} //override default behaviour to return the updated object
        ).catch(err => {console.log(err.message); throw err})
        if (consumer) console.log(`[mongoDatastore]consumer ${consumer.name} updated successfully`)
        else console.log(`[mongoDatastore]Consumer with did: ${did} does not exist`)
        return consumer
    }

    getConsumer = async function(did){
        const consumer = await Consumer.findOne({did:did}).catch(err => {console.log(err.message); throw err})
        if (consumer)   console.log(`[mongoDatastore]consumer ${consumer.did} retrieved successfully`)
        else console.log('[mongoDatastore]Consumer with did '+did+" does not exist")
        return consumer
    }

    deleteConsumer = async function(did){
        const consumer = await Consumer.findOneAndDelete({did:did}).catch(err => {console.log(err.message); throw err})
        if (consumer)   console.log(`[mongoDatastore]consumer ${consumer.did} deleted successfully`)
        else console.log('[mongoDatastore]Consumer with did '+did+" does not exist")
        return consumer
    }

    getAllRatingsbyConsumer = async function(did){
        const consumer = await Consumer.findOne({did: did})
        const ratings = await Rating.find({byConsumer:consumer._id}).catch(function (err) {
            console.log(err.message)
            return []
        })
        return ratings
    }


    /**
     * Rating Section
     */
    createRating = async function({from, to, ratings,  msg="",}){
        const fromObj = await Consumer.findOne({did: from})
        const toObj = await Provider.findOne({did: to})

        const rating = await Rating.create({
            subRatings: ratings,
            byConsumer: fromObj.did,
            forProvider: toObj.did,
            comment: msg
        }).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore]Rating for provider ${toObj.name} by consumer ${fromObj.name} created successfully`)
        return rating
    }

    editRating = async function(id, ratings, msg=null){
        let rating
        if(msg){
            rating = await Rating.findByIdAndUpdate(id, {
                subratings: ratings,
                comment:msg, response:""
            }).catch(err => {console.log(err.message); throw err})
            console.log(`[mongoDatastore]Rating ${id} and its comment updated successfully`)
        }
        else{
            rating = await Rating.findByIdAndUpdate(id, {
                subratings: ratings,
                response:""
            }).catch(err => {console.log(err.message); throw err})
            console.log(`[mongoDatastore]Rating ${id} updated successfully`)
        }
        return rating
    }

    getRating = async function(id){
        const rating = await Rating.findById(id).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore]Retrieved rating ${rating.id} from the database`)
        return rating
    }

    respondtoRating = async function (id, response){
        const rating = await Rating.findByIdAndUpdate(id, 
            {response:response}
        ).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore]rating ${id} responded successfully`)
        return rating
    }

    getAllRatings= async function(){
        const ratings = await Rating.find({})
        return ratings
    }
}

dotenv.config()
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"

export default new MongoDatastore(MONGO_URL, {
    useNewUrlParser: true,
    userFindAndModify: false,
    useUnifiedTopology: true
});
