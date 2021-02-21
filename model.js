const products = require('./data')



function getAllProducts(){
    return new Promise((resolve, reject)=>{
        resolve(products)
    })
}

function getProductById(id){
    return new Promise((resolve, reject)=>{
        const productbyid = products.find((p) => p.id === id)
        resolve(productbyid)
    })
}


module.exports = {
    getAllProducts,
    getProductById
}