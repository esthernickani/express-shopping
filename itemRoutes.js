const express = require('express');
const items = require('./fakeDb')
const router = new express.Router();

router.get("/", function(req, res, next) {
    try {
        return res.json(items)
    } catch(e) {
        next(e)
    }
    
});

router.post("/", function(req, res, next) {
    try {
        const {name, price} = req.body
        items.push({name, price});
        return res.json({"added": {name, price}})
    } catch(e) {
        next(e)
    }
    
});

router.get("/:name", function(req, res, next) {
    try {
        let item;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name == req.params.name) {
                item = items[i]
            } else {
                let error = new Error(`Item not found`);
                error.code = 400;
                throw error;
            }
        }
        console.log(item)
        return res.json({'name': item.name, 'price':item.price})
    } catch(e) {
        next(e)
    }
    
});


router.patch("/:name", function(req, res, next) {
    try {
        let item;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === req.params.name) {
                items[i].name = req.body.name
                item = items[i]
            } else {
                let error = new Error(`Item not found`);
                error.code = 400;
                throw error;
            }
        }

        return res.json({"updated": {'name': item.name, 'price': item.price}})
    } catch(e) {
        next(e)
    }
    
});


router.delete("/:name", function(req, res, next) {
    try {
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === req.params.name) {
                items.splice(i, 1)
            } else {
                let error = new Error(`Item not found`);
                error.code = 400;
                throw error;
            }
        }
    
        return res.json({message: "Deleted"})
    } catch(e) {
        next(e)
    }
    
});


module.exports = router;