import { NextResponse } from 'next/server';

const USERNAME = process.env.GITHUB_USERNAME || 'ahmdfariiss';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'portfolio-website',
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
};

export async function GET() {
  try {
    // Fetch user profile & repos in parallel
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error(`GitHub user API error: ${userRes.status}`);
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    // Calculate total stars
    const totalStars = Array.isArray(repos)
      ? repos.reduce((acc: number, r: { stargazers_count: number }) => acc + (r.stargazers_count || 0), 0)
      : 0;

    // Top repos by stars (excluding forks)
    const topRepos = Array.isArray(repos)
      ? repos
          .filter((r: { fork: boolean }) => !r.fork)
          .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)
          .map((r: {
            name: string;
            description: string;
            html_url: string;
            stargazers_count: number;
            forks_count: number;
            language: string;
            updated_at: string;
            topics: string[];
          }) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            updatedAt: r.updated_at,
            topics: r.topics || [],
          }))
      : [];

    // Language usage aggregation
    const langCount: Record<string, number> = {};
    if (Array.isArray(repos)) {
      repos
        .filter((r: { fork: boolean; language: string }) => !r.fork && r.language)
        .forEach((r: { language: string }) => {
          langCount[r.language] = (langCount[r.language] || 0) + 1;
        });
    }

    const languages = Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    const total = languages.reduce((acc, l) => acc + l.count, 0);
    const languagesWithPercent = languages.map((l) => ({
      ...l,
      percent: Math.round((l.count / total) * 100),
    }));

    return NextResponse.json({
      profile: {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        url: user.html_url,
      },
      totalStars,
      topRepos,
      languages: languagesWithPercent,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data', details: String(error) },
      { status: 500 }
    );
  }
}
