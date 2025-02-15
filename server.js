const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'contact_form', // Replace with your database name
    port: 8889,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { firstName, lastName, gender, mobile, dob, email, language, message } = req.body;

    const sql = 'INSERT INTO userform (firstName, lastName, gender, mobile, dob, email, language, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [firstName, lastName, gender, mobile, dob, email, language, message];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Error saving data to the database.');
            return;
        }
        res.status(200).send('Data saved successfully!');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
