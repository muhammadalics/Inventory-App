const express = require('express');
const app = express();
const model = require('./model')
const bodyParser = require('body-parser');

const port = process.env.port || 5000 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/', (req, res)=>{
        res.send('Hello World!!!')
})

//Get all the products

app.get('/api/products', async (req, res)=>{
    const products = await model.getAllProducts()
    res.send(products)
 
})

//Get a product by ID

app.get('/api/products/:id', async (req, res)=>{   
    const product = await model.getProductById(req.params.id)
    
    if (!product){
        res.status(404).send('Not Found')
    }   
    else{
        res.send(product)
    }   
})

//Delete a product by id.

app.delete('/api/products/:id', async (req, res)=>{
    const product = await model.getProductById(req.params.id)

    if (!product){
        res.status(404).send('Not Found')
    }   
    else{        
        res.send(product)
        model.deleteProductById(product)
    }   
})

//POST a new product

app.post('/api/products', async (req, res)=>{
    // const product = await model.getProductById(req.params.id)

    const body = req.body
    console.log(body)
    const product = await model.getProductById(body.id)

    if (!product){
        model.postProduct(req.body)
        res.send(product)
    }   
    else{        
        res.status(400).send(`Product of id ${req.params.id} already exists.`)
    }   
})





app.listen(5000, ()=>{
    console.log(`Listening on port: ${port}`)
})


