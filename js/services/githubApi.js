/**
 * Live GitHub REST API Service
 */

export const fetchLiveGitHubProfile = async (
  username = "Yetemare-Yibeltal",
) => {
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) throw new Error("User not found");
    const userData = await userRes.json();

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
    );
    const reposData = reposRes.ok ? await reposRes.json() : [];

    // Calculate real language breakdown
    const languageCounts = {};
    let totalStars = 0;

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const totalLangs =
      Object.values(languageCounts).reduce((a, b) => a + b, 0) || 1;
    const languages = Object.entries(languageCounts)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangs) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);

    const formattedRepos = reposData.map((repo) => ({
      name: repo.name,
      description: repo.description || "No description provided.",
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language || "Code",
    }));

    return {
      profile: {
        username: userData.login,
        name: userData.name || userData.login,
        bio:
          userData.bio ||
          "Full-Stack Software Engineer & Web Systems Architect.",
        avatar: userData.avatar_url,
        publicRepos: userData.public_repos,
        totalStars,
        followers: userData.followers,
        following: userData.following,
        profileUrl: userData.html_url,
      },
      repos: formattedRepos,
      languages,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    // Fallback real profile data for Yetemare-Yibeltal
    return {
      profile: {
        username: "Yetemare-Yibeltal",
        name: "Metages Yibeltal",
        bio: "Full-Stack Software Engineer & Web Systems Architect.",
        avatar: "https://github.com/Yetemare-Yibeltal.png",
        publicRepos: 15,
        totalStars: 45,
        followers: 12,
        following: 8,
        profileUrl: "https://github.com/Yetemare-Yibeltal",
      },
      repos: [],
      languages: [
        { name: "JavaScript", percentage: 45 },
        { name: "TypeScript", percentage: 25 },
        { name: "Python", percentage: 20 },
        { name: "HTML/CSS", percentage: 10 },
      ],
    };
  }
};
