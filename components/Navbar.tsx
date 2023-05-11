import Link from 'next/link';



export default function Navbar(){

    return(
        
        <div className="float-left w-full bg-zinc-800 text-white p-2 text-lg text-center text-left">

            <Link href="/">
                <div className="float-left m-2 p-2 hover:bg-zinc-500 hover:cursor-pointer max-[400px]:w-full max-[400px]:m-0 max-[400px]:p-1">
                    <i className="fa-solid fa-gamepad"></i> Lobby
                </div>
            </Link>

            <Link href="/profile">
                <div className="float-left m-2 p-2 hover:bg-zinc-500 hover:cursor-pointer max-[400px]:w-full max-[400px]:m-0 max-[400px]:p-1">
                    <i className="fa-solid fa-user"></i> My profile
                </div>
            </Link>


            <Link href="/top-players">
                <div className="float-left m-2 p-2 hover:bg-zinc-100 hover:cursor-pointer hover:text-amber-500 max-[400px]:w-full max-[400px]:m-0 max-[400px]:p-1">
                    <i className="fa-solid fa-trophy"></i> Top 10
                </div>
            </Link>


           

            
            
        </div>
    )
}