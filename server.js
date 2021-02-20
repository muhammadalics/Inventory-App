const express = require('express');
const app = express();

const port = process.env.port || 5000 



app.get('/', (req, res)=>{
    res.send('Hello World!!!')
})

app.get('/products/kitchen', (req, res)=>{
    res.send('Hello Kitchen!!!')
})

app.get('/products/outdoors', (req, res)=>{
    res.send('Hello outdoors!!!')
})

app.get('/products/bath', (req, res)=>{
    res.send('Hello bath!!!')
})

app.get('/products/plumbing', (req, res)=>{
    res.send('Hello plumbing!!!')
})





app.listen(5000, ()=>{
    console.log(`Listening on port: ${port}`)
})


