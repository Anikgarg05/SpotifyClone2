const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Enable CORS for frontend
app.use(cors());

// Serve static files
app.use('/songs', express.static(path.join(__dirname, 'songs')));
app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')));

// Endpoint to get all songs
app.get('/api/songs', (req, res) => {
  const songsPath = path.join(__dirname, 'data', 'songs.json');
  fs.readFile(songsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Failed to load songs.' });
    res.send(JSON.parse(data));
  });
});

// Endpoint to get a single song by ID
app.get('/api/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const songsPath = path.join(__dirname, 'data', 'songs.json');
  fs.readFile(songsPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ error: 'Failed to load songs.' });

    const songs = JSON.parse(data);
    const song = songs.find(s => s.id === songId);
    if (!song) return res.status(404).send({ error: 'Song not found.' });

    res.send(song);
  });
});

app.listen(PORT, () => {
  console.log(`🎵 Spotify Clone Backend is running at http://localhost:${PORT}`);
});
