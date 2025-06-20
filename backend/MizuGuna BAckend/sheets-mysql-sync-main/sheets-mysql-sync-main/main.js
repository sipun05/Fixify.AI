const { updateDb } = require('./updatedb')
const cron = require('node-cron');
const express = require('express')
const { pool } = require('./db')
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const verifyToken = require('./verificationMiddleware.js')

const app = express()
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log('Request received:', req.method, req.url);
    next();
});

app.get('/api/data', (req, res) => {
    pool.query('SELECT * FROM Test ORDER BY dateTime DESC LIMIT 40;', (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ error: 'DB query failed' });
        }
        // console.log(results)
        res.json(results);
    });
});

app.post('/api/signup', async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing credentials" });
    }

    try {
        // 1. Check if user already exists
        const [existing] = await pool.promise().query('SELECT * FROM Auth WHERE username = ?', [username]);
        if (existing.length > 0) {
            return res.status(409).json({ error: "Username already exists" });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Insert new user
        await pool.promise().query('INSERT INTO Auth (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: "Signup successful" });

    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/api/dashboard', verifyToken, (req, res) => {
    pool.query('SELECT * FROM Test ORDER BY dateTime DESC LIMIT 40;', (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ error: 'DB query failed' });
        }
        // console.log(results)
        res.json(results);
    });
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Missing credentials" });
    }

    try {
        const [rows] = await pool.promise().query('SELECT password FROM Auth WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = rows[0].password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            let token = jwt.sign(username, process.env.SECRET_KEY)
            res.status(200).json({ message: "Login successful", token: token });
        } else {
            res.status(401).json({ error: "Incorrect password" });
        }
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/api/betweenData', (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) {
        return res.status(400).json({ error: 'Missing start or end date in query' });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ error: 'Invalid date format' });
    }
    const query = 'SELECT * FROM Test WHERE dateTime BETWEEN ? AND ?';
    pool.query(query, [start, end], (err, results) => {
        if (err) {
            console.error('DB Error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(5754, () => {
    console.log("Server running on http://localhost:5754");
});


let isRunning = false;
const iteration = async () => {
    if (isRunning) return;
    isRunning = true;

    try {
        console.log("Triggering update:", new Date());
        await updateDb();
    } catch (err) {
        console.error("Interval error:", err);
    } finally {
        isRunning = false;
    }
}

// To start Updation of the table, - uncomment any of the below statements, - 1 minute, 10 seconds respectively

cron.schedule('* * * * *', iteration)
// setInterval(iteration, 10000);
