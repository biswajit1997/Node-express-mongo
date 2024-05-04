const express = require('express')
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js')
const app = express()


app.listen(3000, () => {
    console.log("3000")
})

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//routes
app.use('/api/products', productRoute);


app.get('/', function (req, res) {
    res.send('node ok World')
})

mongoose.connect("mongodb://localhost:27017/")
    .then(() => {
        console.log("connected")
    })
    .catch(() => {
        console.log("connection faild")
    })