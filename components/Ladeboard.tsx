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
       <div className=" flex flex-col bg-blue-700 text-white items-center mb-10 pb-10">
            <div className="text-3xl font-bold my-4">
                The best players
            </div>
            {
                users.map((user) =>
                    <div className="font-bold tex-xl" key={user._id}>User: {user.username} :::: Victories: {user.victories}</div>
                )
            }
       </div>
    )

}