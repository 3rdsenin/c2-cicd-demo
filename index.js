// index.js — the actual running application.
//
// This is a tiny Express web server. Its only jobs are:
//   1. Serve the static page in public/index.html
//   2. Answer a health-check request (useful for confirming the app is alive)
//   3. Answer a build-info request (shows the "build artifact" produced by
//      running `npm run build` — see build.js)

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve everything in the public/ folder as-is (index.html, css, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// A "health check" endpoint — real deployment tools ping something like this
// to confirm the app started successfully before sending it real traffic.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is up and running!' });
});

// Returns the build-info.json file written by build.js, if it exists.
app.get('/api/build-info', (req, res) => {
  const buildInfoPath = path.join(__dirname, 'public', 'build-info.json');
  if (fs.existsSync(buildInfoPath)) {
    res.sendFile(buildInfoPath);
  } else {
    res.status(404).json({
      error: 'No build-info.json found — did you run "npm run build" before starting the app?',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Starter app listening on port ${PORT}`);
});
