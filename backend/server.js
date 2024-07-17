const express = require('express');
const PORT = process.env.PORT || 8000

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('<h1>HOME PAGE</h1>');
})

app.get('/about', (req, res) => {
    res.status(200).send('<h1>About</h1>');
})

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));