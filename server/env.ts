import {config} from 'dotenv'
config()

export const PORT = process.env.PORT
export const URL_MONGO = process.env.URL_MONGO
export const DATABASE = process.env.DATABASE