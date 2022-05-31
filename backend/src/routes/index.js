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
import consumerController from "../controllers/consumerController";
// import providerController from '../controllers/providerController';
// import ratingController from '../controllers/ratingController';

 /**
 *  @swagger
 *  /api/consumers/:
 *    tags: [consumer management]
 *    post:
 *      summary: Create a new Consumer
 *      description: >
 *        Creates a new consumer with the given did, name and email and returns it
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/user'
 */
router.post('/consumers/', consumerController.createConsumer)

/**
 *  @swagger
 *  /api/consumers/{did}:
 *    tags: [consumer management]
 *    get:
 *      summary: Get a single consumer.
 *      description: >
 *        Returns a single (and the only) consumer that matches the did provided
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x0987654321"
 *          description: The distributed identity of the requested user
 *          schema:
 *            type: string
 */
 router.get('/consumers/:did', consumerController.getConsumer)

/**
 *  @swagger
 *  /api/consumers/{did}:
 *    tags: [consumer management]
 *    put:
 *      summary: Edit an existing Consumer
 *      description: >
 *       Changes the email of a consumer
 *      parameters:
 *        - name: did
 *          required: true
 *          in: path
 *          description: The distributed identity of the user. Must be unique
 *          type: string
 *          example: 0x0987654321
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
 */
router.put('/consumers/:did', consumerController.editConsumer)

 /**
 *  @swagger
 *  /api/consumers/{did}:
 *    tags: [consumer management]
 *    delete:
 *      summary: Delete a single consumer.
 *      description: >
 *        Deletes a consumer that macthes the did provided (To be used only for debugging purposes)
 *      parameters:
 *        - name: did
 *          in: path
 *          required: true
 *          example: "0x0987654321"
 *          description: The distributed identity of the requested user
 *          schema:
 *            type: string
 */
  router.delete('/consumers/:did', consumerController.deleteConsumer)

  /**
 *  @swagger
 *  /api/consumers/{did}/ratings:
 *    tags: [consumer management]
 *    get:
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
 */
 router.get('/consumers/:did/ratings', consumerController.getAllRatingsbyConsumer)

export default router

/**
 * @swagger
 *   components:
 *     schemas:
 *       user:
 *         required:
 *           - name
 *           - did
 *         properties:
 *           did:
 *             required: true
 *             description: The distributed identity of the user. Must be unique
 *             type: string
 *           name:
 *             required: true
 *             description: The display name of the user. Must be unique
 *             type: string
 *           email:
 *             required: true
 *             description: The email of the user.
 *             type: string
 */