import React, { useEffect, useRef } from 'react';
import './Skills.css';

const skillGroups = [
  {
    label: 'Core Design Skills',
    color: '#C9A84C',
    skills: [
      { name: 'Logo Design', level: 92 },
      { name: 'Brand Identity', level: 88 },
      { name: 'Social Media Design', level: 90 },
    ],
  },
  {
    label: 'Design Fundamentals',
    color: '#a78bfa',
    skills: [
      { name: 'Typography', level: 85 },
      { name: 'Color Theory', level: 88 },
      { name: 'Layout & Composition', level: 82 },
    ],
  },
  {
    label: 'Tools & Software',
    color: '#34d399',
    skills: [
      { name: 'Adobe Photoshop', level: 90 },
      { name: 'Adobe Illustrator', level: 85 },
      { name: 'Canva', level: 95 },
    ],
  },
];

const softSkills = [
  'Creative Thinking', 'Attention to Detail', 'Client Communication',
  'Time Management', 'Problem Solving', 'Quick Learner',
];

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Animate bars
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
              bar.style.width = bar.dataset.level + '%';
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Skills</span>
          <h2 className="section-title">Tools of the Trade</h2>
          <div className="gold-line" />
          <p className="section-sub">A breakdown of my design capabilities and the tools I use to bring ideas to life.</p>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group, gi) => (
            <div
              key={group.label}
              className="skill-group fade-in"
              style={{ transitionDelay: `${gi * 0.12}s`, '--grp-color': group.color }}
            >
              <div className="group-header">
                <div className="group-dot" />
                <h3 className="group-label">{group.label}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-meta">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-track">
                      <div
                        className="skill-bar-fill"
                        data-level={skill.level}
                        style={{ width: 0 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Soft Skills */}
        <div className="soft-skills fade-in" style={{ transitionDelay: '0.3s' }}>
          <h3 className="soft-title">Professional Traits</h3>
          <div className="soft-list">
            {softSkills.map(s => (
              <span key={s} className="soft-tag">
                <span className="soft-dot" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
