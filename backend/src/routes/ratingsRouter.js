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
import ratingController from "../controllers/ratingController";

/**
 *  @swagger
 *  /api/ratings/:
 *    get:
 *      tags: [ratings]
 *      summary: Get all the ratings
 *      description: >
 *        Returns an array containing every ratings.
 *      responses:
 *        200:
 *          description: Returns an array containing every rating stored in the database
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  ratings:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/rating'
 */
 router.get('/ratings/', ratingController.getAllRatings)

 /**
 *  @swagger
 *  /api/ratings/:
 *    post:
 *      tags: [ratings]
 *      summary: Create a new rating
 *      description: >
 *        Creates a new Rating with from the specified consumer, to the specified provider, containing the sub ratings for different categories and an optional message
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/rating'
 *      responses:
 *        201:
 *          description: Returns the newly created rating
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  rating:
 *                      $ref: '#/components/schemas/rating'
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
router.post('/ratings/', ratingController.createRating)

/**
 *  @swagger
 *  /api/ratings/{id}:
 *    get:
 *      tags: [ratings]
 *      summary: Get a single rating.
 *      description: >
 *        Returns a single (and the only) rating matching the id provided
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          example: 62971e7ce9248124900736d3
 *          description: The internal database id of the rating object
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns the rating object matching the id provided
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  rating:
 *                    $ref: '#/components/schemas/rating'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error400'
 */
 router.get('/ratings/:id', ratingController.getRating)

/**
 *  @swagger
 *  /api/ratings/{id}:
 *    put:
 *      tags: [ratings]
 *      summary: Edit an existing Rating
 *      description: >
 *       Changes the sub ratings and message with the ones provided. Also deletes the previous response if any
 *      parameters:
 *        - name: id
 *          required: true
 *          in: path
 *          description: The identity of the rating to be edited
 *          type: string
 *          example: 62971e7ce9248124900736d3
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                rating:
 *                required:
 *                  - ratings
 *                properties:
 *                  subRatings:
 *                    required: true
 *                    description: The ratings of the provider in each category, specified by order.
 *                    type: array
 *                    example: [5,5,5,5]
 *                    items:
 *                      type: integer
 *                    minItems: 4
 *                    maxItems: 4
 *                  msg:
 *                    description: An optional free-text message by the consumer to be included in the rating
 *                    type: string
 *      responses:
 *        200:
 *          description: Returns the edited rating object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  rating:
 *                    $ref: '#/components/schemas/rating'
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
router.put('/ratings/:id', ratingController.editRating)

 /**
 *  @swagger
 *  /api/ratings/{id}:
 *    delete:
 *      summary: Delete a single rating.
 *      tags: [ratings]
 *      description: >
 *        Deletes a rating that matches the id provided.
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          example: 62971e7ce9248124900736d3
 *          description: The identity of the rating to delete
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Returns the now deleted rating object
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  rating:
 *                    $ref: '#/components/schemas/rating'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
  router.delete('/ratings/:id', ratingController.deleteRating)

  /**
 *  @swagger
 *  /api/ratings/{id}/respond:
 *    post:
 *      tags: [ratings]
 *      summary: Respond to a rating object
 *      description: >
 *        Returns Fills the response field of a rating object, to be later displayed along with the message
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          example: 62971e7ce9248124900736d3
 *          description: The distributed id of the rating object the response is aimed at
 *          schema:
 *            type: string
*      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                rating:
 *                required:
 *                  - response
 *                properties:
 *                  response:
 *                    description: The response message to be included in the rating by the data provider
 *                    type: string
 *      responses:
 *        200:
 *          description: Returns the edited rating object with a filled response field
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  rating:
 *                    $ref: '#/components/schemas/rating'
 *        404:
 *          description: Not Found
 *          content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/error404'
 */
 router.post('/ratings/:id/respond', ratingController.respondToRating)

export default router