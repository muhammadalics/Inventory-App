const PORT = process.env.PORT | 5000;
const express = require('express');
// var cors = require('cors');
const app = express();

//https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
// Set up a whitelist and check against it:
// var whitelist = ['https://muhammadalics.github.io/React-Inventory-frontend', 'https://muhammadalics.github.io/', 
//                   'https://muhammadalics.github.io/React-Inventory-frontend/', 'https://muhammadalics.github.io']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// // Then pass them to cors:
// app.use(cors(corsOptions));

// app.use(cors());





const mongoose = require('mongoose');
const url = "mongodb+srv://testuser404:404400200@cluster0.us3q5.mongodb.net/wild-fjord?retryWrites=true&w=majority"
// const url = "mongodb://localhost/"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection
con.on('open', () => { console.log('connected!') })

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://testuser404:404400200@cluster0.us3q5.mongodb.net/wild-fjord?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });











const Inventory = require('./inventory')


const model = require('./model')
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

// const port = process.env.port 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



//GET all products-
app.get('/api/products', async (req, res) => {
    const products = await Inventory.find()
    res.json(products)
    //res.send('Hello World!!!')
})


//GET a product by id
app.get('/api/products/:id', async (req, res) => {
    const product = await Inventory.findById(req.params.id)
    res.send(`Found the product: ${product}`)

})


//POST a new product
app.post('/api/products', async (req, res) => {
    const product = new Inventory({
        department: req.body.department,
        name: req.body.name,
        size: req.body.size,
        corrosionfree: req.body.corrosionfree,
        material: req.body.material,
        weight: req.body.weight,

    })

    try {
        const newProduct = await product.save()
        res.json(newProduct)
    } catch (err) {
        res.send("Error: Could notsave new product");
        throw err;
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

// //Delete a product by id.
// app.delete('/api/products/:id', async (req, res)=>{
//     const product = await model.getProductById(req.params.id)

//     if (!product){
//         res.status(404).send('Not Found')
//     }   
//     else{        
//         res.send(product)
//         model.deleteProductById(product)
//     }   
// })


//Delete a product by id.
app.delete('/api/products/:id', async (req, res) => {
    const product = await Inventory.findById(req.params.id)

    console.log(product)
    if (!product) {
        res.status(404).send('Not Found')
    }
    else {
        res.send(product)
        // model.deleteProductById(product)
        Inventory.deleteOne({ _id: req.params.id }, function (err) {
            if (err) return handleError(err);
            // deleted at most one tank document
        });
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



// //update a new product
// app.put('/api/products', async (req, res)=>{   
//     const body = req.body    
//     const product = await model.getProductById(body.id)

//     if (!product){
//         res.status(404).send("Product not found.")
//     }   
//     else{        
//         const product = await model.getProductById(body.id)
//         model.deleteProductById(product)
//         model.postProduct(req.body)
//         res.status(200).send("Product updated!")
//     }   
// })



//update a product
app.put('/api/products', async (req, res) => {
    const body = req.body
    console.log("Body:")
    console.log(body)
    const product = await Inventory.findById(body.id)

    if (!product) {
        res.status(404).send("Product not found.")
    }
    else {
        var x = new mongoose.Types.ObjectId(body.id);
        console.log('This is body.id:' +  typeof(body.id));
        console.log('This is x:' +  typeof(x));
        try {
            await Inventory.update(
                { _id: x },

                {
                    department: body.department,
                    "name": body.name,
                    "material": body.material,
                    "weight": parseFloat(body.weight),
                    "corrosionfree": body.corrosionfree,
                    "size": body.size

                }

            )
        }
        catch (err) {
            throw err;
        }

        const product = await Inventory.findById(body.id)
        console.log(product)

        res.status(200).send("Product updated!")
    }
})




app.listen(PORT, '0.0.0.0', () => {
    console.log(`Listening on port: ${PORT}`)
})
