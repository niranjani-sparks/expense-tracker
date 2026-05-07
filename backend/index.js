app.get('/expenses', (req, res) => {
  db.query('SELECT * FROM expenses ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});