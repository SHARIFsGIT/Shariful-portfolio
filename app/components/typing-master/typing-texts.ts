export const typingTexts = [
  // Easy texts (30-50 characters)
  {
    id: 1,
    text: 'The quick brown fox jumps over the lazy dog.',
    difficulty: 'easy',
    category: 'pangram',
  },
  {
    id: 2,
    text: 'Pack my box with five dozen liquor jugs.',
    difficulty: 'easy',
    category: 'pangram',
  },

  // Medium texts (50-100 characters)
  {
    id: 3,
    text: 'JavaScript is a high-level, interpreted programming language that conforms to ECMAScript.',
    difficulty: 'medium',
    category: 'technical',
  },
  {
    id: 4,
    text: 'React is a free and open-source front-end JavaScript library for building user interfaces.',
    difficulty: 'medium',
    category: 'technical',
  },

  // Hard texts (100+ characters)
  {
    id: 5,
    text: 'In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values.',
    difficulty: 'hard',
    category: 'technical',
  },
  {
    id: 6,
    text: 'The Internet of Things (IoT) describes physical objects with sensors, processing ability, software, and other technologies that enable them to connect and exchange data with other devices over the Internet.',
    difficulty: 'hard',
    category: 'technical',
  },

  // Code snippets
  {
    id: 7,
    text: 'function fibonacci(n) { return n <= 1 ? n : fibonacci(n - 1) + fibonacci(n - 2); }',
    difficulty: 'medium',
    category: 'code',
  },
  {
    id: 8,
    text: 'const quickSort = arr => arr.length <= 1 ? arr : [...quickSort(arr.slice(1).filter(x => x <= arr[0])), arr[0], ...quickSort(arr.slice(1).filter(x => x > arr[0]))]',
    difficulty: 'hard',
    category: 'code',
  },

  // Famous quotes
  {
    id: 9,
    text: 'Be the change you wish to see in the world. - Mahatma Gandhi',
    difficulty: 'medium',
    category: 'quote',
  },
  {
    id: 10,
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
    difficulty: 'hard',
    category: 'quote',
  },

  // Science facts
  {
    id: 11,
    text: 'DNA contains the genetic instructions used in the growth, development, functioning, and reproduction of all known living organisms.',
    difficulty: 'medium',
    category: 'science',
  },
  {
    id: 12,
    text: 'Quantum computing uses quantum phenomena such as superposition and entanglement to perform computation.',
    difficulty: 'hard',
    category: 'science',
  },

  // Business texts
  {
    id: 13,
    text: 'Please find attached the quarterly sales report for Q4 2024. The results show significant growth in our core markets.',
    difficulty: 'medium',
    category: 'business',
  },
  {
    id: 14,
    text: 'I am writing to express my interest in the Senior Software Developer position at your company. I have extensive experience in full-stack development.',
    difficulty: 'medium',
    category: 'business',
  },

  // Keyboard practice
  {
    id: 15,
    text: 'asdf jkl; asdf jkl; asdf jkl; asdf jkl;',
    difficulty: 'easy',
    category: 'practice',
  },
  {
    id: 16,
    text: '1234 5678 90 1234 5678 90 1234 5678 90',
    difficulty: 'easy',
    category: 'practice',
  },
]
