const express = require('express');

const app = express();

app.get('/', (req, res) => res.send(`API RUNNING based on ${req.url}`))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('running')
});
