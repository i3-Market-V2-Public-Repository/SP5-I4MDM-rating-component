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

const questionnaireSchema  = new mongoose.Schema({
    questions:{
        type: [String],
        required: true,
        length:4,
        validate: (vals) => {
            /**
             * Array length should be exactly 4
             */
            if (vals.length !== 4) return false
            /**
             * Not a sinle question could be less than 10 chars long
             */
            for (let i=0; i<vals.length; i++){
                if (vals[i].length < 10) return false
            }
            return true;
        }
    },

},{timestamps:true})

questionnaireSchema.pre('findOneAndUpdate', function(next){
    this.setOptions({runValidators: true, new: true})
    next()
})

export default questionnaireSchema