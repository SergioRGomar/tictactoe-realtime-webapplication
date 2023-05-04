import {model} from 'mongoose'
import { ladeboardSchema } from './ladeboardSchema'

export const ladeboardModel = model('ladeboards', ladeboardSchema)