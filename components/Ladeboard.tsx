import { useEffect, useState } from "react"
import { getLadeboard } from "../general/httprequest"

type userLadeboard = {
    _id:string,
    username:string,
    victories:number
}
export default function Ladeboard(){

    const [users,setUsers] = useState(Array<userLadeboard>)

    useEffect(()=>{
        getLadeboard().then((response)=>{
            setUsers(response.users)   
        })
    },[])

    return(
        <div className="float-left w-full">
            <div className="flex flex-col items-center m-5">
                <div className="sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 w-10/12 flex flex-col items-center bg-zinc-800  rounded-3xl p-5">
                   
                    <div className="flex flex-col items-center text-amber-400 text-5xl">
                        <h1><i className="fa-solid fa-trophy"></i></h1>
                    </div>
                   
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl p-2 text-white font-bold">Top 10 best players</h1>
                    </div>

                    <div className="text-m text-green-400 flex flex-col items-center pb-3">
                        
                        {
                            users.map((user) =>
                                <span key={user._id}><b className="font-black text-white"></b> {user.username} <b className="font-black text-white"> have </b> {user.victories} <b className="font-black text-white"> victories </b> </span>
                            )
                        }
                    </div>
                </div>
            </div>
       </div>
    )

}