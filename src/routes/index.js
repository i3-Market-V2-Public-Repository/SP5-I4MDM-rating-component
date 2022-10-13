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
 *     securitySchemes:
 *       jwt:
 *         type: apiKey
 *         in: header
 *         name: id_token
 *       jwtAccess:
 *         type: apiKey
 *         in: header
 *         name: access_token
 *     schemas:
 *       agreement:
 *         required:
 *           - id
 *           - providerId
 *           - consumerId
 *         properties:
 *           id:
 *             description: The id of the agreement object signed by the consumer and provider,as found via the SC manager
 *             type: string
 *             example: "4663-62affe-bca353"
 *           providerId:
 *             description: The did of the provider that signed the agreement
 *             type: string
 *             example: "0x0987654321"
 *           consumerId:
 *             description: The did of the consumer that signed the agreement
 *             type: string
 *             example: "0x1234567890"
 *       rating:
 *         required:
 *           - byConsumer
 *           - forProvider
 *           - onTransaction
 *           - ratings
 *         properties:
 *           byConsumer:
 *             description: The distributed identity of the consumer creating the rating onbject
 *             type: string
 *             example: 0x1234567890
 *           forProvider:
 *             description: The distributed identity of the provider this rating is adressed to
 *             type: string
 *             example: 0x0987654321
 *           onTransaction:
 *             description: The id of the transaction the consumer rates
 *             type: string
 *             example: 63637-abcee738737-64742ade
 *           subRatings:
 *             description: The ratings of the provider in each category, specified by order.
 *             type: array
 *             example: [5,5,5,5]
 *             items:
 *               type: integer
 *             minItems: 4
 *             maxItems: 4
 *           msg:
 *             description: An optional free-text message by the consumer to be included in the rating
 *             type: string
 *             example: I was very happy with the transaction
 *       questionnaire:
 *         required:
 *           - questions
 *         properties:
 *           questions:
 *             required: true
 *             description: The array containing the questions to be rated
 *             type: array
 *             example: [
 *                      "Was the dataset provided as described in the listing?",
 *                      "Was the data transfer within the expected timeframe?",
 *                      "Was the data provider open and clear in their communication?",
 *                      "Were they any other issues or concerns in the transaction?"
 *             ]
 *             items:
 *               type: string
 *       error400:
 *         type: object
 *         required:
 *           - status
 *           - message
 *         properties:
 *           status:
 *             type: integer
 *             example: 400
 *           message:
 *             type: string
 *             example: "Consumer with did: 0x8368943574 does not exist"
 *       error401:
 *         type: object
 *         required:
 *           - status
 *           - message
 *         properties:
 *           status:
 *             type: integer
 *             example: 401
 *           message:
 *             type: string
 *             example: "Unauthorized to access this endpoint. Try to login again"
 *       error403:
 *         type: object
 *         required:
 *           - status
 *           - message
 *         properties:
 *           status:
 *             type: integer
 *             example: 403
 *           message:
 *             type: string
 *             example: "Forbidden: Your account type cannot access this endpoint"
 *       error404:
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
 *       error500:
 *         type: object
 *         required:
 *           - status
 *           - message
 *         properties:
 *           status:
 *             type: integer
 *             example: 500
 *           message:
 *             type: string
 *             example: Internal validation failure
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
 *    - name: agreements
 *      description: Provides limited functionality between greements and ratings
 */