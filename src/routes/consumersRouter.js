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
import consumerController from "../controllers/consumerController"
/**
 *  @swagger
 *  /api/consumers/{did}/ratings:
 *    get:
 *      security:
 *        - jwt: []
 *      tags: [consumers]
 *      summary: Get the ratings of the consumer
 *      description: >
 *        Returns all the rating objects that were created by the consumer with the specified did
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x0987654321"
 *          description: The distributed identity of the consumer that created the ratings
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns an array containing every rating created by the consumer with the specified did
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ratings:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/rating'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error400'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error401'
 */
 router.get('/consumers/:did/ratings', consumerController.getAllRatingsbyConsumer)

 /**
 *  @swagger
 *  /api/consumers/{pk}/agreements:
 *    get:
 *      security:
 *        - jwt: []
 *          jwtAccess: []
 *      tags: [consumers]
 *      summary: Get the terminated agreements of the consumer
 *      description: >
 *        Returns all the terminated agreement objects that were signed by the consumer with the specified did
 *      parameters:
 *        - name: pk
 *          in: path
 *          required: true
 *          example: "0987654321"
 *          description: The public key of the consumer that signed the agreements
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns an array containing every terminated agreement signed by the consumer with the specified did
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  agreements:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/agreement'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error400'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error401'
 */
  router.get('/consumers/:pk/agreements', consumerController.getAgreementsByConsumer)

export default router