// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { stage, Event, stage_event,Band } = db 
const { Op } = require('sequelize')

//ENDPOINTS


// FIND ALL BANDS
stages.get('/', async (req, res) => {
    try {
        const foundStages = await stage.findAll({
            where: {
                stage_name: { [Op.like]: `%${req.query.stage_name ? req.query.stage_name : ''}%` }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})



// FIND A SPECIFIC BAND
stages.get('/:id', async (req, res) => {
    try {
        const foundStages = await stage.findOne({
            where: { stage_name: req.params.name },
            include: {
                model: Event,
                as: 'events',
                through: { attributes: [] }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json('error')
    }
})

// CREATE A BAND
stages.post('/', async (req, res) => {
    try {
        const newStage = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
stages.put('/:id', async (req, res) => {
    try {
        const updatedStage = await stage.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStage} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
stages.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})



// EXPORT
module.exports = stages