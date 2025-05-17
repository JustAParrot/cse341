const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
    }

    const newUser = { name, email, password };
    const result = await mongodb.getDatabase().db().collection('users').insertOne(newUser);
    res.status(201).json({ id: result.insertedId });
};

const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
    }

    const updatedUser = { name, email, password };
    const result = await mongodb.getDatabase().db().collection('users').updateOne(
        { _id: userId },
        { $set: updatedUser }
    );

    res.status(204).send(); 
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    res.status(204).send(); 
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
