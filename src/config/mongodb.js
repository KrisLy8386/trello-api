import {MongoClient, ServerApiVersion} from 'mongodb'
import { env } from './environment'

//create an instance fro trello database
let trelloDatabaseInstance = null

//initialice an object for mongoClientInstance to connect to MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI,{
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Connect to the DB. Only start the server if successfully connecting to the database
export const CONNECT_DB = async () => {
  //Intialize the connect to MongoDB Atlas with the declared URI in the body of mongoClientInstance
  await mongoClientInstance.connect()

  //If successfully connecting to the database, get the name of database and assign it to trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//To close the connection to the database
export const CLOSE_DB = async () => {
  console.log('Closing connection')
  await mongoClientInstance.close()
}

//To get the data from database, export the database instance. Must only used after successfully connecting to the database
export const GET_DB = () =>{
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!!!')
  return trelloDatabaseInstance
}

