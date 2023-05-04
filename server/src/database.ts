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

export const searchPlayerToGame = async(user_id:any)=>{

    try{
        const usersSearchingAGame = await userModel.find({status:"searchingGame",_id:{'$ne':user_id}})

        console.log(usersSearchingAGame)
       // console.log(usersSearchingAGame)
        if(usersSearchingAGame.length === 0)
            return {status:false,user_id:user_id}
        else{
            //Seleccionamos uno y le mandamos datos de ese user
            //Cambiamos el estado del otro usuario y el mio a "matching" para evitar mas solicitudes de juego 

            return {status:true,user_id:user_id}
        }

        //return {message:`user whit socket ${socket_id} and id ${user_id} is now ${status}`}
    }catch{
        //return {error:"an uspected error as ocurred"}
    }
}



