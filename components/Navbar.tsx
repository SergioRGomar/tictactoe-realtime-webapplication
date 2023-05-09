


export default function Navbar(){

    return(
        
        <div className="float-left w-full bg-zinc-900 text-white p-2 text-lg text-center">

            <div className="float-left m-2 p-2 hover:bg-zinc-500 hover:cursor-pointer	">
            <a href="/"><i className="fa-solid fa-gamepad"></i> Lobby</a>
            </div>

            <div className="float-left m-2 p-2 hover:bg-zinc-500 hover:cursor-pointer	">
            <a href="profile"><i className="fa-solid fa-user"></i> My profile</a>
            </div>

            <div className="float-left m-2 p-2 hover:bg-zinc-100 hover:cursor-pointer	hover:text-amber-500">
            <a href="top-players"><i className="fa-solid fa-trophy"></i> Top 10 players</a>
            </div>
            
        </div>
    )
}