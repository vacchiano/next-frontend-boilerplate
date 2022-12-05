import { useState, useEffect } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import Menu from "../components/menu"

import getUser from "../hooks/getUser"

export default function Signup({ user }) {
    const Router = useRouter()

    const [signupForm, setSignupForm] = useState()
    // console.log(signupForm);

    // const userData = getUser()
    console.log(user);
  
    useEffect(() => {
        if (user) {
          Router.push('/dashboard')
        }
    }, [])

    const handleChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        setSignupForm(prevForm => {
            return {
                ...prevForm,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(signupForm);
        const resp = await fetch('/api/account/signup', {method:"POST", headers:{
            "content-type": 'application/json'
        }, body:JSON.stringify(signupForm)})
        if (resp.status === 201) {
            Router.push('/login')
        }
    }

    return (
        <Menu user={user}>
            <Head>
                <title>Signup - create an account</title>
                <meta name="description" content="Signup - create an account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main style={{padding:"10px", maxWidth:"500px", margin:"auto"}}>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="first_name">First Name</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="text" name="first_name" id="first_name" required />
                    </div>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="last_name">Last Name</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="text" name="last_name" id="last_name" required />
                    </div>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="email">Email</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="email" name="email" id="email" required />
                    </div>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="password">Password</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="password" name="password" id="password" required />
                    </div>
                    <input style={{color:"white", cursor:"pointer", borderRadius:"5px", backgroundColor:"indigo", border:"none", outline:"none", padding:"10px 30px"}} type="submit" value="Sign Up" />
                </form>
            </main>
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