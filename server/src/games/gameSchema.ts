import { Schema} from 'mongoose'

export const gameSchema = new Schema({
    board: {
        type:Array<Number>,
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
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Object,
        required:true
    }
},{versionKey:false})