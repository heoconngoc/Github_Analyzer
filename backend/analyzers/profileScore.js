function clamp(x, lo, hi) {
  return Math.max(lo, Math.min(hi, x));
}

function logScore(value, maxPoints, factor) {
  const s = Math.log10(value + 1) * factor;
  return clamp(Math.round(s), 0, maxPoints);
}

export function computeRepoStats(repos) {
  const arr = Array.isArray(repos) ? repos : [];
  let totalStars = 0;
  let totalForks = 0;
  for (const r of arr) {
    totalStars += (r.stargazers_count || 0);
    totalForks += (r.forks_count || 0);
  }
  const topRepos = arr
    .slice()
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      full_name: r.full_name,
      stars: r.stargazers_count || 0,
      language: r.language || "Other",
      html_url: r.html_url,
    }));

  const withDesc = arr.filter(r => (r.description || "").trim().length > 0).length;
  const descRate = arr.length ? withDesc / arr.length : 0;

  return { totalStars, totalForks, repoCount: arr.length, descRate, topRepos };
}

export function computeProfileScore(profile, repoStats, activity) {
  const followers = profile?.followers || 0;
  const publicRepos = profile?.public_repos || repoStats.repoCount || 0;

  const followersPts = logScore(followers, 20, 8); 
  const starsPts = logScore(repoStats.totalStars || 0, 35, 10); 
  const qualityPts = clamp(Math.round((repoStats.descRate || 0) * 15), 0, 15); 
  const consistencyPts = clamp(activity?.consistencyScore || 0, 0, 20); 
  const score = clamp(
    followersPts + starsPts + repoCountPts + qualityPts + consistencyPts,
    0,
    100
  );
  const notes = [];
  if (starsPts >= 25) notes.push("Strong repository popularity (stars).");
  if (followersPts >= 12) notes.push("Good community interest (followers).");
  if ((repoStats.descRate || 0) < 0.3) notes.push("Consider adding descriptions to more repos.");
  if ((activity?.activeDaysLast30 || 0) === 0) notes.push("No recent public activity detected.");
  return {
    score,
    breakdown: {
      followers: followersPts,
      stars: starsPts,
      repoCount: repoCountPts,
      repoQuality: qualityPts,
      consistency: consistencyPts,
    },
    notes,
  };
}