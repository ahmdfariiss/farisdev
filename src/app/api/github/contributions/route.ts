import { NextResponse } from 'next/server';

const USERNAME = process.env.GITHUB_USERNAME || 'ahmdfariiss';

/**
 * Scrape the GitHub contributions calendar from the user's profile page.
 * This gives us real 1-year data, unlike the events API which only returns ~100 events.
 */
export async function GET() {
  try {
    // Fetch the contributions HTML fragment from GitHub
    const url = `https://github.com/users/${USERNAME}/contributions`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'portfolio-website' },
      next: { revalidate: 1800 }, // cache 30 min
    });

    if (!res.ok) {
      throw new Error(`GitHub returned ${res.status}`);
    }

    const html = await res.text();

    // Parse contribution days from the HTML
    // Each day is a <td> with data-date and data-level attributes
    const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    const grid: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
    let match;
    let totalContributions = 0;
    let activeDays = 0;

    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10) as 0 | 1 | 2 | 3 | 4;

      // Estimate count from level (GitHub doesn't expose exact counts in HTML anymore)
      let count = 0;
      if (level === 1) count = 1;
      else if (level === 2) count = 3;
      else if (level === 3) count = 6;
      else if (level === 4) count = 10;

      if (level > 0) {
        totalContributions += count;
        activeDays++;
      }

      grid.push({ date, count, level });
    }

    // Also try to extract the total contributions text
    // Format: "X contributions in the last year"
    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    if (totalMatch) {
      totalContributions = parseInt(totalMatch[1].replace(/,/g, ''), 10);
    }

    // Fetch language data from repos
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'portfolio-website',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    };

    const reposRes = await fetch(
      `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`,
      { headers, next: { revalidate: 3600 } }
    );
    const repos = reposRes.ok ? await reposRes.json() : [];
    const langCount: Record<string, number> = {};

    if (Array.isArray(repos)) {
      repos
        .filter((r: { fork: boolean; language: string | null }) => !r.fork && r.language)
        .forEach((r: { language: string }) => {
          langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
    }

    const LANG_COLORS: Record<string, string> = {
      TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
      'C++': '#f34b7d', C: '#555555', HTML: '#e34c26', CSS: '#563d7c',
      PHP: '#4F5D95', Java: '#b07219', Go: '#00ADD8', Rust: '#dea584',
      Kotlin: '#A97BFF', Swift: '#F05138', Ruby: '#701516',
      Shell: '#89e051', Vue: '#41b883', Svelte: '#ff3e00',
    };

    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        count,
        color: LANG_COLORS[name] || '#6b7280',
      }));

    return NextResponse.json({
      grid,
      totalCommits: totalContributions,
      activeDays,
      languages,
    });
  } catch (error) {
    console.error('GitHub contributions API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions', details: String(error) },
      { status: 500 }
    );
  }
}
