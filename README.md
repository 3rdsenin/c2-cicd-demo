# DevOps Bootcamp Starter App

A deliberately tiny Node/Express app, used as the target repo for the Track 2
"Bash Scripting for CI" lesson. The lesson's script clones this repo onto a
fresh EC2 instance, installs dependencies, runs the build step, and starts
the server — automatically, using EC2 user data.

## Run it locally

```bash
npm install
npm run build
npm start
```

Then visit http://localhost:3000

## What each part does

- `index.js` — the Express server (serves the page, a health check, and the build info)
- `build.js` — the "build step": writes `public/build-info.json` with a timestamp and git commit hash
- `public/index.html` — the page you see in the browser

## Why it exists

This app is intentionally boring — the point of the lesson is the automation
script that provisions a server and deploys it, not the app itself.
