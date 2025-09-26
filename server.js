const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store
let cards = [
    { id: 1, suit: 'Hearts', value: 'Ace' },
    { id: 2, suit: 'Spades', value: 'King' },
    { id: 3, suit: 'Diamonds', value: 'Queen' }
];
let nextId = 4;

// GET /cards - list all cards
app.get('/cards', (req, res) => {
    res.status(200).json(cards);
});

// GET /cards/:id - get a single card by ID
app.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);
    if (!card) {
        return res.status(404).json({ error: 'Card not found' });
    }
    res.status(200).json(card);
});

// POST /cards - add a new card
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({ error: 'Suit and value are required' });
    }

    const newCard = { id: nextId++, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// DELETE /cards/:id - delete card by ID
app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Card not found' });
    }

    cards.splice(index, 1);
    res.status(200).json({ message: `Card with ID ${id} deleted` });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
