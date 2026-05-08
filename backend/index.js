require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors({
  origin: 'https://trackingexpenses000.netlify.app'
}));
app.use(express.json());

app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/expenses', (req, res) => {
  const { title, amount, category, date } = req.body;
  const sql = 'INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, amount, category, date], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: result.insertId, title, amount, category, date });
  });
});

app.delete('/expenses/:id', (req, res) => {
  db.query('DELETE FROM expenses WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Deleted successfully' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});