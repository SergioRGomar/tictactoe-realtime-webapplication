import Board from "@/components/Board";

import { useEffect, useState } from "react";



export default function Home(){

   
    useEffect(() => {
        const user_id = readCookie('user_id_tictactoe')
        console.log(user_id)
        if(!user_id){
            window.location.href = "login"
        }
        else{
            fetch(`http://localhost:3001/users?user_id=${user_id}`,
            { 
              method: "GET", 
              headers: {
                "Content-Type": "application/json",
              }  
            }) 
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                
            })

        }
    }, []);


    return(
        <main className="bg-amber-300">
            <div className="Lobby">Loby</div>
            <div className="bg-pink-200 p-4">
                Tablero
                <Board />
            </div>
        </main>
    )
}

function readCookie(name:string) {

    var nameEQ = name + "="; 
    var ca = document.cookie.split(';');
  
    for(var i=0;i < ca.length;i++) {
  
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        return decodeURIComponent( c.substring(nameEQ.length,c.length) );
      }
  
    }
  
    return null;
  
  }
  