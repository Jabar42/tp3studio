#!/usr/bin/env python3
"""Astro Skill Core - BM25 search engine adapted from ui-ux-pro-max"""

import csv
import re
from pathlib import Path
from math import log
from collections import defaultdict

DATA_DIR = Path(__file__).parent.parent / "data"
MAX_RESULTS = 3

CSV_CONFIG = {
    "components": {
        "file": "astro-components.csv",
        "search_cols": ["Category", "Guideline", "Description", "Do", "Don't"],
        "output_cols": ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad", "Severity", "Docs URL"]
    },
    "integrations": {
        "file": "astro-integrations.csv",
        "search_cols": ["Category", "Guideline", "Description", "Do", "Don't"],
        "output_cols": ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad", "Severity", "Docs URL"]
    },
    "v6": {
        "file": "astro-v6.csv",
        "search_cols": ["Category", "Guideline", "Description", "Do", "Don't"],
        "output_cols": ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad", "Severity", "Docs URL"]
    }
}

_STACK_COLS = {
    "search_cols": ["Category", "Guideline", "Description", "Do", "Don't"],
    "output_cols": ["Category", "Guideline", "Description", "Do", "Don't", "Code Good", "Code Bad", "Severity", "Docs URL"]
}

def _find_astro_csv():
    """Find ui-ux-pro-max astro.csv across plugin cache versions"""
    for base in [
        Path.home() / ".claude/plugins/cache/ui-ux-pro-max-skill",
        Path.home() / ".claude/skills/ui-ux-pro-max",
    ]:
        if base.exists():
            for csv_file in base.rglob("astro.csv"):
                return csv_file
    return None

STACK_CONFIG = {"astro": {"file": str(_find_astro_csv()) if _find_astro_csv() else None}}

AVAILABLE_STACKS = ["astro"]


class BM25:
    """BM25 ranking algorithm for text search"""

    def __init__(self, k1=1.5, b=0.75):
        self.k1 = k1
        self.b = b
        self.corpus = []
        self.doc_lengths = []
        self.avgdl = 0
        self.idf = {}
        self.doc_freqs = defaultdict(int)
        self.N = 0

    def tokenize(self, text):
        text = re.sub(r'[^\w\s]', ' ', str(text).lower())
        return [w for w in text.split() if len(w) > 2]

    def fit(self, documents):
        self.corpus = [self.tokenize(doc) for doc in documents]
        self.N = len(self.corpus)
        if self.N == 0:
            return
        self.doc_lengths = [len(doc) for doc in self.corpus]
        self.avgdl = sum(self.doc_lengths) / self.N
        for doc in self.corpus:
            seen = set()
            for word in doc:
                if word not in seen:
                    self.doc_freqs[word] += 1
                    seen.add(word)
        for word, freq in self.doc_freqs.items():
            self.idf[word] = log((self.N - freq + 0.5) / (freq + 0.5) + 1)

    def score(self, query):
        query_tokens = self.tokenize(query)
        scores = []
        for idx, doc in enumerate(self.corpus):
            score = 0
            doc_len = self.doc_lengths[idx]
            term_freqs = defaultdict(int)
            for word in doc:
                term_freqs[word] += 1
            for token in query_tokens:
                if token in self.idf:
                    tf = term_freqs[token]
                    idf = self.idf[token]
                    numerator = tf * (self.k1 + 1)
                    denominator = tf + self.k1 * (1 - self.b + self.b * doc_len / self.avgdl)
                    score += idf * numerator / denominator
            scores.append((idx, score))
        return sorted(scores, key=lambda x: x[1], reverse=True)


def _load_csv(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return list(csv.DictReader(f))


def _search_csv(filepath, search_cols, output_cols, query, max_results):
    if not Path(filepath).exists():
        return []
    data = _load_csv(filepath)
    documents = [" ".join(str(row.get(col, "")) for col in search_cols) for row in data]
    bm25 = BM25()
    bm25.fit(documents)
    ranked = bm25.score(query)
    results = []
    for idx, score in ranked[:max_results]:
        if score > 0:
            row = data[idx]
            results.append({col: row.get(col, "") for col in output_cols if col in row})
    return results


def detect_domain(query):
    query_lower = query.lower()
    domain_keywords = {
        "components": ["component", "layout", "hero", "card", "nav", "header", "footer",
                        "form", "seo", "button", "section", "template", "slot", "page"],
        "integrations": ["integration", "tailwind", "mdx", "react", "vue", "svelte",
                         "adapter", "deploy", "sitemap", "rss", "font", "auth"],
        "v6": ["v6", "server island", "clientrouter", "content layer", "csp", "migration",
               "upgrade", "breaking", "rust", "queue", "cache", "zod 4", "deprecated"]
    }
    scores = {domain: sum(1 for kw in keywords if kw in query_lower)
              for domain, keywords in domain_keywords.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else "components"


def search(query, domain=None, max_results=MAX_RESULTS):
    if domain is None:
        domain = detect_domain(query)
    config = CSV_CONFIG.get(domain, CSV_CONFIG["components"])
    filepath = DATA_DIR / config["file"]
    if not filepath.exists():
        return {"error": f"File not found: {filepath}", "domain": domain}
    results = _search_csv(filepath, config["search_cols"], config["output_cols"], query, max_results)
    return {"domain": domain, "query": query, "file": config["file"], "count": len(results), "results": results}


def search_stack(query, stack, max_results=MAX_RESULTS):
    if stack not in STACK_CONFIG:
        return {"error": f"Unknown stack: {stack}. Available: {', '.join(AVAILABLE_STACKS)}"}
    filepath = STACK_CONFIG[stack]["file"]
    if not filepath or not Path(filepath).exists():
        return {"error": f"ui-ux-pro-max astro.csv not found. Install it first.", "stack": stack}
    results = _search_csv(filepath, _STACK_COLS["search_cols"], _STACK_COLS["output_cols"], query, max_results)
    return {"domain": "stack", "stack": stack, "query": query, "file": filepath, "count": len(results), "results": results}
