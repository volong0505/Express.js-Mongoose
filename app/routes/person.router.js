module.exports = app => {
    const express = require('express'),
          people = require('../controllers/person.controller');

    const router = express.Router();

    router.post('/', people.create);

    router.get("/:id", people.findOne);

    router.get('/', people.findAll);

    router.put('/', people.update)

    app.use("/api/person", router)
}