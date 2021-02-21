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
    // console.log(index);
    // console.log(products[index]);
    products.splice(index, 1);
    console.log(products[index]);
}

module.exports = {
    getAllProducts,
    getProductById,
    deleteProductById
}