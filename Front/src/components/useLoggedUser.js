import {useState} from "react"

function useLoggedUser(){
   const [loggedUser, setLoggedUser] = useState("")
   return {loggedUser, setLoggedUser}
}

export default useLoggedUser