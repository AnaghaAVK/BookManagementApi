const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

//GET 
//get all books 
//http://localhost:5000/books/
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST 
// Add a new book
//http://localhost:5000/books
router.post('/', async (req, res) => {
  const { title, author, year } = req.body;

  try {
    const newBook = new Book({ title, author, year });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE 
// Delete a book by ID
// http://localhost:5000/books/id 
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: `Book '${book.title}' with id '${book.id}' is deleted successfully`});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
