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
 *
 */
import mongoose from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const ratingSchema  = new mongoose.Schema({
    subRatings:{
        type: [Number],
        required: true,
        length:4,
        validate: (vals) => {
            /**
             * Array length should be exactly 4
             */
            if (vals.length !== 4) return false
            /**
             * Not a sinle value in the subRatings should be bigger than 5 or lower than 0
             */
            for (let i=0; i<vals.length; i++){
                if (vals[i]<0 || vals[i]>5) return false
            }
            return true;
        }
    },
    byConsumer:{
        type: String,
        required: true,
        ref: 'Consumer'
    },
    forProvider:{
        type: String,
        required: true,
        ref: 'Provider'
    },
    onTransaction:{
        type:String,
        required: true
    },
    comment:{
        type: String
    },
    response:{
        type: String,
        default:""
    }

},{timestamps:true})

ratingSchema.virtual("totalRating").get(function(){
    let sum=0
    for (let i=0; i< this.subRatings.length; i++){
        sum += this.subRatings[i];
    }
    return sum / this.subRatings.length
})

ratingSchema.index({byConsumer: 1, forProvider: 1, onTransaction: 1}, {unique: true})
ratingSchema.plugin(uniqueValidator)
ratingSchema.pre('findOneAndUpdate', function(next){
    this.setOptions({runValidators: true, new: true})
    next()
})

export default ratingSchema