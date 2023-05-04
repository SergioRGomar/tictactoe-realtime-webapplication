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
            alert("email is obligatory")
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
                alert(response.message)
                document.cookie = `user_id_tictactoe=${response.user._id}; path=/`
                window.location.href = `/`
            }  
        })
        
    }

    return(
        <section className="bg-gray-600">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-gray-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form onSubmit={handleSumbit} className="space-y-4 md:space-y-6" >
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                                <input onChange={handleInputChange}  type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleInputChange}  type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="register/" className="text-sm font-medium text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                            <button  type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   ">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="register/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
    )
}