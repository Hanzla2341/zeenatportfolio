import React, { useEffect, useRef } from 'react';
import './Services.css';

const services = [
  {
    icon: '✦',
    title: 'Logo Design',
    desc: 'Custom, memorable logos that capture your brand essence and work across all platforms.',
    deliverables: ['PNG / JPG files', 'Vector (AI/EPS)', 'High resolution', 'Multiple variations'],
    color: '#C9A84C',
  },
  {
    icon: '◈',
    title: 'Brand Identity Kit',
    desc: 'Complete brand systems including logo, color palette, typography, and usage guidelines.',
    deliverables: ['Full Logo Suite', 'Color System', 'Typography Guide', 'Brand Guideline PDF'],
    color: '#a78bfa',
  },
  {
    icon: '◉',
    title: 'Social Media Design',
    desc: 'Eye-catching posts, stories, and highlight covers that grow your social presence.',
    deliverables: ['Post templates', 'Story templates', 'Highlight covers', 'Editable Canva files'],
    color: '#f472b6',
  },
  {
    icon: '▣',
    title: 'Banner Design',
    desc: 'Stunning promotional banners for digital and print, optimized for conversions.',
    deliverables: ['Web banners', 'Print-ready files', 'Multiple sizes', 'Source files'],
    color: '#34d399',
  },
  {
    icon: '◻',
    title: 'Business Card',
    desc: 'Professional business cards that make lasting first impressions.',
    deliverables: ['Front & back design', 'Print-ready PDF', 'High resolution', 'Editable files'],
    color: '#60a5fa',
  },
  {
    icon: '◎',
    title: 'Custom Graphic',
    desc: 'Any custom design need — illustrations, icons, marketing materials, and more.',
    deliverables: ['Tailored to your need', 'PNG / JPG / PDF', 'Source files', 'Revisions included'],
    color: '#fb923c',
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section services-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Services</span>
          <h2 className="section-title">What I Offer</h2>
          <div className="gold-line" />
          <p className="section-sub">Professional design services tailored for businesses, startups, and personal brands.</p>
        </div>

        <div className="services-grid">
          {services.map((srv, i) => (
            <div
              key={srv.title}
              className="service-card fade-in"
              style={{ transitionDelay: `${i * 0.08}s`, '--srv-color': srv.color }}
            >
              <div className="service-icon-wrap">
                <span className="service-icon">{srv.icon}</span>
              </div>
              <h3 className="service-title">{srv.title}</h3>
              <p className="service-desc">{srv.desc}</p>
              <div className="service-divider" />
              <div className="service-deliverables">
                <span className="deliverables-label">Deliverables</span>
                <ul className="deliverables-list">
                  {srv.deliverables.map(d => (
                    <li key={d} className="deliverable-item">
                      <span className="del-check">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="services-cta fade-in">
          <p className="cta-text">Need something custom? Let's talk about your project.</p>
          <button className="btn btn-primary" onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get a Free Quote →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
