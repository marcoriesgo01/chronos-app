const express = require("express");
const router = express.Router();


// Get Investment model
const Investment = require("../../models/Investment");

router.post('/create', async (req, res) => {
    Investment.findOne({
        companyName: req.body.companyName
    })
    .then(investment => {
        if (investment) {
            res.json("Investment already exists")
        } else {
            const newInvestment = new Investment({
                userId: req.body.userId,
                companyName: req.body.companyName,
                stockTag: req.body.stockTag,
                numberOfShares: req.body.numberOfShares
        
            })
            newInvestment.save().then(investment => res.json(investment))
        }
    })
    .catch(err => console.log(err)); // Mongo Error
})

router.get('/:id', (req, res) => {
    Investment.find({ userId: req.params.id })
        .then(investments => res.json(investments))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Investment.findByIdAndRemove(req.params.id, (err, deletedInvestment) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedInvestment)
    })
})

router.put('/:id', (req, res) => {
    Investment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedInvestment) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedInvestment)
    })
})


module.exports = router;