#!/usr/bin/env python3
"""Astro Skill CLI - Search Astro 6 patterns, integrations, and v6 features"""

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from core import search, search_stack, CSV_CONFIG, AVAILABLE_STACKS


def format_output(results):
    """Pretty-print search results"""
    if "error" in results:
        print(f"\n  Error: {results['error']}\n")
        return

    domain = results.get("domain", "unknown")
    query = results.get("query", "")
    source = results.get("file", "")
    count = results.get("count", 0)

    print(f"\n## Astro Skill Search Results")
    print(f"**Domain:** {domain} | **Query:** {query}")
    print(f"**Source:** {source} | **Found:** {count} results\n")

    if count == 0:
        print("No results found. Try different keywords.\n")
        return

    for i, row in enumerate(results.get("results", []), 1):
        print(f"### Result {i}")
        for key, value in row.items():
            if value and str(value).strip():
                print(f"- **{key}:** {value}")
        print()


def main():
    parser = argparse.ArgumentParser(description="Astro Skill CLI - Search Astro 6 patterns")
    parser.add_argument("query", help="Search query")
    parser.add_argument("--domain", "-d", choices=list(CSV_CONFIG.keys()),
                        help="Search domain: components, integrations, or v6")
    parser.add_argument("--stack", "-s", choices=AVAILABLE_STACKS,
                        help="Cross-reference ui-ux-pro-max astro stack")
    parser.add_argument("--max-results", "-n", type=int, default=3,
                        help="Maximum results (default: 3)")
    parser.add_argument("--json", "-j", action="store_true",
                        help="Output as JSON")
    args = parser.parse_args()

    if args.stack:
        results = search_stack(args.query, args.stack, args.max_results)
    else:
        results = search(args.query, args.domain, args.max_results)

    if args.json:
        print(json.dumps(results, indent=2, ensure_ascii=False))
    else:
        format_output(results)


if __name__ == "__main__":
    main()
