#!/usr/bin/env python3
"""Check the portable public library with Python's standard library."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re, hashlib

ROOT = Path(__file__).resolve().parent.parent
class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.links=[]; self.entry_ids=[]; self.external_assets=[]
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if 'data-entry-id' in a: self.entry_ids.append(a['data-entry-id'])
        if 'href' in a: self.links.append(a['href'])
        if tag in ['script','img','iframe','link']:
            src=a.get('src',a.get('href',''))
            if src.startswith(('http:','https:')): self.external_assets.append(src)

source=(ROOT/'index.html').read_text(); page=Page(); page.feed(source)
data=json.loads((ROOT/'library.json').read_text())
inline=json.loads(re.search(r'<script id="library-data" type="application/json">(.*?)</script>',source,re.S)[1])
assert inline == data, 'Inline and downloadable data differ'
assert len(data['entries']) == 53
assert len(page.ids) == len(set(page.ids)), 'Duplicate element IDs'
assert page.entry_ids == [e['id'] for e in data['entries']], 'Rendered entries differ from source data'
assert len(data['guide']['roles']) == 6
assert {e['priority'] for e in data['entries']} == {'P0','P1','P2'}
assert not page.external_assets, 'Offline page loads external resources'
assert not re.search(r'\b(?:fetch|XMLHttpRequest)\s*\(',source), 'Unexpected network client'
for href in page.links:
    u=urlsplit(href)
    if not u.scheme and not u.netloc:
        if u.path: assert (ROOT/unquote(u.path)).is_file(), f'Missing portable file: {href}'
        if u.fragment and not u.path: assert unquote(u.fragment) in page.ids, f'Missing anchor: {href}'
for entry in data['entries']:
    assert urlsplit(entry['url']).hostname in ['learn.chatgpt.com','developers.openai.com']
    assert entry['agent_types'] and entry['surfaces'] and entry['description']
for p in ROOT.rglob('*'):
    if not p.is_file() or '.git' in p.parts or p.suffix in ['.png','.gif']: continue
    text=p.read_text()
    if p.resolve() != Path(__file__).resolve():
        for forbidden in ['/Users/', 'operations/reports/', 'receipt_path', 'job_id', 'firecrawl_credits_used', 'Payhip', 'First Codex Workflow Kit']:
            assert forbidden not in text, f'Internal/paid material in {p.relative_to(ROOT)}: {forbidden}'
        # This checker contains its own negative-example strings; scan the other files.
        assert not re.search(r'(?:gh[pousr]_[A-Za-z0-9]{25,}|sk-[A-Za-z0-9]{30,}|-----BEGIN .*PRIVATE KEY-----)',text), f'Secret-shaped value in {p}'
report={'source_entries':len(data['entries']),'role_families':len(data['guide']['roles']),
        'portable_links_checked':len(page.links),'offline_external_assets':len(page.external_assets),
        'html_sha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest(),
        'scope':'Static HTML/data portability checks. Browser rendering and persistence are separate checks.'}
print(json.dumps(report,indent=2))
