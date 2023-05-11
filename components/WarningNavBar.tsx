export default function WarningNavBar(){

    return(
        <div className="float-left w-full bg-red-800 text-white p-2 text-sm text-center">
            <h1>We have detected that you are not logged in. To be able to play 
            <a className="text-blue-400" href="login"> log in</a>, if you do not have an account
            <a className="text-blue-400" href="register"> create one.</a></h1>
        </div>
    )
}