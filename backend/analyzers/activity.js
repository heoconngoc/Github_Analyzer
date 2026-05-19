function toDateKey(iso) {
  return new Date(iso).toISOString().slice(0, 10);
}

function defaultWeeklyBuckets() {
  return { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
}

function dayName(date) {
  const d = date.getUTCDay();
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][d];
}

export function computeActivity(events, { daysWindow = 30 } = {}) {
  const arr = Array.isArray(events) ? events : [];
  if (arr.length === 0) {
    return {
      activeDaysLast30: 0,
      eventsCountLast30: 0,
      longestStreak: 0,
      weeklyBuckets: defaultWeeklyBuckets(),
      consistencyScore: 0,
      notes: ["No public events found in the snapshot window."],
    };
  }
  const now = new Date();
  const cutoff = new Date(now);
  cutoff.setDate(cutoff.getDate() - daysWindow);

  const recent = arr.filter(e => {
    if (!e.created_at) return false;
    const t = new Date(e.created_at);
    return t >= cutoff && t <= now;
  });
  const weeklyBuckets = defaultWeeklyBuckets();
  const dateSet = new Set();
  for (const e of recent) {
    const t = new Date(e.created_at);
    weeklyBuckets[dayName(t)] = (weeklyBuckets[dayName(t)] || 0) + 1;
    dateSet.add(toDateKey(e.created_at));
  }
  const activeDaysLast30 = dateSet.size;
  const eventsCountLast30 = recent.length;

  const dates = Array.from(dateSet).sort(); 
  let longest = 0;
  let current = 0;
  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      current = 1;
    } else {
      const prev = new Date(dates[i - 1]);
      const cur = new Date(dates[i]);
      const diffDays = Math.round((cur - prev) / (1000 * 60 * 60 * 24));
      current = (diffDays === 1) ? (current + 1) : 1;
    }
    longest = Math.max(longest, current);
  }

  const scoreActive = Math.min(20, Math.round((activeDaysLast30 / daysWindow) * 20));
  const scoreStreak = Math.min(10, longest);
  const consistencyScore = scoreActive + scoreStreak;
  return {
    activeDaysLast30,
    eventsCountLast30,
    longestStreak: longest,
    weeklyBuckets,
    consistencyScore,
    notes: [],
  };
}