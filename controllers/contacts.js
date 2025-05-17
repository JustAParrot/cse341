const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const newContact = { firstName, lastName, email, favoriteColor, birthday };

  try {
    const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ error: 'Email already exists.' });
    } else {
      res.status(500).json({ error: 'An error occurred while creating the contact.' });
    }
  }
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
  const result = await mongodb.getDatabase().db().collection('contacts').updateOne(
    { _id: contactId },
    { $set: updatedContact }
  );

  res.status(204).send(); 
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });

  res.status(204).send(); 
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
