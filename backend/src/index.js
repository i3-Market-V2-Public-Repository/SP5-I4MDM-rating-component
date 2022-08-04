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

dotenv.config()
const BACKEND_PORT = process.env.BACKEND_PORT || 3001

const app = express();
app.use(json());
app.use(express.static('public'))
app.use(urlencoded({extended: true}))
app.use('/api/', consumersRouter)
app.use('/api/', providersRouter)
app.use('/api/', ratingsRouter)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerOptions))

let server = app.listen(BACKEND_PORT, () => {
    console.log(`App running on port ${BACKEND_PORT}...`);
});

// export const id_token ={
//     type: "consumer",
//     did: "0x1234567890",
//     name: 'Prov Ider',
//     email: 'provider@test.com',
//     debug: true,
//     //debug: false,
// }

export const encoded_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY29uc3VtZXIiLCJkaWQiOiIweDEyMzQ1Njc4OTAiLCJuYW1lIjoiUHJvdiBJZGVyIiwiZW1haWwiOiJwcm92aWRlckB0ZXN0LmNvbSIsImRlYnVnIjoidHJ1ZSJ9.QKzKUOrHcKBKucafZNxZbu_n0HKDdL3NibS6PhdRPnQ"

export default app