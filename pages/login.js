import { useState, useEffect } from "react"

import Head from "next/head"
import { useRouter } from "next/router"

import Menu from "../components/menu"

import getUser from "../hooks/getUser"

export default function Login({ user }) {
    const Router = useRouter()

    const [loginForm, setLoginForm] = useState()
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
        setLoginForm(prevForm => {
            return {
                ...prevForm,
                [e.target.name] : e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(loginForm);
        const resp = await fetch('/api/account/login', {method:"POST", headers:{
            "content-type": 'application/json'
        }, body:JSON.stringify(loginForm)})
        if (resp.status === 200) {
            Router.push('/dashboard')
            const data = await resp.json()
            localStorage.setItem('Token', JSON.stringify(data.token))
            console.log('logged in ', data);
        }
    }

    return (
        <Menu user={user}>
            <Head>
                <title>Login - Sign into your account</title>
                <meta name="description" content="Login - Sign into your account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main style={{padding:"10px", maxWidth:"500px", margin:"auto"}}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="email">Email</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="email" name="email" id="email" required />
                    </div>
                    <div style={{display:"block", width:"100%", marginTop:"10px", marginBottom:"10px"}}>
                        <label htmlFor="password">Password</label>
                        <input style={{width:"100%", height:"2em"}} onChange={handleChange} type="password" name="password" id="password" required />
                    </div>
                    <input style={{color:"white", cursor:"pointer", borderRadius:"5px", backgroundColor:"indigo", border:"none", outline:"none", padding:"10px 30px"}} type="submit" value="Login" />
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