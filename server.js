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
    const body = req.body    
    const product = await model.getProductById(body.id)

    if (!product){
        model.postProduct(req.body)
        res.status(200).send("New product created.")
    }   
    else{        
        res.status(400).send(`Product of id ${body.id} already exists.`)
    }   
})




//update a new product

app.put('/api/products', async (req, res)=>{   
    const body = req.body    
    const product = await model.getProductById(body.id)

    if (!product){
        //model.postProduct(req.body)
        res.status(404).send("Product not found.")
    }   
    else{        
        const product = await model.getProductById(body.id)
        model.deleteProductById(product)
        model.postProduct(req.body)
        res.status(200).send("Product updated!")
    }   
})

app.listen(5000, ()=>{
    console.log(`Listening on port: ${port}`)
})


