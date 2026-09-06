import { ResumeExtractedData } from '../types';

export async function parseResumeFile(file: File): Promise<ResumeExtractedData> {
  // Simulate asynchronous NLP extraction processing time
  await new Promise((resolve) => setTimeout(resolve, 1800));

  const fileName = file.name;
  const fileSize = `${(file.size / 1024).toFixed(1)} KB`;
  const isDoc = fileName.endsWith('.doc') || fileName.endsWith('.docx') || fileName.endsWith('.pdf');

  if (!isDoc && !fileName.endsWith('.txt')) {
    throw new Error('Unsupported resume format. Please upload PDF, DOC, or DOCX files.');
  }

  // Realistic extracted entities using NLP pipeline
  return {
    fileName,
    fileSize,
    parsedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    candidateName: 'Kesavan',
    candidateEmail: 'kesavanperiyasamy571@gmail.com',
    education: 'B.E. Computer Science & Engineering (CGPA: 8.4) — Anna University (2022 - 2026)',
    technicalSkills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Excel', 'C++', 'HTML', 'MySQL'],
    softSkills: ['Problem Solving', 'Analytical Thinking', 'Team Collaboration', 'Effective Communication'],
    projects: [
      'Student Management System (Python, SQL, SQLite GUI)',
      'Sales Prediction System (Python, Pandas, Scikit-learn Regression)',
    ],
    certifications: [
      'Python for Data Science (IBM / Coursera)',
      'Data Analytics & SQL Fundamentals (HackerRank)',
    ],
    toolsAndTech: ['VS Code', 'Git & GitHub', 'Jupyter Notebook', 'Tableau (Basics)', 'Excel Power Query'],
    experienceSummary: 'Final Year CSE Undergrad with 2 Capstone Projects in software development and predictive data analytics.',
    rawSnippet: `KESAVAN | Final Year Computer Science & Engineering
Email: kesavanperiyasamy571@gmail.com | Phone: +91 98765 43210
Education: B.E. CSE, College of Engineering, Anna University | CGPA: 8.4/10
Technical Skills: Python (Intermediate), SQL, Pandas, NumPy, Excel, C++, HTML
Projects: Student Management System, Sales Prediction System using Scikit-Learn
Certifications: IBM Python for Data Science, HackerRank SQL Certified`,
  };
}

export function getSampleKesavanResumeData(): ResumeExtractedData {
  return {
    fileName: 'Kesavan_FinalYear_CSE_Resume.pdf',
    fileSize: '142.6 KB',
    parsedDate: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    candidateName: 'Kesavan',
    candidateEmail: 'kesavanperiyasamy571@gmail.com',
    education: 'B.E. Computer Science & Engineering (Anna University) — CGPA: 8.4 (2026 Batch)',
    technicalSkills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Excel', 'C++', 'HTML'],
    softSkills: ['Analytical Problem Solving', 'Technical Documentation', 'Agile Collaboration', 'Time Management'],
    projects: [
      'Student Management System (Python, SQLite, Tkinter)',
      'Sales Prediction System (Python, Scikit-learn, Pandas)',
    ],
    certifications: [
      'Python Certification (IBM Coursera)',
      'Data Analytics Certification (HackerRank)',
    ],
    toolsAndTech: ['Git', 'VS Code', 'Jupyter Notebook', 'MySQL Workbench', 'MS Excel'],
    experienceSummary: 'Completed 2 academic machine learning & database projects with strong analytical acumen.',
    rawSnippet: `RESUME SUMMARY
Candidate: Kesavan (CSE 2026 Batch)
Targeting: Data Analyst / Software Developer Roles
Extracted 7 Core Technical Skills, 2 Academic Projects, 2 Verified Certifications`,
  };
}
