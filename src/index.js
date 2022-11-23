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
 *
 */
import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import consumersRouter from './routes/consumersRouter.js'
import providersRouter from './routes/providersRouter'
import swaggerUI from 'swagger-ui-express'
import swaggerDocs, {swaggerOptions} from './services/swaggerService'
import ratingsRouter from './routes/ratingsRouter'
import authenticateJWT from './middleware/JWTAuthenticator'

dotenv.config()
const BACKEND_PORT = process.env.BACKEND_PORT || 3001

const app = express();
app.use(express.static('public'))
app.use(json());
app.use(urlencoded({extended: true}))
app.use(authenticateJWT)
app.use('/api/', consumersRouter)
app.use('/api/', providersRouter)
app.use('/api/', ratingsRouter)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerOptions))

let server = app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}...`);
});

export default app