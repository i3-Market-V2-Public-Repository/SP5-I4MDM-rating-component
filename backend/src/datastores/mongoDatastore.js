// @ts-nocheck
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
import Provider from "../models/providerModel"
import Consumer from "../models/consumerModel"
import Rating from "../models/ratingModel";
import agreementService from "../services/agreementService"
import { GenericDatastore } from "./genericDatastore";

export class MongoDatastore extends GenericDatastore{

    projectedFields = "-__v -createdAt -__t -updatedAt"

    constructor(uri, options){
        super()
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
        console.log(`[mongoDatastore]provider ${name} created successfully`)
        return provider
    }

    getProvider = async function(did){
        const provider = await Provider.findOne({did:did}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (provider)   console.log(`[mongoDatastore]provider ${provider.did} retrieved successfully`)
        else console.log(`[mongoDatastore]provider ${did} does not exist`)
        return provider
    }

    editProvider = async function(did, email){
        const provider = await Provider.findOneAndUpdate(
            {did:did},
            {email: email},
            {new: true} //override default behaviour to return the updated object
        ).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (provider)   console.log(`[mongoDatastore]provider ${provider.did} updated successfully`)
        else console.log(`[mongoDatastore]provider ${did} does not exist`)
        return provider
    }

    deleteProvider = async function(did){
        const provider = await Provider.findOneAndDelete({did:did}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (provider)   console.log(`[mongoDatastore] provider ${provider.did} deleted successfully`)
        else console.log('[mongoDatastore] provider with did '+did+" does not exist")
        return provider
    }

    getAllProviders = async function(){
        const providers = await Provider.find({}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore] All providers retrieved successfully`)
        return providers
    }

    getAllRatingsforProvider = async function(did){
        const provider = await Provider.findOne({did: did}).select(this.projectedFields)
        if (!provider){
            let e = Error(`Provider with did: ${did} does not exist`)
            e.status = 400
            throw e
        }
        const ratings = await Rating.find({forProvider: did}).catch(err =>{
            console.log(err.message)
            throw err
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
        console.log(`[mongoDatastore] Consumer ${name} created successfully`)
        return consumer
    }

    editConsumer = async function(did, email){
        const consumer = await Consumer.findOneAndUpdate(
            {did:did},
            {email:email},
            {new: true} //override default behaviour to return the updated object
        ).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (consumer) console.log(`[mongoDatastore] Consumer ${consumer.name} updated successfully`)
        else console.log(`[mongoDatastore] Consumer with did: ${did} does not exist`)
        return consumer
    }

    getConsumer = async function(did){
        const consumer = await Consumer.findOne({did:did}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (consumer)   console.log(`[mongoDatastore] Consumer ${consumer.did} retrieved successfully`)
        else console.log('[mongoDatastore] Consumer with did '+did+" does not exist")
        return consumer
    }

    deleteConsumer = async function(did){
        const consumer = await Consumer.findOneAndDelete({did:did}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (consumer)   console.log(`[mongoDatastore]consumer ${consumer.did} deleted successfully`)
        else console.log('[mongoDatastore]Consumer with did '+did+" does not exist")
        return consumer
    }

    getAllConsumers = async function(){
        const consumers = await Consumer.find({}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        console.log(`[mongoDatastore] Consumer retrieved successfully`)
        return consumers
    }

    getAllRatingsbyConsumer = async function(did){
        const consumer = await Consumer.findOne({did: did})
        if (!consumer){
            let e = new Error(`Data Consumer with did: ${did} does not exist`)
            e.status = 400
            throw e
        }
        const ratings = await Rating.find({byConsumer: did}).select(this.projectedFields).catch(function (err) {
            console.log(err.message)
            return []
        })
        return ratings
    }


    /**
     * Rating Section
     */
    createRating = async function({byConsumer, forProvider, onTransaction, subRatings,  msg="",}){
        const fromObj = await Consumer.findOne({did: byConsumer})
        const toObj = await Provider.findOne({did: forProvider})
        const agreement = await agreementService.getAgrrementbyID(onTransaction)

        if(!fromObj || !toObj){
            let e = !fromObj ? new Error(`Data Consumer with did: ${byConsumer} does not exist`)
                             : new Error(`Data Provider with did: ${forProvider} does not exist`)
            e.status = 400
            throw e
        }else if(!onTransaction || (onTransaction.length==0) || !agreement){
            let e = new Error(`Transaction with ID: ${onTransaction} does not exist`)
            e.status = 400
            throw e
        }

        const rating = await Rating.create({
            subRatings: subRatings,
            byConsumer: fromObj.did,
            forProvider: toObj.did,
            onTransaction: onTransaction,
            comment: msg
        }).catch(err => {
            console.log(err.message);
            err.status=500 
            throw err
        })
        console.log(`[mongoDatastore]Rating for provider ${toObj.name} by consumer ${fromObj.name} created successfully`)
        return rating
    }

    editRating = async function(id, subRatings, msg=null){
        let rating
        if(msg){
            rating = await Rating.findByIdAndUpdate(id, {
                $set: {subRatings:subRatings},
                comment:msg, response:""
            },{new: true}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
            if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
            else console.log('[mongoDatastore] rating with id '+id+" does not exist")
        }
        else{
            rating = await Rating.findByIdAndUpdate(id, {
                $set: {subRatings: subRatings},
                response: ""
            }, {new: true}).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
            if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
            else console.log('[mongoDatastore] rating with id '+id+" does not exist")
        }
        return rating
    }

    getRating = async function(id){
        const rating = await Rating.findById(id).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
        else console.log('[mongoDatastore] rating with id '+id+" does not exist")
        return rating
    }

    getRatingbyFields = async function(byConsumer, forProvider, onTransaction){
        const rating = await Rating.findOne({
            byConsumer: byConsumer,
            forProvider: forProvider,
            onTransaction: onTransaction
        }).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
        else console.log(`[mongoDatastore] rating with fields {${byConsumer}, ${forProvider}, ${onTransaction}} does not exist`)
        return rating
    }

    deleteRating = async function(id){
        const rating = await Rating.findByIdAndDelete(id).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating)   console.log(`[mongoDatastore] rating ${rating.id} deleted successfully`)
        else console.log('[mongoDatastore] rating '+id+" does not exist")
        return rating
    }

    respondtoRating = async function (id, response){
        const rating = await Rating.findByIdAndUpdate(id, 
            {response:response}
        ).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating) console.log(`[mongoDatastore]rating ${id} responded successfully`)
        else console.log(`[mongoDatastore]rating ${id} does not exist`)
        return rating
    }

    getAllRatings = async function(){
        const ratings = await Rating.find({}).select(this.projectedFields)
        return ratings
    }

    getRatingsbyTransaction = async function(transaction_id){
        const rating = await Rating.findOne({
            onTransaction: transaction_id
        }).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
        else console.log(`[mongoDatastore] rating with transaction_id ${transaction_id} does not exist`)
        return rating
    }
}

dotenv.config()
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"

export default new MongoDatastore(MONGO_URL, {
    useNewUrlParser: true,
    userFindAndModify: false,
    useUnifiedTopology: true
});
