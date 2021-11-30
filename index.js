const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


const port = process.env.PORT || 5000
const cors = require('cors');
require('dotenv').config()
// middleware 
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fq8sq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("portfolio_website");
        const projectCollection = database.collection("projects");


        app.get('/projects', async (req, res) => {
            const cursor = projectCollection.find({});
            const carCollection = await cursor.toArray();
            res.json(carCollection)
        })


        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            console.log(req.params.id)
            const query = { _id: ObjectId(id) };
            const carCollection = await projectCollection.findOne(query)
            res.json(carCollection)
        })


        app.get('/projects', async (req, res) => {
            const project = req.body;
            const result = await projectCollection.insertOne(project)
            res.json(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('EXPESS INSTALL!')
})

app.listen(port, () => {
    console.log(`HELLO Express:${port}`)
})