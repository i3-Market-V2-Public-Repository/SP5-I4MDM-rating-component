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
import providerController from "../controllers/providerController";

/** 
 *  @swagger
 *  /api/providers/{did}/ratings:
 *    get:
 *      security:
 *        - jwt: []
 *      tags: [providers]
 *      summary: Get the ratings of the provider
 *      description: >
 *        Returns all the rating objects that were addressed to the provider with the specified did
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x1234567890"
 *          description: The distributed identity of the providers that the ratings were addressed to
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns an array containing every rating created for the provider with the specified did
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
router.get('/providers/:did/ratings', providerController.getAllRatingsforProvider)

/** 
 *  @swagger
 *  /api/providers/{pk}/agreements:
 *    get:
 *      security:
 *        - jwt: []
 *          jwtAccess: []
 *      tags: [providers]
 *      summary: Get the terminated agreements of the provider
 *      description: >
 *        Returns all the terminated agreement objects that were signed by the provider with the specified did
 *      parameters:
 *        - name: pk
 *          in: path
 *          required: true
 *          example: "1234567890"
 *          description: The public key of the provider that the terminated agreements were signed by
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns an array containing every terminated agreement signed by the provider with the specified did
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
 router.get('/providers/:pk/agreements', providerController.getAgreementsByProvider)

/**
 *  @swagger
 *  /api/providers/{did}/totalRating:
 *    get:
 *      security:
 *        - jwt: []
 *      tags: [providers]
 *      summary: Get the average rating of the provider
 *      description: >
 *        Returns the average value of every rating object associated with the provider as a float value
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x1234567890"
 *          description: The distributed identity of the providers that the ratings were addressed to
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns the average value of every rating object associated with the provider as a float value 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  totalRating:
 *                    type: object
 *                    properties:
 *                      providerRating:
 *                        type: number
 *                        format: float
 *                        example: 3.75
 *                      roundedRating:
 *                        type: number
 *                        format: float
 *                        example: 4.0
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
 *                $ref: '#/components/schemas/error403'
 */
router.get('/providers/:did/totalRating', providerController.getProviderRating)

export default router