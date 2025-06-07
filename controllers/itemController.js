const Item = require("../models/itemModel")

// GET all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch items." })
  }
}

// GET item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId)
    if (!item) return res.status(404).json({ error: "Item not found." })
    res.status(200).json(item)
  } catch (err) {
    res.status(500).json({ error: "Error retrieving item." })
  }
}

// POST create new item
const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body)
    const saved = await newItem.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: "Invalid item data." })
  }
}

// PUT update item
const updateItem = async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(
      req.params.itemId,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: "Item not found." })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: "Update failed." })
  }
}

// DELETE item
const deleteItem = async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.itemId)
    if (!deleted) return res.status(404).json({ error: "Item not found." })
    res.status(200).json({ message: "Item deleted." })
  } catch (err) {
    res.status(500).json({ error: "Deletion failed." })
  }
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
}
