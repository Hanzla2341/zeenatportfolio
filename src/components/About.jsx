import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: '2024–Present',
      title: 'Freelance Designer',
      org: 'Independent',
      desc: 'Offering logo design, brand identity, and social media design services to clients across various industries.',
      type: 'work',
    },
    {
      year: '2024',
      title: 'Design Internship',
      org: 'Technijin Software Company',
      desc: 'Completed a 6-month internship specializing in graphic design and visual communication for digital products.',
      type: 'work',
    },
    {
      year: '2021–Present',
      title: 'BSIT — 8th Semester',
      org: 'University',
      desc: 'Information Technology degree with a focus on creative digital solutions and design systems.',
      type: 'edu',
    },
  ];

  return (
    <section id="about" className="section about-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">About Me</span>
          <h2 className="section-title">The Designer Behind the Work</h2>
          <div className="gold-line" />
        </div>

        <div className="about-grid">
          {/* Left — Bio */}
          <div className="about-bio fade-in">
            <div className="about-avatar-wrap">
              <div className="about-avatar">ZM</div>
              <div className="about-avatar-ring" />
            </div>
            <div className="about-text">
              <h3 className="about-name">Zeenat Masood</h3>
              <p className="about-role">Logo & Graphic Designer</p>
              <div className="about-divider" />
              <p className="about-bio-text">
                I'm a passionate graphic designer focused on creating clean, modern, and impactful visual identities. My work bridges creativity and strategy — every design I create is built to communicate clearly and leave a lasting impression.
              </p>
              <p className="about-bio-text">
                Currently in my final year of BSIT and actively available for freelance projects. I bring professional-grade design work at competitive rates.
              </p>
              <div className="about-highlights">
                {[
                  { icon: '🎨', label: 'Design Focus', val: 'Brand Identity & Logos' },
                  { icon: '📍', label: 'Location', val: 'Pakistan' },
                  { icon: '⚡', label: 'Response', val: 'Within 24 hours' },
                ].map(item => (
                  <div key={item.label} className="highlight-item">
                    <span className="highlight-icon">{item.icon}</span>
                    <div>
                      <div className="highlight-label">{item.label}</div>
                      <div className="highlight-val">{item.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <span className="badge badge-green about-avail">
                <span className="pulse-dot" style={{background:'#4ade80',width:8,height:8,borderRadius:'50%',display:'inline-block',animation:'pulse 2s infinite'}} />
                Available for Freelance Work
              </span>
            </div>
          </div>

          {/* Right — Timeline */}
          <div className="about-timeline fade-in" style={{ transitionDelay: '0.15s' }}>
            <h3 className="timeline-heading">Experience & Education</h3>
            <div className="timeline-list">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" data-type={item.type} />
                  <div className="timeline-content">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div className="timeline-org">{item.org}</div>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
