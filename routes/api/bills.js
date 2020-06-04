const express = require("express");
const router = express.Router();


// Get Bills model
const Bill = require("../../models/Bill");

router.post('/create', async (req, res) => {
    Bill.findOne({
        name: req.body.name
    })
    .then(bill => {
        if (bill) {
            res.json("Bill by this name already exists")
        } else {
            const newBill = new Bill({
                userId: req.body.userId,
                name: req.body.name,
                categoryId: req.body.categoryId,
                dueDate: req.body.dueDate,
                amount: req.body.amount
            })
            newBill.save().then(bill => res.json(bill))
        }
    })
    .catch(err => console.log(err)); // Mongo Error
})

router.get('/:id', (req, res) => {
    Bill.find({ userId: req.params.id })
        .then(bills => res.json(bills))
        .catch(err => console.log(err));
})

router.get('/:id/:categoryId', (req, res) => {
    Bill.find({ userId: req.params.id, categoryId: req.params.categoryId})
        .then(bills => res.json(bills))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Bill.findByIdAndRemove(req.params.id, (err, deletedBill) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedBill)
    })
})

router.put('/:id', (req, res) => {
    Bill.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedBill) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedBill)
    })
})


module.exports = router;