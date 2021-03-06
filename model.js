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

function deleteProductById(item){
    const index = products.indexOf(item)
    products.splice(index, 1);
    console.log(products[index]);
}

function postProduct(body){
    products.push(body)
}


module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById,
    postProduct
}