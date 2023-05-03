import express from 'express'
import {userRouter} from './users/userRouter'
import {config} from 'dotenv'
import cors from 'cors';
import { startConnection } from "./database"


config({path: '/.env'})

const PORT = 3001
const URL_MONGO = "Secret key"

//const PORT = process.env.PORT;
//const URL_MONGO = process.env.URL_MONGO!;
const database = "tictactoe"

startConnection(URL_MONGO,database)

const app = express()

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(express.json())
app.use('/users',userRouter)

app.listen(PORT,()=>{
    console.log("Server listen on port 3001")
})