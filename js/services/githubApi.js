/**
 * Live GitHub REST API Service with Dynamic Career & Education Mapping
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

    // Calculate real language breakdown and active year range
    const languageCounts = {};
    let totalStars = 0;
    let earliestYear = new Date().getFullYear();

    reposData.forEach((repo) => {
      totalStars += repo.stargazers_count || 0;
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
      if (repo.created_at) {
        const repoYear = new Date(repo.created_at).getFullYear();
        if (repoYear < earliestYear) earliestYear = repoYear;
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

    // Generate dynamic milestones based on real user info & account creation/repository history
    let milestones = [];
    const accountCreationYear = userData.created_at
      ? new Date(userData.created_at).getFullYear()
      : earliestYear;
    const currentYear = new Date().getFullYear();

    if (username.toLowerCase() === "yetemare-yibeltal") {
      // Your exact real background profile data
      milestones = [
        {
          period: "2026 - Present",
          role: "Project Lead & Full-Stack Engineer",
          organization: "HEROY Software Team",
          description:
            "Leading the design and engineering specifications for a Water Supply Management System and other full-stack architectures.",
        },
        {
          period: "2025 - Present",
          role: "Software Engineering Student",
          organization: "Injibara University",
          description:
            "Studying software engineering core principles, database management systems, algorithms, and full-stack web development.",
        },
        {
          period: `${accountCreationYear} - 2026`,
          role: "Full-Stack Web Developer & Open Source Contributor",
          organization: "GitHub Ecosystem",
          description: `Active software development with ${userData.public_repos} public repositories created, focusing on modern web stacks, React, Node.js, and Python.`,
        },
      ];
    } else {
      // Dynamic profile milestone generator for any other searched GitHub user
      milestones = [
        {
          period: `${currentYear} - Present`,
          role: "Software Developer & Creator",
          organization: `@${userData.login}'s Workspace`,
          description:
            userData.bio ||
            `Active software creator on GitHub with ${userData.public_repos} public repositories and ${totalStars} total stars earned.`,
        },
        {
          period: `${accountCreationYear} - ${currentYear}`,
          role: "GitHub Contributor & Developer",
          organization: "Open Source & Public Repositories",
          description: `Maintains a public portfolio consisting of codebases primarily written in ${languages.map((l) => l.name).join(", ") || "various programming languages"}.`,
        },
      ];
    }

    return {
      profile: {
        username: userData.login,
        name: userData.name || userData.login,
        bio: userData.bio || "Software Engineer & Developer.",
        avatar: userData.avatar_url,
        publicRepos: userData.public_repos,
        totalStars,
        followers: userData.followers,
        following: userData.following,
        profileUrl: userData.html_url,
      },
      repos: formattedRepos,
      languages,
      milestones,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return {
      profile: {
        username,
        name: username,
        bio: "",
        avatar: "",
        publicRepos: 0,
        totalStars: 0,
        followers: 0,
        following: 0,
        profileUrl: "",
      },
      repos: [],
      languages: [],
      milestones: [],
    };
  }
};
