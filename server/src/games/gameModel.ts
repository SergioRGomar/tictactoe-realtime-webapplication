import {model} from 'mongoose'
import { gameSchema } from './gameSchema'

export const gameModel = model('games', gameSchema)