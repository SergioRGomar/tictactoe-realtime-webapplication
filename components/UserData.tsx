import { useEffect, useState } from "react";
import { getCookie } from "@/general/generalfunctions";
import { getUser } from "../general/httprequest"

type objUserData = {
    _id:string,
    email:string,
    victories:number,
    defeats:number, 
    draws:number,
    total_games:number,
    status:string
}

const initUserData:objUserData = {
    _id:"",
    email:"",
    victories:0,
    defeats:0, 
    draws:0,
    total_games:0,
    status:""
}

export default function UserData(){

    const [currentUser, setCurrentUser] = useState(initUserData)

    useEffect(() => {
        const user_id = getCookie('user_id_tictactoe')
        if(!user_id){
            window.alert("You need to have an account to see this. Please login or create a new account. Redirecting...")
            window.location.href = "login"
        }else{
          getUser(user_id).then((response)=>{
            setCurrentUser(response.user)
            //socket.emit('newUserOnline', response.user._id)
          })
        }
                
    }, []);

    return(
        <div className="float-left w-full">
            <div className="flex flex-col items-center m-5"> 
                <div className="sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 w-10/12 flex flex-col items-center bg-zinc-800  rounded-3xl p-5">
                    <div className="flex flex-col items-center text-green-500 text-5xl">
                        <h1><i className="fa-solid fa-user"></i></h1>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl p-2 text-white font-bold">Statistics of  <span className="text-green-400">{currentUser.email}</span></h1>
                    </div>
                    <div className="text-m text-green-400 flex flex-col items-center pb-3">
                        <span><b className="font-black text-white">Victories:</b> {currentUser.victories}</span>
                        <span><b className="font-black text-white">Defeats:</b> {currentUser.defeats}</span>
                        <span><b className="font-black text-white">Draws:</b> {currentUser.draws}</span>
                        <span><b className="font-black text-white">Total games:</b> {currentUser.draws + currentUser.defeats + currentUser.victories}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}