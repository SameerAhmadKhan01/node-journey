const express = require("express");

const app = express();

const PORT = 8000;

app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

// singup and give me back a token
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if(EMAILS.has(email)){
    return res.status(404).json({error : "Email already taken"})
  }

  //create a token
  const token = `${Date.now()}`

  //do a entry in diary
  DIARY[token] = {name,email,password}
  EMAILS.add(email);

  return res.json({status:'succes',token})
    
});


app.get('/me' , (req,res) => {
    const {token} = req.body;
    if(!token){
        return res.status(400).json({error : 'Missing Token'})
    }

    if(!(token in DIARY)){
        return res.status(400).json({error : 'Invalid Token'})
    }

    const entry = DIARY[token];

    return res.json({data : entry})
})

app.listen(PORT, () => console.log(`Server is running at PORT : ${PORT}`));
