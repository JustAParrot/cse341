const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../data/database');

const register = async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;
    const userExists = await db.collection('users').findOne({ email });

    if (userExists) return res.status(400).json({ message: 'Trainer already exists in this GYM' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection('users').insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: 'New Trainer Created', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const db = getDb();
    const { email, password } = req.body;

    const user = await db.collection('users').findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid Poke-credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid Poke-credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
