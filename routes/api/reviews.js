const express = require("express");
const router = express.Router();


// Get Review Model
const Review = require("../../models/Review");

router.post('/create', async (req, res) => {
    Review.create(req.body, (error, createdReview) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdReview) 
    })
})

router.get('/:id', (req, res) => {
    Review.find({reviewedUser: req.params.id})
        .then(reviews => res.json(reviews))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, (err, deletedReview) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedReview)
    })
})

router.put('/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedReview) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedReview)
    })
})


module.exports = router;