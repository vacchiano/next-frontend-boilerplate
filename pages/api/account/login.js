
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
async function loginRoute(req, res) {
    // get user from database then:
    const resp = await fetch('http://localhost:8000/api/accounts/login/', {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(req.body)})
    const data = await resp.json()
    const userResp = await fetch('http://localhost:8000/api/accounts/users/me/', {method:"GET", headers:{"Authorization": `Token ${data.token}`}})
    const userData = await userResp.json()
    req.session.user = {
    token: data.token,
    id: userData.id,
    email: userData.email,
    firstName: userData.first_name,
    lastName: userData.last_name
    };
    await req.session.save();
    res.send({ ok: true });
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
  