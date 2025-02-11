// Type definitions
export interface TypingText {
  id: number
  text: string
  difficulty: 'easy' | 'medium' | 'hard'
  category:
    | 'humor'
    | 'tech'
    | 'quotes'
    | 'programming'
    | 'science'
    | 'literature'
  wordCount: number
}

// Utility functions
export const getDifficultyColor = (difficulty: TypingText['difficulty']) => {
  switch (difficulty) {
    case 'easy':
      return 'text-green-500'
    case 'medium':
      return 'text-yellow-500'
    case 'hard':
      return 'text-red-500'
    default:
      return 'text-gray-500'
  }
}

export const getCategoryIcon = (category: TypingText['category']) => {
  switch (category) {
    case 'humor':
      return '😄'
    case 'tech':
      return '💻'
    case 'quotes':
      return '💭'
    case 'programming':
      return '👨‍💻'
    case 'science':
      return '🔬'
    case 'literature':
      return '📚'
    default:
      return '📝'
  }
}

export const typingTexts: TypingText[] = [
  // Humor Category - Easy
  {
    id: 1,
    text: "Why did the programmer quit his job? Because he didn't get arrays.",
    difficulty: 'easy',
    category: 'humor',
    wordCount: 12,
  },
  {
    id: 2,
    text: "I told my computer I needed a break, and now it won't stop sending me vacation ads.",
    difficulty: 'easy',
    category: 'humor',
    wordCount: 16,
  },
  {
    id: 3,
    text: 'Why do programmers prefer dark mode? Because light attracts bugs!',
    difficulty: 'easy',
    category: 'humor',
    wordCount: 11,
  },

  // Tech Category - Medium
  {
    id: 4,
    text: 'Artificial Intelligence and Machine Learning are revolutionizing the way we interact with technology and process data.',
    difficulty: 'medium',
    category: 'tech',
    wordCount: 15,
  },
  {
    id: 5,
    text: 'Cloud computing enables businesses to scale their infrastructure dynamically while reducing operational costs.',
    difficulty: 'medium',
    category: 'tech',
    wordCount: 13,
  },
  {
    id: 6,
    text: 'The Internet of Things (IoT) connects everyday devices to the internet, creating a network of smart objects.',
    difficulty: 'medium',
    category: 'tech',
    wordCount: 16,
  },

  // Programming Category - Hard
  {
    id: 7,
    text: 'async function fetchData() { try { const response = await fetch(url); return await response.json(); } catch (error) { console.error(error); } }',
    difficulty: 'hard',
    category: 'programming',
    wordCount: 20,
  },
  {
    id: 8,
    text: 'const memoize = fn => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); return cache.get(key) ?? cache.set(key, fn(...args)).get(key); }; };',
    difficulty: 'hard',
    category: 'programming',
    wordCount: 30,
  },
  {
    id: 9,
    text: 'class Observable { constructor() { this.observers = []; } subscribe(fn) { this.observers.push(fn); } notify(data) { this.observers.forEach(fn => fn(data)); } }',
    difficulty: 'hard',
    category: 'programming',
    wordCount: 25,
  },

  // Quotes Category - Medium
  {
    id: 10,
    text: 'The best way to predict the future is to invent it. - Alan Kay',
    difficulty: 'medium',
    category: 'quotes',
    wordCount: 13,
  },
  {
    id: 11,
    text: 'Innovation distinguishes between a leader and a follower. - Steve Jobs',
    difficulty: 'medium',
    category: 'quotes',
    wordCount: 11,
  },
  {
    id: 12,
    text: 'The only way to do great work is to love what you do. - Steve Jobs',
    difficulty: 'medium',
    category: 'quotes',
    wordCount: 14,
  },

  // Science Category - Hard
  {
    id: 13,
    text: 'Quantum entanglement occurs when particles interact in ways such that the quantum state of each particle cannot be described independently.',
    difficulty: 'hard',
    category: 'science',
    wordCount: 19,
  },
  {
    id: 14,
    text: 'The theory of general relativity suggests that massive objects distort the fabric of spacetime, causing what we experience as gravity.',
    difficulty: 'hard',
    category: 'science',
    wordCount: 20,
  },
  {
    id: 15,
    text: 'CRISPR-Cas9 is a powerful gene-editing tool that allows scientists to make precise modifications to DNA sequences.',
    difficulty: 'hard',
    category: 'science',
    wordCount: 16,
  },

  // Literature Category - Medium
  {
    id: 16,
    text: 'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.',
    difficulty: 'medium',
    category: 'literature',
    wordCount: 23,
  },
  {
    id: 17,
    text: 'All that we see or seem is but a dream within a dream. - Edgar Allan Poe',
    difficulty: 'medium',
    category: 'literature',
    wordCount: 15,
  },
  {
    id: 18,
    text: 'To be, or not to be, that is the question. - William Shakespeare',
    difficulty: 'medium',
    category: 'literature',
    wordCount: 11,
  },

  // Tech Category - Easy
  {
    id: 19,
    text: 'Remember to always back up your important files regularly.',
    difficulty: 'easy',
    category: 'tech',
    wordCount: 10,
  },
  {
    id: 20,
    text: 'Using strong passwords is essential for online security.',
    difficulty: 'easy',
    category: 'tech',
    wordCount: 9,
  },

  // Programming Category - Medium
  {
    id: 21,
    text: 'function debounce(func, wait) { let timeout; return function executedFunction(...args) { const later = () => { func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; }',
    difficulty: 'medium',
    category: 'programming',
    wordCount: 28,
  },
  {
    id: 22,
    text: 'const deepClone = obj => JSON.parse(JSON.stringify(obj));',
    difficulty: 'medium',
    category: 'programming',
    wordCount: 8,
  },

  // Humor Category - Easy
  {
    id: 23,
    text: 'I would tell you a UDP joke, but you might not get it.',
    difficulty: 'easy',
    category: 'humor',
    wordCount: 12,
  },
  {
    id: 24,
    text: 'Why do programmers always mix up Halloween and Christmas? Because Oct 31 equals Dec 25!',
    difficulty: 'easy',
    category: 'humor',
    wordCount: 15,
  },

  // Science Category - Medium
  {
    id: 25,
    text: 'The human brain processes images 60,000 times faster than text, making visual learning highly efficient.',
    difficulty: 'medium',
    category: 'science',
    wordCount: 14,
  },
  {
    id: 26,
    text: 'Photosynthesis converts light energy into chemical energy that plants use to produce glucose from carbon dioxide and water.',
    difficulty: 'medium',
    category: 'science',
    wordCount: 18,
  },

  // Literature Category - Hard
  {
    id: 27,
    text: 'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.',
    difficulty: 'hard',
    category: 'literature',
    wordCount: 52,
  },
  {
    id: 28,
    text: 'Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.',
    difficulty: 'hard',
    category: 'literature',
    wordCount: 42,
  },
]

// Helper functions for text selection
export const getTextsByDifficulty = (difficulty: TypingText['difficulty']) =>
  typingTexts.filter((text) => text.difficulty === difficulty)

export const getTextsByCategory = (category: TypingText['category']) =>
  typingTexts.filter((text) => text.category === category)

export const getRandomText = (
  difficulty?: TypingText['difficulty'],
  category?: TypingText['category']
) => {
  let filtered = typingTexts
  if (difficulty) {
    filtered = filtered.filter((text) => text.difficulty === difficulty)
  }
  if (category) {
    filtered = filtered.filter((text) => text.category === category)
  }
  return filtered[Math.floor(Math.random() * filtered.length)]
}

// Statistics helpers
export const calculateTextDifficulty = (
  text: string
): TypingText['difficulty'] => {
  const wordCount = text.split(' ').length
  const averageWordLength = text.length / wordCount
  const specialCharCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length

  if (wordCount > 30 || averageWordLength > 7 || specialCharCount > 10) {
    return 'hard'
  } else if (wordCount > 15 || averageWordLength > 5 || specialCharCount > 5) {
    return 'medium'
  }
  return 'easy'
}
