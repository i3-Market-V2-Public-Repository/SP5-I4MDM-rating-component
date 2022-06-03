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
 *       rating:
 *         required:
 *           - byConsumer
 *           - forProvider
 *           - ratings
 *         properties:
 *           byConsumer:
 *             required: true
 *             description: The distributed identity of the consumer creating the rating onbject
 *             type: string
 *           forProvider:
 *             required: true
 *             description: The distributed identity of the provider this rating is adressed to
 *             type: string
 *           subRatings:
 *             required: true
 *             description: The ratings of the provider in each category, specified by order.
 *             type: array
 *             items:
 *               type: integer
 *             minItems: 4
 *             maxItems: 4
 *           msg:
 *             description: An optional free-text message by the consumer to be included in the rating
 *             type: string
 *       error:
 *         type: object
 *         required:
 *           - status
 *           - message
 *         properties:
 *           status:
 *             type: integer
 *             example: 404
 *           message:
 *             type: string
 *             example: "Consumer with did: 0x8368943574 does not exist"
 */


/**
 * @swagger 
 *   tags:
 *    - name: consumers
 *      description: Provides API for the basic CRUD methods for data consumers and specific consumer functionality
 *    - name: providers
 *      description: Provides API for the basic CRUD methods for data providers and specific provider functionality
 *    - name: ratings
 *      description: Provides API for the basic CRUD methods for ratings and specific rating functionality
 */