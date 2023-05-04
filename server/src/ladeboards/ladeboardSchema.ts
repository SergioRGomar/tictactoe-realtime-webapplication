import { Schema} from 'mongoose'
export const ladeboardSchema = new Schema({
    user_id: {
        type:String,
        required:true 
    },
    draws:{
        type:Number,
        required:true
    },
    victories:{
        type:Number,
        required:true
    },
    defeats:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    }
},{versionKey:false})