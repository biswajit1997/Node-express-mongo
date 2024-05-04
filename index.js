const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')
const app = express()


app.listen(3000,()=>{
    console.log("3000")
})

app.use(express.json());

//create
app.post('/api/products', async (req,res)=>{
   try {
    const product = await Product.create(req.body)
    res.status(200).json(product)
   } catch (error) {
    res.status(500).json({message : error.message})
   }
})

//get
app.get('/api/products', async (req,res)=>{
    try {
     const products = await Product.find({})
     res.status(200).json(products)
    } catch (error) {
     res.status(500).json({message : error.message})
    }
 })

 //get by id
 app.get('/api/products/:id', async (req,res)=>{
    try {
        const { id }= req.params;
     const product = await Product.findById(id)
     res.status(200).json(product)
    } catch (error) {
     res.status(500).json({message : error.message})
    }
 })

 // update

app.put('/api/product/:id', async (req,res)=>{
    try {
        const { id }= req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
     res.status(500).json({message : error.message})
    }
 })

 //delete

 app.delete('/api/product/:id', async (req,res)=>{
    try {
        const { id }= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: "Product not found"})
        }
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
     res.status(500).json({message : error.message})
    }
 })

app.get('/', function (req, res) {
  res.send('node ok World')
})

mongoose.connect("mongodb://localhost:27017/")
.then(()=>{
    console.log("connected")
})
.catch(()=>{
    console.log("connection faild")
})