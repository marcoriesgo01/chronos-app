const express = require("express");
const router = express.Router();


// Get Category model
const Category = require("../../models/Category");

router.post('/create', async (req, res) => {
    Category.findOne({
        category: req.body.name
    })
    .then(budget => {
        if (budget) {
            res.json("Category category already exists")
        } else {
            const newCategory = new Category({
                name: req.body.name,
                description: req.body.description,
                image: req.body.image
        
            })
            newCategory.save().then(budget => res.json(budget))
        }
    })
    .catch(err => console.log(err)); // Mongo Error
})

router.get('/:id', (req, res) => {
    Category.find()
        .then(categories => res.json(categories))
        .catch(err => console.log(err));
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndRemove(req.params.id, (err, deletedCategory) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(deletedCategory)
    })
})

router.put('/:id', (req, res) => {
    Category.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCategory) => {
      if (err) {
        res.status(400).json({ error: err.message })
      }
      res.status(200).json(updatedCategory)
    })
})


module.exports = router;