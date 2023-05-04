
const urlUsersApi = "http://localhost:3001/users"


export const getUser = async (user_id:string) => {
    try{
        const response = await fetch(`${urlUsersApi}?user_id=${user_id}`,{ 
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }  
        })
        const result = (await response.json());
        return result;
    }
    catch{
        return "error getting user"
    }
}

