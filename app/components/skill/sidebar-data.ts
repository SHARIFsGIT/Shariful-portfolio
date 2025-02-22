import {
  IconApi,
  IconBrandGit,
  IconBrandReact,
  IconCode,
  IconDatabase,
  IconServer,
  IconTestPipe,
  IconTool,
} from '@tabler/icons-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

// Improve TablerIcon type definition
export type TablerIconComponent = ForwardRefExoticComponent<
  TablerIcon.Props & RefAttributes<SVGSVGElement>
>

// Enhanced type for SidebarItem with more precise typing
export interface SidebarItem {
  id: string
  label: string
  description: string
  icon: TablerIconComponent
  count: number // Make count non-optional with a default
  backgroundColor: `from-${string}-500 to-${string}-600` // More precise color typing
  accentColor: `text-${string}-500` // More precise color typing
}

// Const assertion for better type inference and immutability
export const SIDEBAR_CATEGORIES = [
  'languages',
  'frontend',
  'backend',
  'databases',
  'testing',
  'api',
  'version-control',
  'tools',
] as const

// Type for sidebar category
export type SidebarCategory = (typeof SIDEBAR_CATEGORIES)[number]

// Improved sidebarData with more robust typing
export const sidebarData: ReadonlyArray<SidebarItem> = [
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
] as const

// Improved CategoryGroup interface
export interface CategoryGroup {
  label: string
  items: ReadonlyArray<SidebarItem>
}

// More type-safe category grouping
export const categoryGroups: ReadonlyArray<CategoryGroup> = [
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
    items: sidebarData.filter((item) => item.id === 'tools'),
  },
] as const

// Skill levels as const enum for better type safety
export const SKILL_LEVELS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
] as const

// More precise type for skill levels
export type SkillLevel = (typeof SKILL_LEVELS)[number]

// Enhanced SkillLevelDefinition interface
export interface SkillLevelDefinition {
  readonly level: SkillLevel
  readonly proficiencyRange: readonly [number, number] // Immutable tuple
  readonly description: string
}

// Skill levels with improved typing
export const skillLevels: ReadonlyArray<SkillLevelDefinition> = [
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
] as const

// Improved type-safe category lookup
export function getCategoryById(id: SidebarCategory): SidebarItem | undefined {
  return sidebarData.find((item) => item.id === id)
}

// More robust skill level determination
export function getSkillLevel(proficiency: number): SkillLevelDefinition {
  if (proficiency < 0 || proficiency > 100) {
    throw new Error('Proficiency must be between 0 and 100')
  }

  return (
    skillLevels.find(
      (level) =>
        proficiency >= level.proficiencyRange[0] &&
        proficiency <= level.proficiencyRange[1]
    ) ?? skillLevels[0]
  )
}

// Enhanced Tailwind classes function with more robust typing
export function getSkillLevelClasses(level: SkillLevel): string {
  const classMap: Record<SkillLevel, string> = {
    Beginner:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Intermediate:
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Advanced:
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Expert: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }

  return classMap[level]
}

// More explicit active skill checking
export function isSkillActive(currentId: string, skillId: string): boolean {
  return currentId === skillId
}

// Improved total skills count calculation
export function getTotalSkillsCount(): number {
  return sidebarData.reduce((total, item) => total + item.count, 0)
}

// More type-safe background gradient generation
export function getBackgroundGradient(item: SidebarItem): string {
  return `bg-gradient-to-br ${item.backgroundColor} ${item.accentColor}`
}

// New utility: Get skills by minimum proficiency level
export function getSkillsByMinProficiency(
  minProficiency: number
): SkillLevelDefinition[] {
  return skillLevels.filter(
    (level) => level.proficiencyRange[0] >= minProficiency
  )
}

// New utility: Categorize items by their group
export function getItemsByGroup(groupLabel: string): SidebarItem[] {
  const group = categoryGroups.find((g) => g.label === groupLabel)
  return group ? [...group.items] : []
}

// New utility: Create a type-safe icon mapping
export const CATEGORY_ICONS: Record<SidebarCategory, TablerIconComponent> = {
  languages: IconCode,
  frontend: IconBrandReact,
  backend: IconServer,
  databases: IconDatabase,
  testing: IconTestPipe,
  api: IconApi,
  'version-control': IconBrandGit,
  tools: IconTool,
}

// Utility to get color classes for a category
export function getCategoryColorClasses(categoryId: SidebarCategory): {
  backgroundColor: string
  accentColor: string
} {
  const category = getCategoryById(categoryId)
  if (!category) {
    throw new Error(`Category with id ${categoryId} not found`)
  }

  return {
    backgroundColor: category.backgroundColor,
    accentColor: category.accentColor,
  }
}

// Advanced filtering utility
export function filterCategories(
  predicate: (category: SidebarItem) => boolean
): SidebarItem[] {
  return sidebarData.filter(predicate)
}

// Utility to get the most comprehensive skill level
export function getHighestSkillLevel(): SkillLevelDefinition {
  return skillLevels[skillLevels.length - 1]
}

// Utility to generate a summary of skill distributions
export function generateSkillSummary() {
  return {
    totalCategories: sidebarData.length,
    totalSkills: getTotalSkillsCount(),
    skillLevelDistribution: skillLevels.map((level) => ({
      level: level.level,
      description: level.description,
    })),
    categoryGroups: categoryGroups.map((group) => ({
      label: group.label,
      categoryCount: group.items.length,
    })),
  }
}
