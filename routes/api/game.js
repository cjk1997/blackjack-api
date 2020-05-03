const express = require('express');
const router = express.Router();
const {
    getCards,
    addCard,
    updateCard,
    deleteCard
} = require('../../data/game');

router.get('/', async function(req, res) {
    try {
        const data = await getCards();
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

router.post('/', async function(req, res) {
    try {
        const data = await addCard(req.body);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

router.put('/:id', async function(req, res) {
    try {
        const data = await updateCard(req.params.id, req.body);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

router.delete('/:id', async function(req, res) {
    try {
        const data = await deleteCard(req.params.id);
        res.send(data);
    } catch(err) {
        console.log(err);
        res.status(500).send("Internal Server Issues, check logs");
    };
});

module.exports = router;