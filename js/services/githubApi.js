/**
 * Dynamic GitHub REST API Client
 */

export const fetchLiveGitHubProfile = async (
  targetUsername = "Yetemare-Yibeltal",
) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${targetUsername}`),
      fetch(
        `https://api.github.com/users/${targetUsername}/repos?per_page=100&sort=updated`,
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error(
        `GitHub user '${targetUsername}' not found or rate limit exceeded.`,
      );
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // Dynamically calculate total stars & language distribution
    let totalStars = 0;
    const languageCounts = {};

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const totalReposWithLang = Object.values(languageCounts).reduce(
      (a, b) => a + b,
      1,
    );
    const topLanguages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalReposWithLang) * 100),
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 4);

    return {
      success: true,
      profile: {
        name: userData.name || userData.login,
        username: userData.login,
        bio: userData.bio || "Developer Profile",
        avatar: userData.avatar_url,
        profileUrl: userData.html_url,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars: totalStars,
        company: userData.company || "N/A",
      },
      repos: reposData.map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description || "No description provided.",
        language: r.language || "Code",
        stars: r.stargazers_count,
        forks: r.forks_count,
        updatedAt: new Date(r.updated_at).toLocaleDateString(),
        url: r.html_url,
      })),
      languages: topLanguages,
    };
  } catch (error) {
    console.warn(`Error fetching stats for ${targetUsername}:`, error);
    return {
      success: false,
      profile: {
        name: targetUsername,
        username: targetUsername,
        bio: "Profile details unavailable or rate limited.",
        avatar: `https://github.com/${targetUsername}.png`,
        publicRepos: 0,
        followers: 0,
        totalStars: 0,
        company: "N/A",
      },
      repos: [],
      languages: [],
    };
  }
};

const getLanguageColor = (lang) => {
  const colors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3776ab",
    HTML: "#e34f26",
    CSS: "#563d7c",
    Java: "#b07219",
    PHP: "#4F5D95",
  };
  return colors[lang] || "#38bdf8";
};
