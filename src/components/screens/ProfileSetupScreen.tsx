import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Briefcase,
  Award,
  Save,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MaterialTopBar } from '../common/MaterialTopBar';
import { MaterialBottomNav } from '../common/MaterialBottomNav';
import { CAREER_ROLES } from '../../data/careerDataset';
import { SkillItem, SkillLevel, ProjectItem, CertificationItem } from '../../types';

export const ProfileSetupScreen: React.FC = () => {
  const { profile, updateProfile, targetCareerId, setTargetCareerId, navigateTo, theme } = useApp();

  // Form states
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [degree, setDegree] = useState(profile.degree);
  const [department, setDepartment] = useState(profile.department);
  const [college, setCollege] = useState(profile.college);
  const [graduationYear, setGraduationYear] = useState(profile.graduationYear);
  const [cgpa, setCgpa] = useState(profile.cgpa);

  // Skills
  const [skills, setSkills] = useState<SkillItem[]>(profile.skills);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Intermediate');

  // Interests
  const allInterests = [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Data Analytics',
    'Web Development',
    'Cybersecurity',
    'Cloud Computing',
    'Mobile App Development',
  ];
  const [selectedInterests, setSelectedInterests] = useState<string[]>(profile.interests);

  // Projects
  const [projects, setProjects] = useState<ProjectItem[]>(profile.projects);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  // Certifications
  const [certifications, setCertifications] = useState<CertificationItem[]>(profile.certifications);
  const [newCertName, setNewCertName] = useState('');
  const [newCertProvider, setNewCertProvider] = useState('');
  const [newCertDate, setNewCertDate] = useState('');
  const [showAddCert, setShowAddCert] = useState(false);

  // Target career search & selection
  const [careerSearch, setCareerSearch] = useState('');
  const [selectedCareerId, setSelectedCareerId] = useState(targetCareerId);

  // Saved indicator
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Quick predefined skills
  const quickSkills = ['Python', 'SQL', 'C++', 'Java', 'HTML', 'CSS', 'JavaScript', 'Pandas', 'Power BI', 'React'];

  const handleAddSkill = (skillToAdd?: string) => {
    const skillName = (skillToAdd || newSkillName).trim();
    if (!skillName) return;

    if (skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      return;
    }

    const newSkill: SkillItem = {
      id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: skillName,
      category: 'Programming',
      level: newSkillLevel,
    };

    setSkills([...skills, newSkill]);
    setNewSkillName('');
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) return;
    const proj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Academic capstone project.',
      technologies: newProjectTech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };
    setProjects([...projects, proj]);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setShowAddProject(false);
  };

  const handleRemoveProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleAddCertification = () => {
    if (!newCertName.trim()) return;
    const cert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: newCertName.trim(),
      provider: newCertProvider.trim() || 'Coursera / HackerRank',
      completionDate: newCertDate.trim() || '2026',
    };
    setCertifications([...certifications, cert]);
    setNewCertName('');
    setNewCertProvider('');
    setNewCertDate('');
    setShowAddCert(false);
  };

  const handleRemoveCert = (id: string) => {
    setCertifications(certifications.filter((c) => c.id !== id));
  };

  const handleSaveProfile = () => {
    updateProfile({
      name,
      email,
      degree,
      department,
      college,
      graduationYear: Number(graduationYear),
      cgpa: Number(cgpa),
      skills,
      interests: selectedInterests,
      projects,
      certifications,
      targetCareerId: selectedCareerId,
    });

    setTargetCareerId(selectedCareerId);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
      navigateTo('dashboard');
    }, 1200);
  };

  const filteredRoles = CAREER_ROLES.filter((role) =>
    role.title.toLowerCase().includes(careerSearch.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col justify-between bg-slate-900 text-slate-100 overflow-y-auto">
      <MaterialTopBar
        title="Student Profile"
        subtitle="Manage Skills, Education & Target Career"
        showBack={true}
        onBack={() => navigateTo('dashboard')}
      />

      <div className="p-4 space-y-6 flex-1 pb-24">
        {saveSuccess && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-300 animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Profile successfully updated! Recalculating career readiness...</span>
          </div>
        )}

        {/* 1. Target Career Selector */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Briefcase className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white">Target Career Role</h2>
          </div>
          <p className="text-xs text-slate-400">
            Select the desired professional role to calibrate your skill gap analysis.
          </p>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={careerSearch}
              onChange={(e) => setCareerSearch(e.target.value)}
              placeholder="Search careers (e.g. Data Analyst, Software Developer)..."
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredRoles.map((role) => {
              const isSelected = selectedCareerId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedCareerId(role.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                      : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{role.title}</span>
                    {isSelected && <span className="text-[10px] bg-indigo-500 text-white px-1.5 py-0.5 rounded">Active</span>}
                  </div>
                  <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">{role.category}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Personal & Academic Information */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <User className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white">Personal &amp; Academic Info</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Student Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Degree &amp; Program</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="B.E. Computer Science and Engineering"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Computer Science & Engineering"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-medium text-slate-400">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="College of Engineering, Anna University"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">Graduation Year</label>
              <input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-400">CGPA / Percentage</label>
              <input
                type="number"
                step="0.01"
                value={cgpa}
                onChange={(e) => setCgpa(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 3. Skills with Levels */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <GraduationCap className="w-4 h-4" />
              <h2 className="text-sm font-bold text-white">Current Skills ({skills.length})</h2>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Specify each technical skill and proficiency level (Beginner, Intermediate, Advanced).
          </p>

          {/* Quick add tags */}
          <div className="space-y-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Suggested Skills:</span>
            <div className="flex flex-wrap gap-1.5">
              {quickSkills.map((qs) => (
                <button
                  key={qs}
                  type="button"
                  onClick={() => handleAddSkill(qs)}
                  className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-[10px] text-slate-300 hover:text-indigo-300 hover:border-indigo-500 transition"
                >
                  + {qs}
                </button>
              ))}
            </div>
          </div>

          {/* Add custom skill row */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              placeholder="Add skill (e.g. C++, Java, SQL)..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <select
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
              className="px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <button
              type="button"
              onClick={() => handleAddSkill()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Current Skill Chips List */}
          <div className="flex flex-wrap gap-2 pt-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 shadow-sm"
              >
                <span className="font-medium text-white">{skill.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    skill.level === 'Advanced'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : skill.level === 'Intermediate'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {skill.level}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="text-slate-500 hover:text-red-400 transition ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Interests */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <h2 className="text-sm font-bold text-white">Career Interests</h2>
          </div>
          <p className="text-xs text-slate-400">
            Tap the subfields and specializations that match your career goals.
          </p>

          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleToggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Projects */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Briefcase className="w-4 h-4" />
              <h2 className="text-sm font-bold text-white">Academic &amp; Capstone Projects</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAddProject(!showAddProject)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Project</span>
            </button>
          </div>

          {showAddProject && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-2 text-xs">
              <input
                type="text"
                placeholder="Project Name (e.g. Student Management System)"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
              <textarea
                placeholder="Project Description"
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                rows={2}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white text-xs"
              />
              <input
                type="text"
                placeholder="Technologies used (comma separated: Python, SQL, Tkinter)"
                value={newProjectTech}
                onChange={(e) => setNewProjectTech(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Save Project
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-start justify-between gap-2"
              >
                <div>
                  <h3 className="text-xs font-bold text-white">{proj.name}</h3>
                  <p className="text-[11px] text-slate-300 mt-0.5">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(proj.id)}
                  className="text-slate-500 hover:text-red-400 p-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Certifications */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Award className="w-4 h-4" />
              <h2 className="text-sm font-bold text-white">Certifications</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAddCert(!showAddCert)}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Certificate</span>
            </button>
          </div>

          {showAddCert && (
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 space-y-2 text-xs">
              <input
                type="text"
                placeholder="Certification Name"
                value={newCertName}
                onChange={(e) => setNewCertName(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Provider (Coursera, HackerRank, IBM)"
                value={newCertProvider}
                onChange={(e) => setNewCertProvider(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="Completion Date (e.g. Nov 2025)"
                value={newCertDate}
                onChange={(e) => setNewCertDate(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-800 border border-slate-700 text-white"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddCert(false)}
                  className="px-2.5 py-1 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium"
                >
                  Save Certificate
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xs font-semibold text-white">{cert.name}</h3>
                  <p className="text-[10px] text-slate-400">
                    {cert.provider} • {cert.completionDate}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveCert(cert.id)}
                  className="text-slate-500 hover:text-red-400 p-1 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveProfile}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile &amp; Update Analytics</span>
          </button>
        </div>
      </div>

      <MaterialBottomNav />
    </div>
  );
};
