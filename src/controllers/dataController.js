const Data = require('../models/dataModel');

const createData = async (req, res) => {
    try {
        const { priceNative, priceUsd, volume } = req.body;
        const { h24, h6, h1, m5 } = volume;
        if (!priceNative || !priceUsd || !h24 || !h6 || !h1 || !m5) {
            return res.status(400).json({ error: 'Please provide all fields' })
        }

        const data = new Data({ priceNative, priceUsd, volume: { h24, h6, h1, m5 } })
        await data.save()
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAllData = async (req, res) => {
    try {
        const data = await Data.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getVolume = async (req, res) => {
    try {
        const volumeData = await Data.find({}, 'volume')
        if (!volumeData) {
            return res.status(404).json({ error: 'No data found' })
        }
        res.status(200).json(volumeData)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getPrice = async (req, res) => {
    try {
        const priceData = await Data.find({}, 'priceNative priceUsd')
        if (!priceData) {
            return res.status(404).json({ error: 'No data found' })
        }
        res.status(200).json(priceData)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateData = async (req, res) => {
    const allowedUpdates = ['priceNative', 'priceUsd', 'volume']
    const updates = Object.keys(req.body)
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    const { id } = req.params;

    try {
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid update request' })
        }
        const data = await Data.findById(id)
        if (!data) {
            return res.status(404).json({ error: 'Data not found' })
        }

        updates.forEach((update) => {
            data[update] = req.body[update]
        })

        await data.save()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findByIdAndDelete(id)
        if (!data) {
            return res.status(404).json({ error: 'Data not found' })
        }
        res.status(200).json({ message: 'Data deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { getAllData, getVolume, getPrice, createData, updateData, deleteData }