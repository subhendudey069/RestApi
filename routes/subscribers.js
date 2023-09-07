const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:roll', getSubscriber, (req, res) => {
  res.json(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    roll:req.body.roll,
    name: req.body.name,
    stream: req.body.stream,
    year: req.body.year
  })
  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Updating One
router.patch('/:roll', getSubscriber, async (req, res) => {
  if (req.body.roll != null) {
    res.subscriber.roll = req.body.roll
  }
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }
  if (req.body.stream != null) {
    res.subscriber.stream = req.body.stream
  }
  if (req.body.year != null) {
    res.subscriber.year = req.body.year
  }
  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete('/:roll', getSubscriber, async (req, res) => {
  try {
    await Subscriber.deleteOne({ roll: req.params.roll });
    res.status(200).json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


async function getSubscriber(req, res, next) {
  let subscriber
  try {
    // Use the "roll" field to search for a subscriber
    subscriber = await Subscriber.findOne({ roll: req.params.roll })

    // If the subscriber is not found, return a 404 response
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    // Handle any errors that occur during the database query
    return res.status(500).json({ message: err.message })
  }

  // Attach the found subscriber to the response object
  res.subscriber = subscriber
  next()
}

module.exports = router