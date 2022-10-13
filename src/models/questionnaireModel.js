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
import mongoose from "mongoose";
import questionnaireSchema from "../schemas/questionnaireSchema";

const Questionnaire = mongoose.model("Questionnaire", questionnaireSchema)

Questionnaire.on('index', function(err) {
    if (err) {
        console.error('Questionnaire index error: %s', err);
    } else {
        console.info('Questionnaire indexing complete');
    }
});

export default Questionnaire