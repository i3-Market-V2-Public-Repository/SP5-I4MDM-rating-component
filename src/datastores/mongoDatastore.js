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
import Rating from "../models/ratingModel";
import { GenericDatastore } from "./genericDatastore";

export class MongoDatastore extends GenericDatastore{

    projectedFields = "-__v -__t "

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

    getAllRatingsforProvider = async function(did){
        const ratings = await Rating.find({forProvider: did}).catch(err =>{
            console.log(err.message)
            throw err
        })
        return ratings
    }

    getAllRatingsbyConsumer = async function(did){
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
        const rating = await Rating.create({
            subRatings: subRatings,
            byConsumer: byConsumer,
            forProvider: forProvider,
            onTransaction: onTransaction,
            comment: msg
        }).catch(err => {
            console.log(err.message);
            err.status=500 
            throw err
        })
        console.log(`[mongoDatastore]Rating for provider ${forProvider} by consumer ${byConsumer} created successfully`)
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

    getRatingbyAgreement = async function(agreement_id){
        const rating = await Rating.findOne({
            onTransaction: agreement_id
        }).select(this.projectedFields).catch(err => {console.log(err.message); throw err})
        if (rating)   console.log(`[mongoDatastore] rating ${rating.id} retrieved successfully`)
        else console.log('[mongoDatastore] rating with onTransaction '+agreement_id+" does not exist")
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
