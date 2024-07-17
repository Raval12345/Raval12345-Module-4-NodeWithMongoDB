require('dotenv').config();
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb')

const port = process.env.PORT || 4000;

// Initialize Express app
const app = express();

// Middleware to parse JSON body
app.use(express.json());

//Database Path
const path = 'mongodb://localhost:27017'
const dbname = 'shopping_db'

//all product from database
app.get('/product/all', async (req, res) => {

    //create a new mongoclient
    const client = new MongoClient(path)

    try {
        await client.connect()
        const db = client.db(dbname)
        const collection = db.collection('Product')
        const result = await collection.find().toArray()
        res.status(200).json(result)
        client.close();

    } catch (error) {

        console.log(error)
        res.status(500).json(result)

    }
})
//update product price
app.patch('/product/:id', async (req, res) => {

    const pro_id = req.params.id;

    const client = new MongoClient(path)

    try {

        await client.connect()
        const db = client.db(dbname)
        const collection = db.collection('Product')
        const result = await collection.updateOne({ _id: new ObjectId(pro_id) }, { $set: req.body })
        res.status(200).json(result)

    } catch (error) {

        res.status(400).json(error)

    }
})
// delete product using its id
app.delete('/product/delete/:id', async (req, res) => {

    const pro_id = req.params.id;

    const client = new MongoClient(path)

    try {

        await client.connect()
        const db = client.db(dbname)
        const collection = db.collection('Product')
        const result = await collection.deleteOne({ _id: new ObjectId(pro_id) });
        res.status(200).json(result)
        console.log("succesful deleted");
    } catch (e) {
        console.log(e);
    }

})

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
