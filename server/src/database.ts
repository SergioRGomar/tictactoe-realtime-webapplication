import {connect} from "mongoose";
import { userModel } from './users/userModel'
import { stat } from "fs";

export const startdbConnection = async (URL_MONGO:string,database:string) => {
    try{
        const cluster = await connect(URL_MONGO,{dbName: database});
        console.log(`database "${cluster.connection.name}" already connected`);
    }
    catch (error){
        console.error(error);
    }
};

export const updateUserStatus = async (user_id:string,socket_id:string,status:string)=>{
    
    ///HAY QUE BUSCAR SI EL USUARIO ESTABA YA EN UN JUEGO Y LO MANDAMOS AL JUEGO

    let match = {}
    if(user_id === "")
        match = {socket_id: socket_id}
    else
        match = {_id: user_id}

    try{
        const socket_aux = socket_id
        if(status === "offline")
            socket_id = ""

        await userModel.updateOne(match, {socket_id:socket_id, status:status})

        return {user_id:user_id,message:`user whit socket ${socket_aux} and id ${user_id} is now ${status}`}
    }catch{
        return {error:"an uspected error as ocurred"}
    }
}

export const getUsersToPair = async()=>{
    try{
        const currentUsers =  await userModel.find({status:"searchingGame"}, "email socket_id")
        if(currentUsers.length >= 2){
            const user_1 = currentUsers[0]
            const user_2 = currentUsers[1]


            await userModel.updateOne({_id:user_1._id}, {status:"decidingToPlay"})
            await userModel.updateOne({_id:user_2._id}, {status:"decidingToPlay"})

            return {usersToPair:{user_1:user_1,user_2:user_2}}
        }else{
            return {error:"no users available to play"}
        }
    }catch{
        return {error:"an uspected error as ocurred"}
    }
}



