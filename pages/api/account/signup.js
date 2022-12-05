export default async function handler(req, res) {
    if (req.method === "POST") {
        // send req to django api
        const resp = await fetch('http://localhost:8000/api/accounts/signup/', {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify(req.body)})
        console.log(resp);
        if (resp.status === 201) {
            res.status(201).json({ "message": 'Account created' })
        } else {
            res.status(500).json({ "message": 'Error signing up' })
        }
    } else {
        res.status(500).json({"message": 'method not allowed'})
    }
  }
  