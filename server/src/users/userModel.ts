import {model} from 'mongoose'
import { userSchema } from './userSchema'

// para los metodos de interracion con mongo
export const userModel = model('users', userSchema)