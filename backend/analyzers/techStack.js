export function computeTechStack(repos) {
  const count = new Map();
  let total = 0;

  for (const r of (repos || [])) {
    const lang = r.language ? r.language : "Other";
    count.set(lang, (count.get(lang) || 0) + 1);
    total += 1;
  }

  if (total === 0) {
    return { topLanguage: null, totalBreakDown: [] };
  }

  const breakDown = Array.from(count.entries())
    .map((language, count) => ({
      language,
      count,
      percent: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  return { topLanguage: breakDown[0] ? breakDown[0].language : null, totalBreakDown: breakDown };
}