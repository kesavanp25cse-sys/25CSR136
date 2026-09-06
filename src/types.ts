export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PriorityLevel = 'High Priority' | 'Medium Priority' | 'Low Priority';

export type StepStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Data & AI' | 'Web & Cloud' | 'Database' | 'Tools & Soft Skills';
  level: SkillLevel;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  provider: string;
  completionDate: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  degree: string;
  department: string;
  college: string;
  graduationYear: number;
  cgpa: number;
  skills: SkillItem[];
  interests: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  targetCareerId: string;
  avatarUrl?: string;
}

export interface RequiredSkill {
  name: string;
  category: string;
  importance: 'Core' | 'Important' | 'Optional';
  requiredLevel: SkillLevel;
  topics: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  description: string;
  averageSalary: string;
  demandLevel: 'Very High' | 'High' | 'Moderate';
  requiredSkills: RequiredSkill[];
  relatedInterests: string[];
  defaultRoadmap: {
    skill: string;
    topics: string[];
    difficulty: SkillLevel;
    duration: string;
  }[];
}

export interface CareerMatchResult {
  career: CareerRole;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  improveSkills: string[];
  reasons: string[];
  explanation: string;
}

export interface SkillGapAnalysis {
  targetCareer: CareerRole;
  alreadyHave: { name: string; level: SkillLevel; requiredLevel: SkillLevel }[];
  needToImprove: { name: string; level: SkillLevel; requiredLevel: SkillLevel; gap: string }[];
  missing: { name: string; requiredLevel: SkillLevel; importance: string; topics: string[] }[];
  skillCoveragePercentage: number;
  overallSkillGapPercentage: number;
  priorities: SkillPriorityItem[];
}

export interface SkillPriorityItem {
  skill: string;
  currentLevel: SkillLevel | 'None';
  requiredLevel: SkillLevel;
  priority: PriorityLevel;
  estimatedDuration: string;
  importance: string;
  category: string;
}

export interface RoadmapStep {
  id: string;
  stepNumber: number;
  skill: string;
  topics: string[];
  difficulty: SkillLevel;
  duration: string;
  status: StepStatus;
  progressPercentage: number;
  resources?: { title: string; type: 'video' | 'doc' | 'practice'; link?: string }[];
}

export interface CareerReadinessBreakdown {
  overallScore: number;
  technicalSkillsScore: number;
  projectsScore: number;
  certificationsScore: number;
  resumeScore: number;
  skillGapScore: number;
  suggestions: string[];
}

export interface AiProfileAnalysisResult {
  strengths: string[];
  areasToImprove: string[];
  topCareerRecommendation: string;
  personalizedSummary: string;
  keyInsights: string[];
}

export interface ResumeExtractedData {
  fileName: string;
  fileSize: string;
  parsedDate: string;
  candidateName: string;
  candidateEmail: string;
  education: string;
  technicalSkills: string[];
  softSkills: string[];
  projects: string[];
  certifications: string[];
  toolsAndTech: string[];
  experienceSummary: string;
  rawSnippet: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'success' | 'info' | 'progress';
}

export type ScreenName =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'signup'
  | 'profile-setup'
  | 'dashboard'
  | 'resume-analyzer'
  | 'career-recommendations'
  | 'skill-gap'
  | 'roadmap'
  | 'progress'
  | 'readiness'
  | 'settings'
  | 'about'
  | 'workflow';

export type ScreenType = ScreenName;
