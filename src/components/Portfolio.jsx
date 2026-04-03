import React, { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

const CATEGORIES = ['All', 'Logo', 'Brand Identity', 'Social Media', 'Banner', 'Business Card'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const sectionRef = useRef(null);

  // Demo projects shown when backend is not connected
  const demoProjects = [
    { _id: '1', title: 'Luxe Brand Identity', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1636633762833-5d1658f1e29b?w=600&q=80', description: 'Full brand identity for a luxury boutique' },
    { _id: '2', title: 'TechStart Logo', category: 'Logo', imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', description: 'Modern minimal logo for a tech startup' },
    { _id: '3', title: 'Café Social Pack', category: 'Social Media', imageUrl: 'https://images.unsplash.com/photo-1611532736573-418856b9da12?w=600&q=80', description: 'Instagram templates for a coffee brand' },
    { _id: '4', title: 'Fashion Banner', category: 'Banner', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Promotional banner for a fashion brand' },
    { _id: '5', title: 'Minimal Business Card', category: 'Business Card', imageUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=600&q=80', description: 'Clean business card design' },
    { _id: '6', title: 'Real Estate Logo', category: 'Logo', imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80', description: 'Professional real estate agency logo' },
    { _id: '7', title: 'Fitness Social Kit', category: 'Social Media', imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&q=80', description: 'Bold social media kit for a fitness brand' },
    { _id: '8', title: 'Restaurant Brand', category: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', description: 'Complete branding for a gourmet restaurant' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data.length > 0 ? data : demoProjects);
        } else {
          setProjects(demoProjects);
        }
      } catch {
        setProjects(demoProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [projects, activeFilter]);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="section portfolio-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">My Best Work</h2>
          <div className="gold-line" />
          <p className="section-sub">A curated selection of projects that showcase my design expertise and creative approach.</p>
        </div>

        {/* Filter tabs */}
        <div className="portfolio-filters fade-in">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="portfolio-loading">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        ) : (
          <div className="portfolio-grid">
            {filtered.map((project, i) => (
              <div
                key={project._id}
                className="portfolio-item fade-in"
                style={{ transitionDelay: `${i * 0.07}s` }}
                onClick={() => setSelected(project)}
              >
                <div className="portfolio-img-wrap">
                  <img src={project.imageUrl} alt={project.title} loading="lazy" />
                  <div className="portfolio-overlay">
                    <div className="overlay-content">
                      <span className="overlay-category">{project.category}</span>
                      <h3 className="overlay-title">{project.title}</h3>
                      {project.description && <p className="overlay-desc">{project.description}</p>}
                      <button className="overlay-btn">View Project →</button>
                    </div>
                  </div>
                </div>
                <div className="portfolio-info">
                  <span className="portfolio-cat-tag">{project.category}</span>
                  <h3 className="portfolio-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="empty-state">
            <span>No projects in this category yet.</span>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <img src={selected.imageUrl} alt={selected.title} className="modal-img" />
            <div className="modal-info">
              <span className="section-label">{selected.category}</span>
              <h3 className="modal-title">{selected.title}</h3>
              {selected.description && <p className="modal-desc">{selected.description}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
