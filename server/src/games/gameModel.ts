import {model} from 'mongoose'
import { gameSchema } from './gameSchema'

// para los metodos de interracion con mongo
export const gameModel = model('games', gameSchema)