'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { matchesEntry } = require('./library.cjs');
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../library.json'), 'utf8'));
const filters = {};
for (let i = 2; i < process.argv.length; i += 2) {
  const key = process.argv[i].replace(/^--/, '');
  if (!['query', 'role', 'priority', 'surface', 'category'].includes(key) || process.argv[i + 1] === undefined) {
    process.stderr.write('Use --query, --role, --priority, --surface or --category followed by a value.\n');
    process.exit(2);
  }
  filters[key] = process.argv[i + 1];
}
const rows = data.entries.filter(entry => matchesEntry(entry, filters));
process.stdout.write(`${rows.length} of ${data.entries.length} sources\n`);
for (const row of rows) process.stdout.write(`${row.priority}  ${row.title}\n`);
