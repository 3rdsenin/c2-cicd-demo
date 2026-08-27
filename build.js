// build.js — a deliberately simple "build step".
//
// Real-world build steps compile TypeScript, bundle JS, minify CSS, and so
// on. This app doesn't need any of that, but a CI pipeline always has a
// build stage — so this script stands in for one: it records exactly when
// and from which commit the app was built, and writes that out as a build
// artifact (public/build-info.json) that the running app can then serve.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown (not a git repo, or no commits yet)';
  }
}

const buildInfo = {
  builtAt: new Date().toISOString(),
  commit: getCommitHash(),
};

fs.writeFileSync(
  path.join(__dirname, 'public', 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('Build complete:', buildInfo);
