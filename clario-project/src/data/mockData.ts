export const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-100 text-green-700' },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
  { id: 'stressed', label: 'Stressed', emoji: '😫', color: 'bg-red-100 text-red-700' },
];

export const habits = [
  { id: 1, title: 'Morning Workout', streak: 12, completed: true },
  { id: 2, title: 'Read 20 pages', streak: 5, completed: false },
  { id: 3, title: 'Drink Water', streak: 21, completed: true },
  { id: 4, title: 'Meditation', streak: 2, completed: false },
];

export const tasks = [
  { id: 1, title: 'Finish project presentation', completed: false, priority: 'high' },
  { id: 2, title: 'Study React component patterns', completed: false, priority: 'medium' },
  { id: 3, title: 'Go for a run', completed: true, priority: 'low' },
  { id: 4, title: 'Reply to emails', completed: false, priority: 'medium' },
];

export const insights = [
  { id: 1, text: "You've been consistently tracking your habits for the last 5 days. Keep up the momentum!" },
  { id: 2, text: "Your mood seems slightly stressed today. Consider taking a 10-minute break to meditate." },
  { id: 3, text: "Great job completing your high priority tasks for the morning." }
];

export const user = {
  name: "Joel Navales",
  email: "joel@email.com",
  avatar: "https://i.pravatar.cc/150?u=joel"
};

export const userStats = {
  totalHabits: 12,
  tasksCompleted: 148,
  currentStreak: 5,
  moodConsistency: "85%"
};
