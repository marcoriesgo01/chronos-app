const express = require("express");
const router = express.Router();


// Get Expense model
const Expense = require("../../models/Expense");

router.post('/create', async (req, res) => {
    Expense.create(req.body, (error, createdExpense) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).send(createdExpense) 
    })
})

router.get('/:id', (req, res) => {
    Expense.find({ userId: req.params.id })
        .then(expenses => res.json(expenses))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Expense.findByIdAndRemove(req.params.id, (err, deletedExpense) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedExpense)
    })
})

router.put('/:id', (req, res) => {
    Expense.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExpense) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedExpense)
    })
})


module.exports = router;