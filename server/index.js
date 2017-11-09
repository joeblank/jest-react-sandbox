const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , cars = require('./carData.json');

const app = express();
app.use(bodyParser.json())
app.use(cors());

app.get('/api/cars', (req, res) => {
    res.status(200).send(cars)
})

const port = 3001;
app.listen(port, () => console.log(`Listening on port: ${port}`));