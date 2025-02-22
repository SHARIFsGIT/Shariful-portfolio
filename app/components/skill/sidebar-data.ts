import {
  IconApi,
  IconBrandGit,
  IconBrandReact,
  IconCode,
  IconDatabase,
  IconServer,
  IconTestPipe,
  IconTool,
} from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface SidebarItem {
  id: string
  label: string
  description: string
  icon: ForwardRefExoticComponent<
    TablerIcon.Props & RefAttributes<SVGSVGElement>
  >
  count?: number
  backgroundColor?: string
  accentColor?: string
}

export const sidebarData: SidebarItem[] = [
  {
    id: 'languages',
    label: 'Languages',
    description: 'Core programming languages and technologies',
    icon: IconCode,
    count: 4,
    backgroundColor: 'from-blue-500 to-blue-600',
    accentColor: 'text-blue-500',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'UI frameworks and client-side technologies',
    icon: IconBrandReact,
    count: 6,
    backgroundColor: 'from-cyan-500 to-cyan-600',
    accentColor: 'text-cyan-500',
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'Server-side development and APIs',
    icon: IconServer,
    count: 5,
    backgroundColor: 'from-green-500 to-green-600',
    accentColor: 'text-green-500',
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Database systems and data storage',
    icon: IconDatabase,
    count: 5,
    backgroundColor: 'from-purple-500 to-purple-600',
    accentColor: 'text-purple-500',
  },
  {
    id: 'testing',
    label: 'Testing',
    description: 'Testing frameworks and quality assurance',
    icon: IconTestPipe,
    count: 3,
    backgroundColor: 'from-red-500 to-red-600',
    accentColor: 'text-red-500',
  },
  {
    id: 'api',
    label: 'API Development',
    description: 'REST, GraphQL, and API design',
    icon: IconApi,
    count: 4,
    backgroundColor: 'from-yellow-500 to-yellow-600',
    accentColor: 'text-yellow-500',
  },
  {
    id: 'version-control',
    label: 'Version Control',
    description: 'Git, GitHub, and collaboration tools',
    icon: IconBrandGit,
    count: 3,
    backgroundColor: 'from-orange-500 to-orange-600',
    accentColor: 'text-orange-500',
  },
  {
    id: 'tools',
    label: 'Dev Tools',
    description: 'Development tools and utilities',
    icon: IconTool,
    count: 4,
    backgroundColor: 'from-gray-500 to-gray-600',
    accentColor: 'text-gray-500',
  },
]

// Group categories
export interface CategoryGroup {
  label: string
  items: SidebarItem[]
}

export const categoryGroups: CategoryGroup[] = [
  {
    label: 'Core Skills',
    items: sidebarData.filter((item) =>
      ['languages', 'frontend', 'backend', 'databases'].includes(item.id)
    ),
  },
  {
    label: 'Development Practices',
    items: sidebarData.filter((item) =>
      ['testing', 'version-control', 'api'].includes(item.id)
    ),
  },
  {
    label: 'Supporting Skills',
    items: sidebarData.filter((item) => ['tools'].includes(item.id)),
  },
]

// Types for skill levels
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface SkillLevelDefinition {
  level: SkillLevel
  proficiencyRange: [number, number] // [min, max] percentage
  description: string
}

export const skillLevels: SkillLevelDefinition[] = [
  {
    level: 'Beginner',
    proficiencyRange: [0, 25],
    description: 'Basic understanding and limited practical experience',
  },
  {
    level: 'Intermediate',
    proficiencyRange: [26, 50],
    description: 'Good working knowledge and regular practical application',
  },
  {
    level: 'Advanced',
    proficiencyRange: [51, 75],
    description: 'Deep understanding and extensive practical experience',
  },
  {
    level: 'Expert',
    proficiencyRange: [76, 100],
    description: 'Comprehensive mastery and professional expertise',
  },
]

// Helper function to get category details by ID
export const getCategoryById = (id: string): SidebarItem | undefined => {
  return sidebarData.find((item) => item.id === id)
}

// Get skill level based on proficiency percentage
export const getSkillLevel = (proficiency: number): SkillLevelDefinition => {
  return (
    skillLevels.find(
      (level) =>
        proficiency >= level.proficiencyRange[0] &&
        proficiency <= level.proficiencyRange[1]
    ) || skillLevels[0]
  )
}

// Utility function to get Tailwind classes for skill level
export const getSkillLevelClasses = (level: SkillLevel): string => {
  const classes = {
    Beginner:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Intermediate:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Advanced:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Expert: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }
  return classes[level]
}

// Utility function to check if a skill is active in current view
export const isSkillActive = (currentId: string, skillId: string): boolean => {
  return currentId === skillId
}

// Utility function to get total skills count
export const getTotalSkillsCount = (): number => {
  return sidebarData.reduce((total, item) => total + (item.count || 0), 0)
}

// Utility function to get background gradient class
export const getBackgroundGradient = (item: SidebarItem): string => {
  return `bg-gradient-to-br ${item.backgroundColor} ${item.accentColor}`
}
