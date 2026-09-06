import { StudentProfile } from '../types';

export const SAMPLE_STUDENT_PROFILE: StudentProfile = {
  id: 'kesavan-001',
  name: 'Kesavan',
  email: 'kesavanperiyasamy571@gmail.com',
  degree: 'B.E. Computer Science and Engineering',
  department: 'Computer Science & Engineering (Final Year)',
  college: 'College of Engineering, Anna University',
  graduationYear: 2026,
  cgpa: 8.4,
  skills: [
    { id: 's1', name: 'Python', category: 'Programming', level: 'Intermediate' },
    { id: 's2', name: 'C++', category: 'Programming', level: 'Intermediate' },
    { id: 's3', name: 'HTML', category: 'Web & Cloud', level: 'Intermediate' },
    { id: 's4', name: 'SQL', category: 'Database', level: 'Beginner' },
  ],
  interests: ['Artificial Intelligence', 'Data Analytics', 'Machine Learning'],
  projects: [
    {
      id: 'p1',
      name: 'Student Management System',
      description: 'A desktop application with relational database integration to manage student records, attendance, and fee tracking.',
      technologies: ['Python', 'SQL', 'SQLite', 'Tkinter'],
    },
    {
      id: 'p2',
      name: 'Sales Prediction System',
      description: 'Applied basic regression analysis on historical retail dataset to forecast quarterly sales trends.',
      technologies: ['Python', 'Pandas', 'Scikit-learn Basics'],
    },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'Python for Data Science',
      provider: 'Coursera / IBM',
      completionDate: 'November 2025',
    },
    {
      id: 'c2',
      name: 'SQL Fundamentals Certification',
      provider: 'HackerRank',
      completionDate: 'January 2026',
    },
  ],
  targetCareerId: 'data-analyst',
};
