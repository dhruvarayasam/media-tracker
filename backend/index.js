require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');


const port = process.env.PORT || 3000;

const app = express();
app.use(cors({ credentials: true, origin: process.env.CORS_URL }));
app.use(express.json());

// CONNECT TO MONGO
mongoose.connect(process.env.CONNECTION_URI).then(() => {
    console.log("Sucessfully connected to Mongo.")

    // Routes
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });

    app.get('/api/data', (req, res) => {
        res.json({ message: 'Here is some data!' });
    });

    // Server start
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.log(error)
}) 