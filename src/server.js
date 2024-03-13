/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import {env} from '~/config/environment'
import exitHook from 'async-exit-hook'
import {CONNECT_DB, CLOSE_DB} from '~/config/mongodb'
import {APIs_V1} from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () =>{
  const app = express()

  //Fix CORS problem
  app.use(cors(corsOptions))

  //To parse all the Json data
  app.use(express.json())

  //Use API v1
  app.use('/v1', APIs_V1)

  //Error handle middleware
  app.use(errorHandlingMiddleware)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  //Close MongoDB connection, cleanning up
  exitHook(() => {
    console.log('4. Disconnecting..')
    CLOSE_DB()
    console.log('5. Disconnected.')
  })
}

//Invoked Immediately/ IIFE
(async () => {
  try {
    console.log('1. Connecting to MongoDB Cloud Atlas!')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlas!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

//Different way to invoke the database
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
