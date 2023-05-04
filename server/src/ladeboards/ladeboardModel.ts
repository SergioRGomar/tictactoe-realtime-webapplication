import {model} from 'mongoose'
import { ladeboardSchema } from './ladeboardSchema'

// para los metodos de interracion con mongo
export const ladeboardModel = model('ladeboards', ladeboardSchema)