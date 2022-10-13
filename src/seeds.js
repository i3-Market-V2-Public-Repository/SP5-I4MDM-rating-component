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

import db from "./datastores/mongoDatastore"

const questionnaire = {
    questions:[ "Was the dataset provided as described in the listing?",
                "Was the data transfer within the expected timeframe?",
                "Was the data provider open and clear in their communication?",
                "Were they any other issues or concerns in the transaction?"
    ]
}

db.seedQuestionnaire(questionnaire)