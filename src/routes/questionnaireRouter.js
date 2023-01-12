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

import express from 'express';

const router = express.Router()
import questionnaireController from "../controllers/questionnaireController";
import authenticateJWT from '../middleware/JWTAuthenticator'

router.use(authenticateJWT)
/**
 *  @swagger
 *  /api/questions/:
 *    get:
 *      tags: [questions]
 *      security:
 *        - jwt: []
 *      summary: Get all the questions
 *      description: >
 *        Returns an array containing the questions to be rated.
 *      responses:
 *        200:
 *          description: Returns an array containing the questions used for rating
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionnaire'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error401'
 */
 router.get('/questions/', questionnaireController.getQuestionnaire)

export default router