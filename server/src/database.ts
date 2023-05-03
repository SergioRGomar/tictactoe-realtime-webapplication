import {connect} from "mongoose";

export const startConnection = async (URL_MONGO:string,database:string) => {
    try{
        const cluster = await connect(URL_MONGO,{dbName: database});
        console.log(`database "${cluster.connection.name}" already connected`);
    }
    catch (error){
        console.error(error);
    }
};