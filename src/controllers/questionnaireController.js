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

import dotenv from "dotenv"
import questionnaireService from "../services/questionnaireService"

dotenv.config
export class QuestionnaireController{

    getQuestionnaire = async function getQuestionnaire(req, res, next) {
        const id = req.params.id
        try{
            const  questionnaire = await questionnaireService.getQuestionnaire()
            if (!questionnaire) return res.status(500).json({error: `[QuestionnaireController] Error retrieving questions`})
            return res.json({
                questions: questionnaire.questions
            })
        }catch(err){
            console.log("[QuestionnaireController] Error retrieving questions: "+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }

    updateQuestionnaire = async function updateQuestionnaire(req, res, next){
        const questions = req.body.questions

        //Auth stuff: No one has access to this function (use debugging flag to access)
        console.log(process.env.DEBUG)
        if (!process.env.DEBUG){
            return (res.status(403).json({error: "You are not authorized to alter rating questions"}))
        }
        try{
            const questionnaire = await questionnaireService.updateQuestionnaire(questions)
            if (!questionnaire) return res.status(500).json({error: `Could not update questionnaire`})
            return res.status(200).json(questionnaire)
        }catch(err){
            console.log(`[QuestionnaireController] Error updating questionnaire:`+ err.message)
            return res.status(err.status || 500).json({error: err.message})
        }
    }
}

export default new QuestionnaireController()