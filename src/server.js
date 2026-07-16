const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(express.static("public"));

const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'tracks.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

const getTracks = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveTracks = (tracks) => fs.writeFileSync(DATA_FILE, JSON.stringify(tracks, null, 2));

// --- GRAVATAR INTEGRATION ROUTE ---
app.get('/api/gravatar/:email', (req, res) => {
    const email = req.params.email.toLowerCase().trim();
    // Generate MD5 hash of the email (Required by Gravatar)
    const hash = crypto.createHash('md5').update(email).digest('hex');
    
    // Gravatar image URL (d=identicon provides a default fallback image)
    const avatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
    
    // In a real app, you would use your GRAVATAR_API_KEY here to fetch profile.json
    res.json({ 
        success: true, 
        hash: hash, 
        avatarUrl: avatarUrl,
        message: "Gravatar URL generated successfully!" 
    });
});

// --- TRACKS CRUD ROUTES ---
app.post('/api/tracks', (req, res) => {
    const tracks = getTracks();
    const newTrack = { id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString() };
    tracks.push(newTrack);
    saveTracks(tracks);
    res.status(201).json({ message: "Track saved!", track: newTrack });
});

app.get('/api/tracks', (req, res) => { res.json(getTracks()); });

app.delete('/api/tracks/:id', (req, res) => {
    let tracks = getTracks();
    tracks = tracks.filter(t => t.id !== req.params.id);
    saveTracks(tracks);
    res.json({ message: "Track deleted successfully!" });
});

app.get('/api/export', (req, res) => {
    const tracks = getTracks();
    if (tracks.length === 0) return res.status(404).send("No tracks to export.");
    const headers = ['Track Title', 'Artist Name', 'ISRC', 'ISWC'];
    const rows = tracks.map(t => [t.trackTitle, t.artistName, t.isrc, t.iswc].join(','));
    res.header('Content-Type', 'text/csv').send([headers.join(','), ...rows].join('\n'));
});

const PORT = 3000;
app.listen(PORT, () => { console.log(`🎵 Strezless API running on http://localhost:${PORT}`); });
