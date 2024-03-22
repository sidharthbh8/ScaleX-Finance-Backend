const express = require('express')
const Router = express.Router()
const { getAllData, getVolume, getPrice, createData, updateData, deleteData } = require('../controllers/dataController')

Router.get('/all', getAllData)
Router.get('/volumes', getVolume)
Router.get('/prices', getPrice)
Router.post('/create', createData)
Router.patch('/update/:id', updateData)
Router.delete('/delete/:id', deleteData)

module.exports = Router