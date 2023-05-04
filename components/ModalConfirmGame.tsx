import { useState } from 'react'
import styles from '../styles/modal.module.css'


type propsModalAceptGame = {
    player:string,
    onDeclineGame:Function,
    onAcceptGame:Function,
    enemyStatusText:string,
    showBotons:string
}
export default function ModalConfirmGame(props:propsModalAceptGame){

    const [isGameAccepted,setIsGameAccepted] = useState(false)
    function gameAccepted(){
        setIsGameAccepted(true)
        props.onAcceptGame()
    }
    return(
        <div className={styles.Form +" h-full"}>
            <div className={styles.contenido + " bg-stone-200"}>
                
                <div className='text-black flex flex-col justify-center'>
                    
                    <h1 className='text-2xl'>Game findend</h1>
                    <h1 className='text-4xl'>You are the player {props.player}</h1>

                    <h1 className='text-red-900'>{props.enemyStatusText}</h1>
                </div>

                { isGameAccepted ?
                    <div className={"flex justify-center " +props.showBotons}>
                        <h1 className='text-white font-bold bg-green-900 p-1 m-2 text-2xl'>Game accepted. Wait the response of the enemy</h1>
                    </div>
                    :
                    <div className={"flex justify-center " +props.showBotons}>
                        <button onClick={gameAccepted} className='text-xl w-6/12 text-white text-center bg-blue-600 hover:bg-blue-800 font-bold rounded-lg px-2 py-1 m-4'>Accept game</button>
                        <button onClick={event => props.onDeclineGame()} className='text-xl w-6/12 text-white text-center bg-red-600 hover:bg-red-800 font-bold rounded-lg px-2 py-1 m-4'>Decline game</button>
                    </div>
                }

            </div>

        </div>

    )
}