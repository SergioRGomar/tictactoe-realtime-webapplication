import { useEffect } from "react"
import { getLadeboard } from "../general/httprequest"


export default function Ladeboard(){

    useEffect(()=>{
        getLadeboard().then((response)=>{
            console.log(response)    
        })
    },[])
    
    return(
       <div className="bg-amber-500 flex flex-col items-center	">
            <div>
            TOP 10 players
            </div>
       </div>
    )

}