// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Event, Meet_greet, set_time, stage } = db 
const { Op } = require('sequelize')

//ENDPOINTS


// FIND ALL EVENTS
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'date', 'ASC' ] ],
            where: {
               name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})



// FIND A SPECIFIC Event
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                {
                    model: Meet_greet,
                    as: 'meet_greets',
                    include: {
                        model: Band,
                        as: 'band'
                    }
                },
                {
                    model: set_time,
                    as: 'set_times',
                    include: [
                        {
                            model: Band,
                            as: 'band'
                        },
                        {
                            model: stage,
                            as: 'stage'
                        }
                    ]
                },
                {
                    model: stage,
                    as: 'stages',
                    through:  { attributes: [] }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

// CREATE A event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Events.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A BAND
events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Events.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Events.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvent} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})



// EXPORT
module.exports = events