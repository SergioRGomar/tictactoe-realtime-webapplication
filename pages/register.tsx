import { useState } from "react"

export default function Register(){

    const [values,setValues] = useState({
        email:"",
        password:"",
        confirm_password:""
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
        }else if(values.confirm_password === ""){
            alert("confirm password is obligatory")
            return
        }
        if(values.password !== values.confirm_password){
            alert("the passwords are not match")
            return
        }

        fetch(`http://localhost:3001/users`,
        { 
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action:"register",
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
                window.location.href = "login/"
            }  
        })
        
    }
    return(
        <section className="bg-gray-400">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSumbit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={handleInputChange} type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={handleInputChange} type="password" name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input onChange={handleInputChange} type="confirm-password" name="confirm_password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                         
                            <button type="submit" className="w-full text-white bg-rose-600 hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <a href="login/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

}