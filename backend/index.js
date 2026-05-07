const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'https://trackingexpenses000.netlify.app'
}))
app.use(express.json());

// GET all expenses
app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses ORDER BY date DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST add new expense
app.post('/expenses', (req, res) => {
  const { title, amount, category, date } = req.body;
  const sql = 'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, amount, category, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, amount, category, date });
  });
});

// DELETE an expense
app.delete('/expenses/:id', (req, res) => {
  db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully' });
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});