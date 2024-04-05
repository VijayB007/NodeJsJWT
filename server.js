const express= require('express');

const jwt= require('jsonwebtoken')
const bodyParser = require('body-parser');

const app= express();
app.use(bodyParser.json());

const secretkey='your_secret_key'

const port =5000;

const users=[{
        id:1,
        username:'vijay',
        password:"1234"
    },
    {
        id:2,
        username:'ramu',
        password:"1234"
    }]

app.get('/',(req,res)=>{
    res.send('welcome')
})

app.get('/login',(req,res)=>{
    const {username, password}= req.body;
    const user =users.find(u=>u.username===username && u.password===password);
    console.log(user);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
        
    } else {
        const token = jwt.sign({ id: user.id, username: user.username }, secretkey, { expiresIn: '1h' })
        res.send(token);
    }

})

app.get('/protected', (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract JWT token from the Authorization header
    jwt.verify(token, secretkey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.json({ message: 'Welcome to the protected route!', user: decoded });
    });
});




app.listen(port,()=>{
    console.log(`server run on http//localhost:${port}`);
})