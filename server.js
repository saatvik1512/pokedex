const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pokedex', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pokedex.html'));
});

app.get('/pokedex/:id', (req, res) => {
  const pokemonId = req.params.id;
  res.render('index', { id: pokemonId });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
