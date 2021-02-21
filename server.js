const express = require('express');
const app = express();
const model = require('./model')

const port = process.env.port || 5000 


app.get('/', (req, res)=>{
        res.send('Hello World!!!')
})

app.get('/api/products', async (req, res)=>{
    const products = await model.getAllProducts()
    res.send(products)
   
})

app.get('/api/products/:id', async (req, res)=>{   
    const product = await model.getProductById(req.params.id)
    
    if (!product){
        res.status(404).send('Not Found')
    }   
    else{
        res.send(product)
    }   

})



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








app.listen(5000, ()=>{
    console.log(`Listening on port: ${port}`)
})


