const express = require("express");
const router = express.Router();


// Get Budget model
const Budget = require("../../models/Budget");

router.post('/create', async (req, res) => {
    Budget.findOne({
        category: req.body.name
    })
    .then(budget => {
        if (budget) {
            res.json("Budget category already exists")
        } else {
            const newBudget = new Budget({
                userId: req.body.userId,
                name: req.body.name,
                amount: req.body.amount
        
            })
            newBudget.save().then(budget => res.json(budget))
        }
    })
    .catch(err => console.log(err)); // Mongo Error
})

router.get('/:id', (req, res) => {
    Budget.find({ userId: req.params.id })
        .then(budgets => res.json(budgets))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Budget.findByIdAndRemove(req.params.id, (err, deletedBudget) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedBudget)
    })
})

router.put('/:id', (req, res) => {
    Budget.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBudget) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedBudget)
    })
})


module.exports = router;