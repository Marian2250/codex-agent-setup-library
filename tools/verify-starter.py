#!/usr/bin/env python3
"""Check starter contents, citations and Markdown navigation without installing packages."""
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import tomllib

ROOT = Path(__file__).resolve().parent.parent
WORKSPACE = ROOT / 'starter-kit/workspace'
required = [
    'AGENTS.md', 'README.md', 'inputs/task.md', 'sources/source-notes.json',
    'templates/source-brief.md', 'reports/README.md',
    '.agents/skills/source-brief/SKILL.md',
    '.codex/agents/starter_researcher.toml', '.codex/agents/starter_reviewer.toml',
]
for name in required:
    assert (WORKSPACE / name).is_file(), f'Missing starter file: {name}'
assert not (WORKSPACE / 'reports/source-brief.md').exists(), 'Starter must leave the exercise output empty'

notes = json.loads((WORKSPACE / 'sources/source-notes.json').read_text())
library = json.loads((ROOT / 'library.json').read_text())
assert notes['snapshot_date'] == library['snapshot_date']
assert {s['id'] for s in notes['sources']} == {'S01', 'S02', 'S03'}
for source in notes['sources']:
    matches = [e for e in library['entries'] if e['url'] == source['url']]
    assert len(matches) == 1, f'Source does not match the library: {source["id"]}'
    for field in ['title', 'description', 'notes', 'files']:
        assert source[field] == matches[0][field], f'Changed source field: {source["id"]}/{field}'
    assert source['snapshot_date'] == notes['snapshot_date']

role_names = []
for path in sorted((WORKSPACE / '.codex/agents').glob('*.toml')):
    role = tomllib.loads(path.read_text())
    assert set(role) == {'name', 'description', 'developer_instructions'}, f'Unexpected runtime override: {path.name}'
    assert all(isinstance(value, str) and value.strip() for value in role.values())
    assert role['name'] == path.stem
    role_names.append(role['name'])

# The starter uses exactly two plain YAML scalar fields. Validate this small
# format directly; a general YAML parser is unnecessary for these contents.
skill = (WORKSPACE / '.agents/skills/source-brief/SKILL.md').read_text()
frontmatter = re.match(r'^---\n(.*?)\n---\n', skill, re.S)
assert frontmatter, 'Missing skill frontmatter'
metadata = dict(line.split(': ', 1) for line in frontmatter[1].splitlines())
assert set(metadata) == {'name', 'description'}
assert metadata['name'] == 'source-brief'
assert re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', metadata['name'])
assert len(metadata['name']) <= 64
assert 0 < len(metadata['description']) <= 1024
assert not any(char in metadata['description'] for char in '<>')
assert '[TODO:' not in skill

example = (ROOT / 'examples/first-task-source-brief.md').read_text()
for source in notes['sources']:
    assert source['id'] in example and source['url'] in example
assert '11 October 2026' in example
for section in ['Supported distinctions', 'Recommendation', 'Open questions', 'Completion check']:
    assert f'## {section}' in example

links = 0
for path in ROOT.rglob('*.md'):
    if '.git' in path.parts:
        continue
    content = re.sub(r'```.*?```', '', path.read_text(), flags=re.S)
    for href in re.findall(r'\]\(([^\s)]+)(?:\s+"[^"]*")?\)', content):
        url = urlsplit(href)
        if url.scheme or url.netloc or not url.path:
            continue
        target = (path.parent / unquote(url.path)).resolve()
        assert target.is_relative_to(ROOT), f'Link escapes kit: {path.relative_to(ROOT)} -> {href}'
        assert target.exists(), f'Broken Markdown link: {path.relative_to(ROOT)} -> {href}'
        links += 1

summary = (ROOT / 'docs/SUMMARY.md').read_text()
navigation = re.findall(r'\]\(([^)]+\.md)\)', summary)
assert navigation == ['README.md', 'start-here.md', 'first-task.md', 'file-map.md', 'local-and-cloud.md', 'gitbook.md', 'troubleshooting.md']
assert (ROOT / 'docs/.gitbook.yaml').read_text() == 'root: ./\nstructure:\n  readme: README.md\n  summary: SUMMARY.md\n'

print(json.dumps({
    'starter_files': len(required), 'source_records_matched': len(notes['sources']),
    'role_toml_parsed': role_names, 'skill_metadata': 'valid two-field format',
    'markdown_links_checked': links, 'guide_pages': len(navigation),
    'scope': 'File, syntax, citation-record and navigation checks; no model, hosted runtime or account-access test.',
}, indent=2))
