const mongoose = require('mongoose'),
    Person = require('../models/person.model')

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ message: "Name can not be empty!" });
        return;
    }

    const person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        age: req.body.age,
        avatar_url: null
    });

    return person
        .save()
        .then((newPerson) => {
            return res.status(201).json({
                success: true,
                message: 'New person created successfully',
                Person: newPerson
            });
        })
        .catch((error) => {
            res.status(500).json({
                succcess: false,
                message: 'Server error. Please try again.',
                error: error.message
            });
        });
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    const condition = name ? { name : { $regex: new RegExp(name), $options: "i"} } : {};

    Person.find(condition)
    .then( data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Some error occurred while retrieving people."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Person.findById( new mongoose.Types.ObjectId(id))
    .then(data => {
        if (!data) res.status(404).send({message: "Not found Person with id: " + id});
        else res.send(data);
    })
    .catch(error => {
        res
            .status(500)
            .send({ message: "Error retrieving Person with id: " + id});
    });
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        })
    }

    const id = new mongoose.Types.ObjectId(req.body.id);

    Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
            .then( data => {
                if (!data) {
                res.status(400).send({
                    message: `Cannot update Person with id: ${id}. Maybe Person wass not found!`
                });
            } else res.send({ message: "Person was update successfully."});
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Person with id: " + id
                });
            })
}
