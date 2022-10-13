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

 /**
 *  @swagger
 *  /api/questions/:
 *    put:
 *      security:
 *        - jwt: ["admin"]
 *      tags: [questions]
 *      summary: Edit an existing set of questions
 *      description: >
 *       Updates the rating questions to the ones specified, (older ratings are left incosistent) 
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionnaire'
 *      responses:
 *        200:
 *          description: Returns the edited questionnaire object
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/questionnaire'
 *        500:
 *          description: Internal server Error
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error401'
 *        403:
 *          description: Forbidden
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error403'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
router.put('/questions/', questionnaireController.updateQuestionnaire)

export default router