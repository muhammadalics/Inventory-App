const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({

    department: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    corrosionfree: {
        type: Boolean,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('Inventory', inventorySchema)