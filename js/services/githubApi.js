/**
 * Live GitHub API Client for Yetemare-Yibeltal
 */

const GITHUB_USERNAME = "Yetemare-Yibeltal";

export const fetchLiveGitHubProfile = async () => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      ),
    ]);

    if (!userRes.ok || !reposRes.ok)
      throw new Error("GitHub API rate limit or network error");

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // Calculate total stars and language distribution dynamically from your repos
    let totalStars = 0;
    const languageCounts = {};

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    // Format languages into percentage shares
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
        name: userData.name || GITHUB_USERNAME,
        username: userData.login,
        bio: userData.bio || "Full-Stack Software Engineer & Web Developer",
        avatar: userData.avatar_url,
        profileUrl: userData.html_url,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars: totalStars,
        company: userData.company || "Injibara University",
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
    console.warn("Using fallback cached profile data:", error);
    return {
      success: false,
      profile: {
        name: "Metages Yibeltal",
        username: GITHUB_USERNAME,
        bio: "Full-Stack Software Engineer",
        avatar: "https://github.com/" + GITHUB_USERNAME + ".png",
        publicRepos: 35,
        followers: 120,
        totalStars: 48,
        company: "Injibara University",
      },
      repos: [],
      languages: [
        { name: "JavaScript", percentage: 45, color: "#f7df1e" },
        { name: "TypeScript", percentage: 25, color: "#3178c6" },
        { name: "Python", percentage: 20, color: "#3776ab" },
        { name: "HTML/CSS", percentage: 10, color: "#e34f26" },
      ],
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
