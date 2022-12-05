import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import Menu from "../components/menu"

import getUser from "../hooks/getUser"

export default function Dashboard({ user }) {
  const Router = useRouter()

//   const [userData, setUserData] = useState()
//   const [token, setToken] = useState()

  // const userData = getUser()
  console.log(user);

  useEffect(() => {
      if (!user) {
        Router.push('/login')
      }
  }, [])
    
//     useEffect(() => {
//       const userToken = localStorage.getItem('Token')
//       setToken(userToken)
//       if (!userToken) {
//           Router.push('/login')
//         }
//   })
        
//   useEffect(() => {
//     // fetch user data
//     const getUserData = async () => {
//         if (token) {
//             try {
//                 const resp = await fetch('api/account/me', {method:"POST", headers:{"content-type":"application/json"}, body:token})
//                 if (resp.status === 200) {
//                     const data = await resp.json()
//                     //set user data
//                     console.log(data);
//                     setUserData(data.user)
//                 }
//             } catch (error) {
//                 console.log('error ', error);
//             }
//         }
//     }
    
//     getUserData()

//   }, [token])
  

  return (
    <Menu user={user}>
        <h1>Dashboard</h1>
        {user && (
            <>
                <p>{JSON.stringify(user)}</p>
                <p>{user.firstName}</p>
            </>
        )}
    </Menu>
  )
}

import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    return {
      props: {
        user: user ? user : null,
      },
    };
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
