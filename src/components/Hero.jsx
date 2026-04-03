import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add('loaded'), 100);
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-grid" />

      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge fade-up">
            <span className="badge badge-green">
              <span className="pulse-dot" />
              Available for Freelance
            </span>
          </div>

          <h1 className="hero-title fade-up delay-1">
            Crafting Brands<br />
            <span className="hero-title-gold">That Stand Out.</span>
          </h1>

          <p className="hero-sub fade-up delay-2">
            I design modern brand identities and visuals that help businesses
            stand out and communicate clearly.
          </p>

          <div className="hero-meta fade-up delay-3">
            <div className="hero-meta-item">
              <span className="meta-num">50+</span>
              <span className="meta-label">Projects Done</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="meta-num">30+</span>
              <span className="meta-label">Happy Clients</span>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span className="meta-num">1+</span>
              <span className="meta-label">Years Exp.</span>
            </div>
          </div>

          <div className="hero-ctas fade-up delay-4">
            <button className="btn btn-primary" onClick={() => scrollTo('#portfolio')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              View My Work
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
              Let's Work Together
            </button>
          </div>

          <div className="hero-tools fade-up delay-5">
            <span className="tools-label">Tools I use:</span>
            <div className="tools-list">
              {['Photoshop', 'Illustrator', 'Canva'].map(t => (
                <span key={t} className="tool-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual fade-up delay-2">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-back" />
            <div className="hero-card hero-card-mid" />
            <div className="hero-card hero-card-front">
              <div className="hero-card-content">
                <div className="card-avatar">ZM</div>
                <div className="card-info">
                  <h3 className="card-name">Zeenat Masood</h3>
                  <p className="card-role">Logo & Brand Designer</p>
                  <div className="card-stars">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                </div>
                <div className="card-badge-row">
                  <span className="badge badge-gold">✦ Brand Expert</span>
                </div>
                <div className="card-services-preview">
                  {['Logo Design', 'Brand Identity', 'Social Media'].map(s => (
                    <span key={s} className="service-chip">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
