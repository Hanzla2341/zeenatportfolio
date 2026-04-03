import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://zeenobackend.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', service: '', message: '' });
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try WhatsApp instead.');
    }
  };

  const whatsappMsg = encodeURIComponent("Hi Zeenat! I'd like to discuss a design project with you.");

  return (
    <section id="contact" className="section contact-section" ref={sectionRef}>
      <div className="contact-bg-orb" />
      <div className="container">
        <div className="section-header fade-in">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="gold-line" />
          <p className="section-sub">Have a project in mind? Let's create something amazing together.</p>
        </div>

        <div className="contact-grid">
          {/* Left Info */}
          <div className="contact-info fade-in">
            <div className="contact-avail">
              <span className="badge badge-green">
                <span className="pulse-dot-contact" />
                Available for Freelance Work
              </span>
            </div>

            <h3 className="contact-info-heading">Get in Touch</h3>
            <p className="contact-info-text">
              Ready to elevate your brand? I typically respond within 24 hours. Feel free to reach out via WhatsApp for a faster reply.
            </p>

            <div className="contact-channels">
              <a
                href={`https://wa.me/923000000000?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-card channel-whatsapp"
              >
                <div className="channel-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div className="channel-text">
                  <span className="channel-label">WhatsApp</span>
                  <span className="channel-val">Chat Me Directly</span>
                </div>
                <span className="channel-arrow">→</span>
              </a>

              <a href="mailto:zeenat@email.com" className="channel-card channel-email">
                <div className="channel-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div className="channel-text">
                  <span className="channel-label">Email</span>
                  <span className="channel-val">zeenat@email.com</span>
                </div>
                <span className="channel-arrow">→</span>
              </a>
            </div>

            <div className="contact-note">
              <span className="note-icon">⚡</span>
              <span>Fast turnaround · Revisions included · Professional files delivered</span>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form-wrap fade-in" style={{ transitionDelay: '0.15s' }}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name" name="name" type="text"
                    className="form-input" placeholder="Your name"
                    value={form.name} onChange={handleChange} required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email"
                    className="form-input" placeholder="your@email.com"
                    value={form.email} onChange={handleChange} required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="service">Service Needed</label>
                <select id="service" name="service" className="form-select" value={form.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Brand Identity Kit">Brand Identity Kit</option>
                  <option value="Social Media Design">Social Media Design</option>
                  <option value="Banner Design">Banner Design</option>
                  <option value="Business Card">Business Card</option>
                  <option value="Custom Graphic">Custom Graphic</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message" name="message"
                  className="form-textarea" placeholder="Tell me about your project..."
                  value={form.message} onChange={handleChange} required
                />
              </div>

              {status === 'success' && (
                <div className="form-feedback success">
                  ✓ Message sent! I'll get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="form-feedback error">
                  ✕ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><span className="spinner" /> Sending...</>
                ) : (
                  <>Send Message →</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
