import React, { useState, useEffect } from 'react';
import './Admin.css';

const API = 'https://zeenobackend.vercel.app/api';
const IMAGE_BASE = 'https://zeenobackend.vercel.app';

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [token, setToken] = useState(localStorage.getItem('zm_admin_token') || '');
  const [tab, setTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({ title: '', category: 'Logo', description: '', featured: false, order: 0 });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  // Verify token on mount
  useEffect(() => {
    if (token) {
      fetch(`${API}/admin/verify`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => { if (r.ok) setAuthed(true); else setToken(''); })
        .catch(() => setToken(''));
    }
  }, []);

  useEffect(() => {
    if (authed) {
      fetchProjects();
      fetchContacts();
    }
  }, [authed]);

  const login = async (e) => {
    e.preventDefault();
    setLoginErr('');
    try {
      const res = await fetch(`${API}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('zm_admin_token', data.token);
        setToken(data.token);
        setAuthed(true);
      } else {
        setLoginErr(data.message || 'Invalid password');
      }
    } catch {
      setLoginErr('Server error. Make sure the backend is running.');
    }
  };

  const logout = () => {
    localStorage.removeItem('zm_admin_token');
    setToken(''); setAuthed(false);
  };

  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch(`${API}/projects`);
    if (res.ok) setProjects(await res.json());
    setLoading(false);
  };

  const fetchContacts = async () => {
    const res = await fetch(`${API}/contact`, { headers: authHeaders });
    if (res.ok) setContacts(await res.json());
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return setUploadMsg('Please select an image.');
    setUploading(true); setUploadMsg('');
    const fd = new FormData();
    fd.append('image', uploadFile);
    fd.append('title', uploadForm.title);
    fd.append('category', uploadForm.category);
    fd.append('description', uploadForm.description);
    fd.append('featured', uploadForm.featured);
    fd.append('order', uploadForm.order);
    try {
      const res = await fetch(`${API}/projects`, { method: 'POST', headers: authHeaders, body: fd });
      const data = await res.json();
      if (res.ok) {
        setUploadMsg('✓ Project added successfully!');
        setUploadForm({ title: '', category: 'Logo', description: '', featured: false, order: 0 });
        setUploadFile(null); setUploadPreview('');
        fetchProjects();
      } else {
        setUploadMsg('✕ ' + (data.message || 'Upload failed'));
      }
    } catch {
      setUploadMsg('✕ Server error. Make sure backend is running.');
    }
    setUploading(false);
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: authHeaders });
    fetchProjects();
  };

  const updateContactStatus = async (id, status) => {
    await fetch(`${API}/contact/${id}`, {
      method: 'PATCH',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchContacts();
  };

  if (!authed) {
    return (
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <span className="logo-z">Z</span>
            <span>Admin Panel</span>
          </div>
          <h1 className="admin-login-title">Sign In</h1>
          <p className="admin-login-sub">Enter your admin password to access the dashboard.</p>
          <form onSubmit={login} className="admin-login-form">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password" className="form-input"
                placeholder="Admin password"
                value={password} onChange={e => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {loginErr && <div className="admin-error">{loginErr}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Login →
            </button>
          </form>
          <a href="/" className="admin-back-link">← Back to Portfolio</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrap">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span className="logo-z">Z</span>
          <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <button className={`admin-nav-btn ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
            <span>🖼️</span> Portfolio
          </button>
          <button className={`admin-nav-btn ${tab === 'upload' ? 'active' : ''}`} onClick={() => setTab('upload')}>
            <span>⬆️</span> Upload Project
          </button>
          <button className={`admin-nav-btn ${tab === 'messages' ? 'active' : ''}`} onClick={() => setTab('messages')}>
            <span>✉️</span> Messages
            {contacts.filter(c => c.status === 'new').length > 0 && (
              <span className="nav-badge">{contacts.filter(c => c.status === 'new').length}</span>
            )}
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" className="admin-nav-btn">← View Site</a>
          <button className="admin-nav-btn logout" onClick={logout}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-topbar">
          <h2 className="admin-page-title">
            {tab === 'projects' && 'Portfolio Projects'}
            {tab === 'upload' && 'Upload New Project'}
            {tab === 'messages' && 'Contact Messages'}
          </h2>
        </div>

        {/* UPLOAD TAB */}
        {tab === 'upload' && (
          <div className="admin-content">
            <form onSubmit={handleUpload} className="upload-form">
              {/* Image Drop */}
              <div
                className="upload-drop"
                onClick={() => document.getElementById('img-input').click()}
              >
                {uploadPreview ? (
                  <img src={uploadPreview} alt="Preview" className="upload-preview-img" />
                ) : (
                  <div className="upload-drop-inner">
                    <div className="upload-icon">📁</div>
                    <p>Click to select an image</p>
                    <span>PNG, JPG, WebP up to 10MB</span>
                  </div>
                )}
                <input
                  id="img-input" type="file" accept="image/*"
                  onChange={handleFileChange} style={{ display: 'none' }}
                />
              </div>

              <div className="upload-fields">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text" className="form-input" placeholder="Project title"
                      value={uploadForm.title}
                      onChange={e => setUploadForm(p => ({ ...p, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      className="form-select"
                      value={uploadForm.category}
                      onChange={e => setUploadForm(p => ({ ...p, category: e.target.value }))}
                    >
                      {['Logo','Brand Identity','Social Media','Banner','Business Card','Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea" placeholder="Brief project description..."
                    style={{ minHeight: 80 }}
                    value={uploadForm.description}
                    onChange={e => setUploadForm(p => ({ ...p, description: e.target.value }))}
                  />
                </div>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Display Order</label>
                    <input
                      type="number" className="form-input" placeholder="0"
                      value={uploadForm.order}
                      onChange={e => setUploadForm(p => ({ ...p, order: e.target.value }))}
                    />
                  </div>
                  <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                    <label className="admin-check-label">
                      <input
                        type="checkbox"
                        checked={uploadForm.featured}
                        onChange={e => setUploadForm(p => ({ ...p, featured: e.target.checked }))}
                      />
                      <span>Mark as Featured</span>
                    </label>
                  </div>
                </div>

                {uploadMsg && (
                  <div className={`form-feedback ${uploadMsg.startsWith('✓') ? 'success' : 'error'}`}>
                    {uploadMsg}
                  </div>
                )}

                <button
                  type="submit" className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  disabled={uploading}
                >
                  {uploading ? '⬆️ Uploading...' : '⬆️ Upload Project'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROJECTS TAB */}
        {tab === 'projects' && (
          <div className="admin-content">
            <div className="admin-stats-row">
              <div className="admin-stat"><span className="stat-num">{projects.length}</span><span className="stat-label">Total Projects</span></div>
              <div className="admin-stat"><span className="stat-num">{projects.filter(p => p.featured).length}</span><span className="stat-label">Featured</span></div>
              <div className="admin-stat"><span className="stat-num">{[...new Set(projects.map(p => p.category))].length}</span><span className="stat-label">Categories</span></div>
            </div>
            {loading ? (
              <div style={{ color: 'var(--color-gray-300)', padding: 32 }}>Loading...</div>
            ) : (
              <div className="admin-projects-grid">
                {projects.map(p => (
                  <div key={p._id} className="admin-project-card">
                    <div className="admin-project-img">
                      <img src={p.imageUrl.startsWith('http') ? p.imageUrl : `${IMAGE_BASE}${p.imageUrl}`} alt={p.title} />
                      {p.featured && <span className="featured-badge">★ Featured</span>}
                    </div>
                    <div className="admin-project-info">
                      <span className="admin-project-cat">{p.category}</span>
                      <h4 className="admin-project-title">{p.title}</h4>
                      {p.description && <p className="admin-project-desc">{p.description}</p>}
                    </div>
                    <button className="admin-delete-btn" onClick={() => deleteProject(p._id)}>
                      🗑️ Delete
                    </button>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="empty-state">No projects yet. Upload your first project!</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* MESSAGES TAB */}
        {tab === 'messages' && (
          <div className="admin-content">
            <div className="messages-list">
              {contacts.length === 0 && <div className="empty-state">No messages yet.</div>}
              {contacts.map(c => (
                <div key={c._id} className={`message-card ${c.status}`}>
                  <div className="message-header">
                    <div className="message-sender">
                      <span className="message-name">{c.name}</span>
                      <span className="message-email">{c.email}</span>
                    </div>
                    <div className="message-meta">
                      {c.service && <span className="message-service">{c.service}</span>}
                      <span className={`msg-status-badge ${c.status}`}>{c.status}</span>
                      <span className="message-date">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="message-body">{c.message}</p>
                  <div className="message-actions">
                    {['new','read','replied'].map(s => (
                      <button
                        key={s}
                        className={`msg-action-btn ${c.status === s ? 'active' : ''}`}
                        onClick={() => updateContactStatus(c._id, s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
