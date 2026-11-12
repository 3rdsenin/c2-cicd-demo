// test/build.test.js — checks that the build step produces its artifact.
const { test } = require('node:test');
const assert = require('node:assert');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

test('build.js writes public/build-info.json with builtAt and commit', () => {
  execSync('node build.js', { cwd: root });
  const file = path.join(root, 'public', 'build-info.json');
  assert.ok(fs.existsSync(file), 'public/build-info.json should exist after a build');
  const info = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.ok(info.builtAt, 'builtAt should be set');
  assert.ok(info.commit, 'commit should be set');
});
