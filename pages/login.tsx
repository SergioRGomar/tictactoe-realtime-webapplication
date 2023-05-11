import { useState } from "react";

export default function Login(){
    
    const [values,setValues] = useState({
        email:"",
        password:""
    })
    const handleInputChange = (event: { target: { name: string; value: string } })=>{
        const {name,value} = event.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSumbit = (event: { preventDefault: () => void })=>{
        event.preventDefault()
        if(values.email === ""){
            alert("username is obligatory")
            return
        }else if(values.password === ""){
            alert("password is obligatory")
            return
        }

        console.log(values)
        fetch(`http://localhost:3001/users`,
        { 
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action:"login",
            email:values.email,
            password:values.password
          })
        }) 
        .then((response) => response.json())
        .then((response) => {
            if(response.error)
                alert(response.error)
            else{
               // alert(response.message)
                document.cookie = `user_id_tictactoe=${response.user._id}; path=/`
                window.location.href = `/`
            }  
        })
        
    }

    return(
        <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-zinc-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                        <h1 className="font-sigmar_ text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                            <span className="text-red-500">X</span> ~ Tic Tac Toe ~ <span className="text-blue-500">O</span>
                        </h1>

                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl text-center">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSumbit} className="space-y-4 md:space-y-6" >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Your username</label>
                                <input onChange={handleInputChange}  type="text" name="email" id="email" className="bg-zinc-800 text-zinc-200 sm:text-sm rounded-lg block w-full p-2.5" placeholder="username" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input onChange={handleInputChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-zinc-800 text-zinc-200 sm:text-sm rounded-lg block w-full p-2.5" />
                            </div>
                         
                            <button  type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet? <a href="register/" className="font-medium text-blue-600 hover:underline">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
    )
}