import {
  Bot,
  CircuitBoard,
  Code,
  Code2,
  Computer,
  LucideIcon,
  Monitor,
  Wrench,
} from 'lucide-react'

// Icon component type
export type IconComponent = LucideIcon

// Enhanced type for SidebarItem with more precise typing
export interface SidebarItem {
  id: string
  label: string
  description: string
  icon: LucideIcon
  count: number
  backgroundColor: `from-${string}-500 to-${string}-600`
  accentColor: `text-${string}-500`
}

// Const assertion for better type inference and immutability
export const SIDEBAR_CATEGORIES = [
  'os',
  'programming',
  'robotics',
  'software-development',
  'web-development',
  'circuit-designing',
  'tools',
] as const

// Type for sidebar category
export type SidebarCategory = (typeof SIDEBAR_CATEGORIES)[number]

// Improved sidebarData with more robust typing
export const sidebarData: ReadonlyArray<SidebarItem> = [
  {
    id: 'os',
    label: 'Operating Systems',
    description: 'Windows and Linux system administration',
    icon: Computer,
    count: 2,
    backgroundColor: 'from-blue-500 to-blue-600',
    accentColor: 'text-blue-500',
  },
  {
    id: 'programming',
    label: 'Programming',
    description: 'Core programming languages',
    icon: Code,
    count: 3,
    backgroundColor: 'from-purple-500 to-purple-600',
    accentColor: 'text-purple-500',
  },
  {
    id: 'robotics',
    label: 'Robotics',
    description: 'Robotics and automation technologies',
    icon: Bot,
    count: 5,
    backgroundColor: 'from-green-500 to-green-600',
    accentColor: 'text-green-500',
  },
  {
    id: 'software-development',
    label: 'Software Development',
    description: 'Software development frameworks and tools',
    icon: Code2,
    count: 6,
    backgroundColor: 'from-indigo-500 to-indigo-600',
    accentColor: 'text-indigo-500',
  },
  {
    id: 'web-development',
    label: 'Web Development',
    description: 'Full-stack web development technologies',
    icon: Monitor,
    count: 19,
    backgroundColor: 'from-cyan-500 to-cyan-600',
    accentColor: 'text-cyan-500',
  },
  {
    id: 'circuit-designing',
    label: 'Circuit Designing',
    description: 'Electronic circuit design and simulation',
    icon: CircuitBoard,
    count: 4,
    backgroundColor: 'from-red-500 to-red-600',
    accentColor: 'text-red-500',
  },
  {
    id: 'tools',
    label: 'Tools',
    description: 'Development and productivity tools',
    icon: Wrench,
    count: 4,
    backgroundColor: 'from-gray-500 to-gray-600',
    accentColor: 'text-gray-500',
  },
]

// More robust skill category data structure
export interface SkillData {
  id: string
  name: string
  category: SidebarCategory
  proficiency: number
  experience: string
  description: string
}

// Define the skills for each category
export const skillsData: Record<SidebarCategory, SkillData[]> = {
  os: [
    {
      id: 'windows',
      name: 'Windows',
      category: 'os',
      proficiency: 85,
      experience: '5+ years',
      description: 'Windows system administration and development',
    },
    {
      id: 'linux',
      name: 'Linux',
      category: 'os',
      proficiency: 80,
      experience: '4+ years',
      description: 'Linux system administration and shell scripting',
    },
  ],
  programming: [
    {
      id: 'c',
      name: 'C',
      category: 'programming',
      proficiency: 90,
      experience: '6+ years',
      description: 'System programming and embedded development',
    },
    {
      id: 'cpp',
      name: 'C++',
      category: 'programming',
      proficiency: 85,
      experience: '5+ years',
      description: 'Object-oriented programming and application development',
    },
    {
      id: 'python',
      name: 'Python',
      category: 'programming',
      proficiency: 95,
      experience: '5+ years',
      description: 'Scientific computing and automation',
    },
  ],
  robotics: [
    {
      id: 'ros',
      name: 'Robot Operating System (ROS)',
      category: 'robotics',
      proficiency: 85,
      experience: '3+ years',
      description: 'Robotic system development and integration',
    },
    {
      id: 'arduino',
      name: 'Arduino',
      category: 'robotics',
      proficiency: 90,
      experience: '4+ years',
      description: 'Microcontroller programming and prototyping',
    },
    {
      id: 'gazebo',
      name: 'Gazebo',
      category: 'robotics',
      proficiency: 80,
      experience: '2+ years',
      description: 'Robot simulation and testing',
    },
    {
      id: 'plc',
      name: 'PLC Programming',
      category: 'robotics',
      proficiency: 75,
      experience: '2+ years',
      description: 'Industrial automation and control',
    },
    {
      id: 'bash',
      name: 'Bash',
      category: 'robotics',
      proficiency: 85,
      experience: '3+ years',
      description: 'Shell scripting and automation',
    },
  ],
  'software-development': [
    {
      id: 'django',
      name: 'Django',
      category: 'software-development',
      proficiency: 90,
      experience: '4+ years',
      description: 'Web application framework',
    },
    {
      id: 'pytorch',
      name: 'PyTorch',
      category: 'software-development',
      proficiency: 85,
      experience: '3+ years',
      description: 'Deep learning and AI development',
    },
    {
      id: 'opencv',
      name: 'OpenCV',
      category: 'software-development',
      proficiency: 88,
      experience: '3+ years',
      description: 'Computer vision and image processing',
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'software-development',
      proficiency: 85,
      experience: '4+ years',
      description: 'Relational database management',
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'software-development',
      proficiency: 82,
      experience: '3+ years',
      description: 'Container virtualization and deployment',
    },
    {
      id: 'gitlab-cicd',
      name: 'GitLab CI/CD',
      category: 'software-development',
      proficiency: 80,
      experience: '2+ years',
      description: 'Continuous integration and deployment',
    },
  ],
  'web-development': [
    {
      id: 'html',
      name: 'HTML',
      category: 'web-development',
      proficiency: 95,
      experience: '5+ years',
      description: 'Web markup and structure',
    },
    {
      id: 'css',
      name: 'CSS',
      category: 'web-development',
      proficiency: 90,
      experience: '5+ years',
      description: 'Web styling and design',
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'web-development',
      proficiency: 92,
      experience: '4+ years',
      description: 'Client-side programming',
    },
    {
      id: 'react',
      name: 'React.js',
      category: 'web-development',
      proficiency: 88,
      experience: '3+ years',
      description: 'UI component development',
    },
  ],
  'circuit-designing': [
    {
      id: 'eagle',
      name: 'EAGLE',
      category: 'circuit-designing',
      proficiency: 85,
      experience: '3+ years',
      description: 'PCB design and schematic capture',
    },
    {
      id: 'proteus',
      name: 'Proteus',
      category: 'circuit-designing',
      proficiency: 80,
      experience: '2+ years',
      description: 'Circuit simulation and PCB design',
    },
    {
      id: 'ltspice',
      name: 'LTspice',
      category: 'circuit-designing',
      proficiency: 75,
      experience: '2+ years',
      description: 'Electronic circuit simulation',
    },
    {
      id: 'multisim',
      name: 'Multisim',
      category: 'circuit-designing',
      proficiency: 78,
      experience: '2+ years',
      description: 'Circuit design and analysis',
    },
  ],
  tools: [
    {
      id: 'git',
      name: 'Git',
      category: 'tools',
      proficiency: 90,
      experience: '4+ years',
      description: 'Version control system',
    },
    {
      id: 'github',
      name: 'Github',
      category: 'tools',
      proficiency: 88,
      experience: '4+ years',
      description: 'Code hosting and collaboration',
    },
    {
      id: 'vscode',
      name: 'VS Code',
      category: 'tools',
      proficiency: 92,
      experience: '4+ years',
      description: 'Code editing and development',
    },
    {
      id: 'trello',
      name: 'Trello',
      category: 'tools',
      proficiency: 85,
      experience: '3+ years',
      description: 'Project management and organization',
    },
  ],
}

// Utility functions
export function getCategoryById(id: SidebarCategory): SidebarItem | undefined {
  return sidebarData.find((item) => item.id === id)
}

export function getSkillsByCategory(category: SidebarCategory): SkillData[] {
  return skillsData[category] || []
}

export function getAllSkills(): SkillData[] {
  return Object.values(skillsData).flat()
}

export function searchSkills(query: string): SkillData[] {
  const searchTerm = query.toLowerCase()
  return getAllSkills().filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm) ||
      skill.description.toLowerCase().includes(searchTerm)
  )
}
