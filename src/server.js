const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static("public"));

const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'tracks.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

const getTracks = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveTracks = (tracks) => fs.writeFileSync(DATA_FILE, JSON.stringify(tracks, null, 2));

app.post('/api/tracks', (req, res) => {
    const tracks = getTracks();
    const newTrack = { id: crypto.randomUUID(), ...req.body, createdAt: new Date().toISOString() };
    tracks.push(newTrack);
    saveTracks(tracks);
    res.status(201).json({ message: "Track saved!", track: newTrack });
});

app.get('/api/tracks', (req, res) => { res.json(getTracks()); });

app.get('/api/tracks/:id', (req, res) => {
    const tracks = getTracks();
    const track = tracks.find(t => t.id === req.params.id);
    if (!track) return res.status(404).send("Track not found.");
    res.json(track);
});

app.put('/api/tracks/:id', (req, res) => {
    const tracks = getTracks();
    const index = tracks.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).send("Track not found.");
    tracks[index] = { ...tracks[index], ...req.body, updatedAt: new Date().toISOString() };
    saveTracks(tracks);
    res.json({ message: "Track updated!", track: tracks[index] });
});

app.delete('/api/tracks/:id', (req, res) => {
    let tracks = getTracks();
    const initialLength = tracks.length;
    tracks = tracks.filter(t => t.id !== req.params.id);
    if (tracks.length === initialLength) return res.status(404).send("Track not found.");
    saveTracks(tracks);
    res.json({ message: "Track deleted successfully!" });
});

app.get('/api/export', (req, res) => {
    const tracks = getTracks();
    if (tracks.length === 0) return res.status(404).send("No tracks to export.");

    const headers = ['Track Title', 'Artist Name', 'ISRC', 'ISWC'];

    const escapeCsv = (val) => {
        if (!val) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) return '"' + str.replace(/"/g, '""') + '"';
        return str;
    };

    const rows = tracks.map(track => {
        return [
            escapeCsv(track.trackTitle), escapeCsv(track.artistName),
            escapeCsv(track.isrc), escapeCsv(track.iswc)
        ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=strezless_nexus.csv');
    res.send(csvContent);
});

const PORT = 3000;
app.listen(PORT, () => { console.log(`🎵 Strezless API running on http://localhost:${PORT}`); });
