const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true  }));

// Calling sync method on this file
const db = require('./app/models');
db.sequelize.sync();

// Simple route
app.get('/', (req, res) => {
    res.json({ message: 'This is tig application Welcome.' });
});

require('./app/routes/tutorials.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});