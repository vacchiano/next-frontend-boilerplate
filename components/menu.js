import { useRouter } from "next/router";

export default function Menu({ children, user }) {
  const router = useRouter()

  const handleLogout = async () => {
      try {
        // send request to logout api with the user token
        const resp = await fetch('/api/account/logout')
        if (resp.status === 200) {
          router.push('/login')
        }
      } catch (error) {
        console.log('error logging out ', error);
      }
    
  }

  return (
    <div>
        <nav style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 20px"}}>
        <h1>My App</h1>
        <ul style={{display:"flex", listStyle:"none"}}>
        {user?.id ? (
            <>
            <li style={{padding:"0 10px"}}>logged in</li>
            <li style={{padding:"0 10px"}}>Dashboard</li>            
            <li onClick={handleLogout} style={{padding:"0 0 0 10px"}}>logout</li>
            </>
        ) : (
            <>
            <li style={{padding:"0 10px"}}>logged out</li> 
            <li style={{padding:"0 10px"}}>Signup</li> 
            <li style={{padding:"0 0 0 10px"}}>Login</li> 
            </>
        )}
        </ul>
        </nav>
        <div style={{padding:"0 20px"}}>
            { children }
        </div>
    </div>
  )
}
