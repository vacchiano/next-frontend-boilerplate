import { useState, useEffect } from "react"


export default function getUser() {
    const [userData, setUserData] = useState()
    const [token, setToken] = useState()
    
    useEffect(() => {
        const userToken = localStorage.getItem('Token')
        setToken(userToken)
        if (!userToken) {
            setUserData(null)
          }
    }, [])
          
    useEffect(() => {
      // fetch user data
      const getUserData = async () => {
        if (token) {
            try {
                const resp = await fetch('api/account/me', {method:"POST", headers:{"content-type":"application/json"}, body:token})
                if (resp.status === 200) {
                    const data = await resp.json()
                    //set user data
                    console.log(data);
                    setUserData(data.user)
                }
            } catch (error) {
                console.log('error ', error);
            }
        }
      }
      
      getUserData()
  
    }, [])

    return userData
}
