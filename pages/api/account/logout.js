
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function logoutRoute(req, res) {
    console.log(req.session);
    if (req?.session?.user?.token) {
        const token = req.session.user.token
        const resp = await fetch('http://localhost:8000/api/accounts/logout/', {method:"GET", headers:{"Authorization": `Token ${token}`}})
    }
    req.session.destroy();
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