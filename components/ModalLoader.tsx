import styles from '../styles/modal.module.css'

export default function LoadingModal(){

    return(
        <div className={" "+styles.Form +" h-full "}>
            <div className={styles.contenido + " bg-black-200"}>
                
                <div className='text-black flex justify-center'>
                    <img className='h-20 w-fit' src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loader.gif" />
                </div>

                <div className='text-black flex justify-center'>
                    <h1 className='text-2xl text-white m-3'>Searching a game...</h1>
                </div>
            </div>
        </div>

    )
}