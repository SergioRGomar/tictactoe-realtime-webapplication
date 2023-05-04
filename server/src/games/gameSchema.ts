import { Schema} from 'mongoose'

export const gameSchema = new Schema({
    board: {
        type:Array<String>,
        required:true 
    },
    player_1:{
        type:Object,
        required:true
    },
    player_2:{
        type:Object,
        required:true
    },
    turn:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Object,
        required:true
    },
    movements:{
        type:Number,
        required:false
    },
    winner:{
        type:Object,
        required:false
    },
    result:{
        type:String,
        required:false
    }
},{versionKey:false})