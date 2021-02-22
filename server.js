const express = require('express');
const app = express();

// const mongoose = require('mongoose');
const mongoose = require('mongodb').MongoClient;
// const url = 'mongodb://localhost/inventorydb' 
mongoose.connect("mongodb+srv://testuser404:404400200@cluster0.us3q5.mongodb.net/wild-fjord?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection
// con.on('open', () => 
// {console.log('connected!')})
const Inventory = require('./inventory')


const model = require('./model')
const bodyParser = require('body-parser');

const port = process.env.port 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



//GET all products-
app.get('/api/products', async (req, res)=>{
    const products = await Inventory.find()    
    res.json(products)
    //res.send('Hello World!!!')
})


//GET a product by id
app.get('/api/products/:id', async (req, res)=>{
    const product = await Inventory.findById(req.params.id)
    res.send(`Found the product: ${product}`)

})


//POST a new product
app.post('/api/products', async (req, res)=>{   
    const product = new Inventory({
        department: req.body.department,
        name: req.body.name,
        size: req.body.size,
        corrosionfree: req.body.corrosionfree,
        material: req.body.material,
        weight: req.body.weight,

    })

    try{
        const newProduct = await product.save()
        res.json(newProduct)
    }catch(err){
        res.send("Error: Could notsave new product")
    }

})













//Get all the products
// app.get('/api/products', async (req, res)=>{
//     const products = await model.getAllProducts()
//     res.send(products)
 
// })

//Get a product by ID
// app.get('/api/products/:id', async (req, res)=>{   
//     const product = await model.getProductById(req.params.id)
    
//     if (!product){
//         res.status(404).send('Not Found')
//     }   
//     else{
//         res.send(product)
//     }   
// })

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

// //POST a new product
// app.post('/api/products', async (req, res)=>{   
//     const body = req.body    
//     const product = await model.getProductById(body.id)

//     if (!product){
//         model.postProduct(req.body)
//         res.status(200).send("New product created.")
//     }   
//     else{        
//         res.status(400).send(`Product of id ${body.id} already exists.`)
//     }   
// })



//update a new product
app.put('/api/products', async (req, res)=>{   
    const body = req.body    
    const product = await model.getProductById(body.id)

    if (!product){
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


