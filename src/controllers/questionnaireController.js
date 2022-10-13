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

import QuestionnaireService from "../services/QuestionnaireService"
import dotenv from "dotenv"

dotenv.config
export class QuestionnaireController{

    getQuestionnaire = async function getQuestionnaire(req, res, next) {
        const id = req.params.id
        try{
            const  questionnaire = await QuestionnaireService.getQuestionnaire()
            if (!questionnaire) return res.status(500).json({error: `[QuestionnaireController] Error retrieving questions`})
            return res.json({
                questions: questionnaire.questions
            })
        }catch(err){
            console.log("[QuestionnaireController] Error retrieving questions: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default new QuestionnaireController()