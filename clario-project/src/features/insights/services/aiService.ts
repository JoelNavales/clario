// ─── Types ────────────────────────────────────────────────────────────────────

export interface MoodEntry {
  mood_id: string   // 'happy' | 'neutral' | 'stressed'
  mood_date: string // 'YYYY-MM-DD'
}

export interface HabitLog {
  habit_id: number
  date: string      // 'YYYY-MM-DD'
}

export interface TaskEntry {
  completed: boolean
  priority?: string
  created_at: string
}

export interface InsightInput {
  moods: MoodEntry[]
  habitLogs: HabitLog[]
  tasks: TaskEntry[]
}

// ─── Mood Scoring ─────────────────────────────────────────────────────────────

const MOOD_SCORES: Record<string, number> = {
  happy: 1,
  neutral: 0,
  stressed: -1,
  sad: -1,
}

export function getMoodScore(moodId: string): number {
  return MOOD_SCORES[moodId.toLowerCase()] ?? 0
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function uniqueDates(entries: { date: string }[]): Set<string> {
  return new Set(entries.map((e) => e.date))
}

function dayOfWeekName(dateStr: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[new Date(dateStr + 'T12:00:00').getDay()]
}

function mostFrequent<T>(items: T[]): T | null {
  if (items.length === 0) return null
  const freq = new Map<T, number>()
  items.forEach((item) => freq.set(item, (freq.get(item) ?? 0) + 1))
  let best: T = items[0]
  let bestCount = 0
  freq.forEach((count, item) => {
    if (count > bestCount) { bestCount = count; best = item }
  })
  return best
}

// ─── Individual Analysis Rules ────────────────────────────────────────────────

/**
 * A. Mood Trend – detects if the last 3–5 logged moods are all negative.
 */
function analyzeMoodTrend(moods: MoodEntry[]): string | null {
  if (moods.length < 3) return null

  const recent = moods.slice(0, 5)
  const allNegative = recent.every((m) => getMoodScore(m.mood_id) < 0)
  if (allNegative) {
    return "Your mood has been low recently. Consider lighter tasks and take some time for yourself. 💙"
  }

  const allPositive = recent.every((m) => getMoodScore(m.mood_id) > 0)
  if (allPositive) {
    return "You've been in a great mood lately — keep up whatever you're doing! 🌟"
  }

  return null
}

/**
 * B. Positive Correlation – detects overlap between habit completion days and happy mood days.
 */
function analyzeHabitMoodCorrelation(moods: MoodEntry[], habitLogs: HabitLog[]): string | null {
  if (moods.length === 0 || habitLogs.length === 0) return null

  const habitDates = uniqueDates(habitLogs)
  const happyDays = moods.filter((m) => getMoodScore(m.mood_id) > 0).map((m) => m.mood_date)

  if (happyDays.length === 0) return null

  const overlap = happyDays.filter((d) => habitDates.has(d))
  const correlationRate = overlap.length / happyDays.length

  if (correlationRate >= 0.6) {
    return "You tend to feel better on days you complete your habits. Keep the streak going! 🏆"
  }

  return null
}

/**
 * C. Task Overload – detects a high number of incomplete tasks.
 */
function analyzeTaskOverload(tasks: TaskEntry[]): string | null {
  if (tasks.length === 0) return null

  const incomplete = tasks.filter((t) => !t.completed)
  const overloadThreshold = 5
  const overloadRatio = 0.6

  if (
    incomplete.length >= overloadThreshold &&
    incomplete.length / tasks.length >= overloadRatio
  ) {
    return `You have ${incomplete.length} unfinished tasks. You may be feeling overwhelmed — try tackling one small task at a time. 🧩`
  }

  return null
}

/**
 * D. Productivity Pattern – finds the day of the week with the most completed tasks.
 */
function analyzeProductivityPattern(tasks: TaskEntry[]): string | null {
  const completed = tasks.filter((t) => t.completed)
  if (completed.length < 4) return null

  const days = completed.map((t) => dayOfWeekName(t.created_at.split('T')[0]))
  const bestDay = mostFrequent(days)

  if (!bestDay) return null
  return `You tend to be most productive on ${bestDay}s. Consider scheduling your most important tasks then. 📅`
}

/**
 * E. Consistency Insight – rewards regular mood logging.
 */
function analyzeConsistency(moods: MoodEntry[]): string | null {
  if (moods.length === 0) return null

  // Check how many of the last 7 days have a mood logged
  const today = new Date()
  let loggedDays = 0
  for (let i = 0; i < 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (moods.some((m) => m.mood_date === dateStr)) loggedDays++
  }

  if (loggedDays >= 6) {
    return "Great job staying consistent with your mood tracking this week! Self-awareness is the first step to growth. ✨"
  }
  if (loggedDays >= 4) {
    return "You're building a solid tracking habit. Try to log your mood every day for the full picture. 📊"
  }

  return null
}

/**
 * F. High Priority Task Backlog – many high-priority tasks are incomplete.
 */
function analyzeHighPriorityBacklog(tasks: TaskEntry[]): string | null {
  const highIncomplete = tasks.filter(
    (t) => !t.completed && t.priority === 'high'
  )
  if (highIncomplete.length >= 3) {
    return `You have ${highIncomplete.length} high-priority tasks waiting. Tackling one today can reduce stress significantly. 🔥`
  }
  return null
}

/**
 * G. Habit skipped streak – no habit logs in the last 3+ days.
 */
function analyzeHabitStreak(habitLogs: HabitLog[]): string | null {
  if (habitLogs.length === 0) return null

  const today = new Date()
  let daysMissed = 0
  for (let i = 1; i <= 3; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    if (!habitLogs.some((l) => l.date === dateStr)) daysMissed++
  }

  if (daysMissed >= 3) {
    return "You haven't logged any habits in the past few days. Small actions add up — try completing just one today. 🌱"
  }

  return null
}

// ─── Main Function ─────────────────────────────────────────────────────────────

export function generateInsights({ moods, habitLogs, tasks }: InsightInput): string[] {
  // Sort moods newest-first so slice(0, N) = most recent
  const sortedMoods = [...moods].sort(
    (a, b) => new Date(b.mood_date).getTime() - new Date(a.mood_date).getTime()
  )

  const runners: Array<() => string | null> = [
    () => analyzeMoodTrend(sortedMoods),
    () => analyzeHabitMoodCorrelation(sortedMoods, habitLogs),
    () => analyzeTaskOverload(tasks),
    () => analyzeProductivityPattern(tasks),
    () => analyzeConsistency(sortedMoods),
    () => analyzeHighPriorityBacklog(tasks),
    () => analyzeHabitStreak(habitLogs),
  ]

  const insights: string[] = []
  for (const run of runners) {
    const result = run()
    if (result) insights.push(result)
  }

  if (insights.length === 0) {
    return ["Start logging your moods, habits, and tasks to unlock personalised insights. 🚀"]
  }

  return insights
}
