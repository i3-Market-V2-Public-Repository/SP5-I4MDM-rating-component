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

import db from "../datastores/mongoDatastore";

let service = {}

export class QuestionnaireService {

    /**
     * Singleton constructor
     * @returns A new instance of Questionnaire service if none was initialized previously, or the already initialized instance
     */
    static init = function(database){
        
        if (Object.keys(service).length == 0){  //empty object
            service = new QuestionnaireService
            service.datastore = database;
        }
        return service;
    }

    getQuestionnaire = async function(){
        return await this.datastore.getQuestionnaire()
    }

    updateQuestionnaire = async function(questions){
        return await this.datastore.updateQuestionnaire(questions)
    }
}

export default QuestionnaireService.init(db)