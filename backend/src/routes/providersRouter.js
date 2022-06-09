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
 *  /api/providers/:
 *    get:
 *      tags: [providers]
 *      summary: Get all the data providers
 *      description: >
 *        Returns an array containing every data provider.
 *      responses:
 *        200:
 *          description: Returns an array containing every data provider stored in the database
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  providers:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/user'
 */
 router.get('/providers/', providerController.getAllProviders)

 /**
 *  @swagger
 *  /api/providers/:
 *    post:
 *      tags: [providers]
 *      summary: Create a new providers
 *      description: >
 *        Creates a new providers with the given did, name and email and returns it
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 *      responses:
 *        201:
 *          description: Returns the newly created provider
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  provider:
 *                      $ref: '#/components/schemas/user'
 *        500:
 *          description: Internal server Error
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 */
router.post('/providers/', providerController.createProvider)

/**
 *  @swagger
 *  /api/providers/{did}:
 *    get:
 *      tags: [providers]
 *      summary: Get a single provider.
 *      description: >
 *        Returns a single (and the only) provider that matches the did provided
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x1234567890"
 *          description: The distributed identity of the requested user
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns the provider object matching the did provided
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  provider:            
 *                    $ref: '#/components/schemas/user'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
 router.get('/providers/:did', providerController.getProvider)

/**
 *  @swagger
 *  /api/providers/{did}:
 *    put:
 *      tags: [providers]
 *      summary: Edit an existing provider
 *      description: >
 *       Changes the email of a provider
 *      parameters:
 *        - name: did
 *          required: true
 *          in: path
 *          description: The distributed identity of the user. Must be unique
 *          type: string
 *          example: 0x1234567890
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                user:
 *                required:
 *                  - did
 *                properties:
 *                  email:
 *                    required: true
 *                    description: The email of the user.
 *                    type: string
 *                    example: test@mail.com
 *      responses:
 *        200:
 *          description: Returns the edited provider object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  provider:
 *                    $ref: '#/components/schemas/user'
 *        500:
 *          description: Internal server Error
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error500'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
router.put('/providers/:did', providerController.editProvider)

 /**
 *  @swagger
 *  /api/providers/{did}:
 *    delete:
 *      summary: Delete a single provider.
 *      tags: [providers]
 *      description: >
 *        Deletes a provider that macthes the did provided (To be used only for debugging purposes)
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x1234567890"
 *          description: The distributed identity of the requested user
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns the now deleted provider object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  provider:
 *                    $ref: '#/components/schemas/user'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
  router.delete('/providers/:did', providerController.deleteProvider)

/**
 *  @swagger
 *  /api/providers/{did}/ratings:
 *    get:
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
 */
router.get('/providers/:did/ratings', providerController.getAllRatingsforProvider)

/**
 *  @swagger
 *  /api/providers/{did}/totalRating:
 *    get:
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
 *                    type: float
 *                    example: 3.75
 *        400:
 *          description: Bad Request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/error400'
 */
router.get('/providers/:did/totalRating', providerController.getProviderRating)

export default router