const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const authenticateToken = require('./middleware/auth');


const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());

const saltRounds = 10;

// User registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Query to insert a new user
        const query = `
            INSERT INTO public.users (username, password, game_state)
            VALUES ($1, $2, $3)
            RETURNING idUser;
        `;
        const initialGameState = JSON.stringify({
            snaxAmount: 0,
            prestigeCurrency: 0,
            prestiges: 0,
            upgrades: {},
            prestigeUpgrades: {}
        });
        const values = [username, hashedPassword, initialGameState];

        // Insert user
        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            res.status(201).send('User registered successfully.');
        } else {
            res.status(500).send('Error registering user.');
        }
    } catch (err) {
        if (err.code === '23505') { // Unique violation error code in PostgreSQL
            res.status(409).send('Username already exists.');
        } else {
            console.error(err);
            res.status(500).send('Error registering user.');
        }
    }
});

// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const query = 'SELECT idUser, username, password FROM public.users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                // Generate a token
                const token = jwt.sign({ username: user.username }, TOKEN_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token, message: 'Login successful' });
            } else {
                res.status(401).send('Invalid username or password.');
            }
        } else {
            res.status(401).send('Invalid username or password.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in.');
    }
});

app.post('/save', authenticateToken, async (req, res) => {
    const { username, gameState } = req.body;

    console.log('GameState Type:', typeof gameState);
    console.log('GameState:', gameState);

    if (!username || !gameState) {
        return res.status(400).send('Username and game state are required.');
    }

    try {
        const query = `
            UPDATE public.users
            SET game_state = $2
            WHERE username = $1;
        `;

        const gameStateString = JSON.stringify(gameState);
        const values = [username, gameStateString];

        console.log('Prepared GameState for DB:', gameStateString);

        const result = await pool.query(query, values);

        console.log('Save Result:', result.rowCount);

        res.status(200).send('Game state saved successfully');
    } catch (err) {
        console.error('Save Error:', err);
        res.status(500).send('Error saving game state.');
    }
});

app.get('/load/:username', authenticateToken, async (req, res) => {
    const { username } = req.params;

    try {
        const query = 'SELECT game_state FROM public.users WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            const rawGameState = result.rows[0].game_state;

            console.log('Raw Game State Type:', typeof rawGameState);
            console.log('Raw Game State:', rawGameState);

            let gameState;
            try {
                if (typeof rawGameState === 'object') {
                    // If already an object, use it directly
                    gameState = rawGameState;
                } else if (typeof rawGameState === 'string') {
                    // Parse if it's a string
                    gameState = JSON.parse(rawGameState);
                } else {
                    // Default to empty object if undefined or null
                    gameState = {};
                }
            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                console.error('Problematic JSON:', rawGameState);

                // Fallback to empty object if parsing fails
                gameState = {};
            }

            const completeGameState = {
                snaxAmount: gameState.snaxAmount ?? 0,
                prestigeCurrency: gameState.prestigeCurrency ?? 0,
                prestiges: gameState.prestiges ?? 0,
                baseSnaxPerClick: gameState.baseSnaxPerClick ?? 1,
                pUpgrade1Multiplier: gameState.pUpgrade1Multiplier ?? 1,
                snaxPerClick: gameState.snaxPerClick ?? 1,
                snaxPerSecond: gameState.snaxPerSecond ?? 0,

                upgrades: {
                    Upgrade1: gameState.upgrades?.Upgrade1 ?? { level: 0, price: 10 },
                    Upgrade2: gameState.upgrades?.Upgrade2 ?? { level: 0, price: 50 },
                    Upgrade3: gameState.upgrades?.Upgrade3 ?? { level: 0, price: 100 },
                    Upgrade4: gameState.upgrades?.Upgrade4 ?? { level: 0, price: 500 },
                },

                prestigeUpgrades: {
                    PrestigeUpgrade1: gameState.prestigeUpgrades?.PrestigeUpgrade1 ?? { level: 0, price: 1 },
                    PrestigeUpgrade2: gameState.prestigeUpgrades?.PrestigeUpgrade2 ?? { level: 0, price: 5 },
                    PrestigeUpgrade3: gameState.prestigeUpgrades?.PrestigeUpgrade3 ?? { level: 0, price: 10 },
                },
            };

            console.log('Compiled Complete GameState:', completeGameState);

            res.status(200).json(completeGameState);
        } else {
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error('Load Error:', err);
        res.status(500).send('Error loading game state.');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});