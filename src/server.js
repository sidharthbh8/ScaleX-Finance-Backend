const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')

const route = require('./routes/route')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(cors()) // for cross-origin requests from frontend
app.use("/api", route)
app.get('/', (req, res) => {
    res.send(`
    <h1>/api/volumes -> get all volumes, 
    <br> /api/prices -> get all prices,
    <br> /api/all -> get all data, 
    <br> /api/create -> create new data, 
    <br> /api/update/:id -> can modify specific fields of data like priceNative can be updated without affecting other fields,
    <br> /api/delete/:id -> delete data by id
    </h1>`)
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    require('./db/mongoose')
    console.log(`Server running at port ${port}`);
})