import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiPlus, HiPencil, HiTrash, HiCheck, HiMail, HiEye,
  HiChevronRight, HiCollection, HiBookOpen, HiAcademicCap,
  HiBriefcase, HiFolderOpen, HiShieldCheck, HiOutlineEyeOff, HiLockClosed
} from 'react-icons/hi';
import { FaTrophy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import * as api from '../services/api';

const TABS = [
  { id: 'projects', label: 'Projects', icon: <HiFolderOpen /> },
  { id: 'blogs', label: 'Blogs', icon: <HiBookOpen /> },
  { id: 'skills', label: 'Skills', icon: <HiCollection /> },
  { id: 'experiences', label: 'Experience', icon: <HiBriefcase /> },
  { id: 'certifications', label: 'Certifications', icon: <HiAcademicCap /> },
  { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
  { id: 'messages', label: 'Messages', icon: <HiMail /> }
];

export default function AdminDashboardPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data lists
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modals & Forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formFields, setFormFields] = useState({});

  // Message read dialog
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Check login on load
  useEffect(() => {
    const saved = localStorage.getItem('admin_password');
    if (saved) {
      setPassword(saved);
      verifyLogin(saved);
    }
  }, []);

  // Fetch tab data on active tab change or authentication
  useEffect(() => {
    if (isAuthenticated) {
      loadTabData();
    }
  }, [activeTab, isAuthenticated]);

  const verifyLogin = async (pass) => {
    try {
      setLoading(true);
      // Attempt to load messages with this password to verify authorization
      localStorage.setItem('admin_password', pass);
      await api.fetchContacts(); // Will throw 401/403 if password invalid
      setIsAuthenticated(true);
      toast.success('Logged in as administrator');
    } catch (err) {
      localStorage.removeItem('admin_password');
      setIsAuthenticated(false);
      toast.error('Authentication failed: Invalid admin password');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!password) return toast.error('Please enter the password');
    verifyLogin(password);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setPassword('');
    toast.success('Logged out successfully');
  };

  const loadTabData = async () => {
    try {
      setLoading(true);
      let data = [];
      switch (activeTab) {
        case 'projects':
          data = await api.fetchProjects();
          break;
        case 'blogs':
          data = await api.fetchBlogs();
          break;
        case 'skills':
          data = await api.fetchSkills();
          break;
        case 'experiences':
          data = await api.fetchExperiences();
          break;
        case 'certifications':
          data = await api.fetchCertifications();
          break;
        case 'achievements':
          data = await api.fetchAchievements();
          break;
        case 'messages':
          data = await api.fetchContacts();
          break;
      }
      setItems(data || []);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to load ${activeTab} data`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Open Form Modal
  const openForm = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormFields({ ...item, skills: Array.isArray(item.skills) ? item.skills.join(', ') : item.skills || '' });
    } else {
      setFormFields(getInitialFields());
    }
    setIsModalOpen(true);
  };

  const getInitialFields = () => {
    switch (activeTab) {
      case 'projects':
        return { title: '', description: '', longDescription: '', image: '', technologies: '', github: '', liveDemo: '', category: 'fullstack', featured: false, duration: '', role: 'Full Stack Developer', status: 'completed', order: 0 };
      case 'blogs':
        return { title: '', excerpt: '', content: '', image: '', tags: '', readTime: '5 min read', slug: '', published: true };
      case 'skills':
        return { name: '', percentage: 80, category: 'frontend', color: '#2563EB', order: 0 };
      case 'experiences':
        return { year: '', title: '', company: '', description: '', skills: '', type: 'work', order: 0 };
      case 'certifications':
        return { title: '', issuer: '', date: '', credential: '', icon: '🌐', color: '#2563EB', order: 0 };
      case 'achievements':
        return { value: 0, suffix: '+', label: '', icon: '🏆', color: '#F59E0B', order: 0 };
      default:
        return {};
    }
  };

  const handleFormFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...formFields };
      
      // Post-process comma separated fields
      if (activeTab === 'projects' && typeof payload.technologies === 'string') {
        payload.technologies = payload.technologies.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (activeTab === 'blogs' && typeof payload.tags === 'string') {
        payload.tags = payload.tags.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (activeTab === 'experiences' && typeof payload.skills === 'string') {
        payload.skills = payload.skills.split(',').map(s => s.trim()).filter(Boolean);
      }

      if (editingItem) {
        // Update
        const id = editingItem._id || editingItem.id;
        switch (activeTab) {
          case 'projects': await api.updateProject(id, payload); break;
          case 'blogs': await api.updateBlog(id, payload); break;
          case 'skills': await api.updateSkill(id, payload); break;
          case 'experiences': await api.updateExperience(id, payload); break;
          case 'certifications': await api.updateCertification(id, payload); break;
          case 'achievements': await api.updateAchievement(id, payload); break;
        }
        toast.success('Updated successfully');
      } else {
        // Create
        switch (activeTab) {
          case 'projects': await api.createProject(payload); break;
          case 'blogs': await api.createBlog(payload); break;
          case 'skills': await api.createSkill(payload); break;
          case 'experiences': await api.createExperience(payload); break;
          case 'certifications': await api.createCertification(payload); break;
          case 'achievements': await api.createAchievement(payload); break;
        }
        toast.success('Created successfully');
      }
      setIsModalOpen(false);
      loadTabData();
    } catch (err) {
      console.error(err);
      toast.error('Operation failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item) => {
    const id = item._id || item.id;
    if (!window.confirm(`Are you sure you want to delete "${item.title || item.name || item.label}"?`)) return;
    try {
      setLoading(true);
      switch (activeTab) {
        case 'projects': await api.deleteProject(id); break;
        case 'blogs': await api.deleteBlog(id); break;
        case 'skills': await api.deleteSkill(id); break;
        case 'experiences': await api.deleteExperience(id); break;
        case 'certifications': await api.deleteCertification(id); break;
        case 'achievements': await api.deleteAchievement(id); break;
        case 'messages': await api.deleteContact(id); break;
      }
      toast.success('Deleted successfully');
      loadTabData();
    } catch (err) {
      console.error(err);
      toast.error('Deletion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (msg) => {
    try {
      await api.toggleContactRead(msg._id || msg.id);
      loadTabData();
      if (selectedMessage) {
        setSelectedMessage(prev => ({ ...prev, read: !prev.read }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Login Prompter JSX
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center relative px-4">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2563EB, #7C3AED, transparent)' }} />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card max-w-md w-full p-8 rounded-3xl relative z-10 border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary text-3xl mx-auto mb-4 border border-primary/30">
              <HiLockClosed />
            </div>
            <h2 className="text-2xl font-display font-black text-white">Admin Dashboard</h2>
            <p className="text-slate-400 text-sm mt-2">Enter your authentication password to manage database records.</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider block mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input text-center"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center text-xl border border-green-500/30">
            <HiShieldCheck />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Manage all portfolio entries in the database</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-outline border-red-500/30 hover:border-red-500 hover:bg-red-500/10 text-red-400 text-sm py-2 px-4">
          Logout
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Side — Tabs */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-white border border-primary/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
              <HiChevronRight className={`ml-auto transition-transform ${activeTab === tab.id ? 'translate-x-1' : ''}`} />
            </button>
          ))}
        </div>

        {/* Right Side — Tab Content */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/5 relative min-h-[400px]">
            {/* Header row of tab */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-display font-bold text-white capitalize">{activeTab} List</h2>
              {activeTab !== 'messages' && (
                <button onClick={() => openForm(null)} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                  <HiPlus /> Add New
                </button>
              )}
            </div>

            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-dark/20 backdrop-blur-[2px] rounded-3xl z-10">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : null}

            {/* List entries */}
            <div className="overflow-x-auto">
              {items.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <div className="text-4xl mb-3">📁</div>
                  <p>No records found in the database.</p>
                  {activeTab !== 'messages' && (
                    <button onClick={() => openForm(null)} className="mt-4 text-primary hover:underline text-xs">
                      Create your first item
                    </button>
                  )}
                </div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400 font-semibold">
                      <th className="pb-3">Title / Info</th>
                      <th className="pb-3">Category/Date</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item, idx) => {
                      const id = item._id || item.id;
                      let title = item.title || item.name || item.label || 'No Name';
                      let subtitle = item.category || item.issuer || item.company || (item.value !== undefined ? `${item.value}${item.suffix}` : '');
                      let details = item.excerpt || item.description || item.subject || '';
                      
                      if (activeTab === 'messages') {
                        title = item.name;
                        subtitle = item.email;
                        details = item.subject;
                      }

                      return (
                        <tr key={id || idx} className="hover:bg-white/2 block sm:table-row py-3 sm:py-0 border-b border-white/5 sm:border-0">
                          <td className="py-4 pr-4 block sm:table-cell">
                            <div className="font-bold text-white flex items-center gap-2">
                              {activeTab === 'messages' && !item.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-500" title="New message" />
                              )}
                              {title}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 max-w-[200px] sm:max-w-md truncate">{details}</div>
                          </td>
                          <td className="py-4 pr-4 block sm:table-cell">
                            <span className="text-xs px-2.5 py-1 rounded-lg font-medium"
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                              {subtitle}
                            </span>
                            {activeTab === 'messages' && (
                              <div className="text-[10px] text-slate-500 mt-1.5">{new Date(item.createdAt).toLocaleString()}</div>
                            )}
                          </td>
                          <td className="py-4 block sm:table-cell text-right">
                            <div className="flex gap-2 justify-end">
                              {activeTab === 'messages' ? (
                                <>
                                  <button onClick={() => setSelectedMessage(item)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all duration-200">
                                    <HiEye />
                                  </button>
                                  <button onClick={() => handleMarkAsRead(item)} className={`w-8 h-8 rounded-lg ${item.read ? 'bg-slate-500/10 text-slate-400' : 'bg-green-500/10 text-green-400'} flex items-center justify-center border border-white/5 hover:bg-green-500 hover:text-white transition-all duration-200`} title="Toggle Read">
                                    <HiCheck />
                                  </button>
                                </>
                              ) : (
                                <button onClick={() => openForm(item)} className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all duration-200">
                                  <HiPencil />
                                </button>
                              )}
                              <button onClick={() => handleDelete(item)} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-200">
                                <HiTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CRUD Form Dialog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl relative z-10 border border-white/10 overflow-y-auto max-h-[85vh]">
              <h2 className="text-xl font-display font-bold text-white mb-6 border-b border-white/5 pb-3">
                {editingItem ? 'Edit' : 'Create'} {activeTab.slice(0, -1)} Entry
              </h2>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Form fields render dynamically based on active tab */}
                {activeTab === 'projects' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Title</label>
                        <input required name="title" value={formFields.title || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Category</label>
                        <select name="category" value={formFields.category || 'fullstack'} onChange={handleFormFieldChange} className="form-input">
                          <option value="fullstack">Full Stack</option>
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="ai">AI/ML</option>
                          <option value="mobile">Mobile</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="admin-label">Role</label>
                        <input name="role" value={formFields.role || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Duration</label>
                        <input name="duration" value={formFields.duration || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Display Order</label>
                        <input type="number" name="order" value={formFields.order || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Short Description</label>
                      <textarea required name="description" value={formFields.description || ''} onChange={handleFormFieldChange} className="form-input h-20" />
                    </div>
                    <div>
                      <label className="admin-label">Long Case Study Description (HTML/Markdown)</label>
                      <textarea name="longDescription" value={formFields.longDescription || ''} onChange={handleFormFieldChange} className="form-input h-32" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Image URL</label>
                        <input name="image" value={formFields.image || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Technologies (comma separated)</label>
                        <input name="technologies" value={formFields.technologies || ''} onChange={handleFormFieldChange} className="form-input" placeholder="React, Node.js, Express" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">GitHub Link</label>
                        <input name="github" value={formFields.github || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Live Link</label>
                        <input name="liveDemo" value={formFields.liveDemo || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 py-2">
                      <input type="checkbox" name="featured" id="featured" checked={formFields.featured || false} onChange={handleFormFieldChange} className="w-4 h-4 rounded accent-primary bg-slate-900 border-white/10" />
                      <label htmlFor="featured" className="text-white text-sm font-semibold select-none cursor-pointer">⭐ Feature this project on Home page</label>
                    </div>
                  </>
                )}

                {activeTab === 'blogs' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Title</label>
                        <input required name="title" value={formFields.title || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">URL Slug (leave blank to auto-generate)</label>
                        <input name="slug" value={formFields.slug || ''} onChange={handleFormFieldChange} className="form-input" placeholder="getting-started-mern" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Read Time</label>
                        <input name="readTime" value={formFields.readTime || '5 min read'} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Tags (comma separated)</label>
                        <input name="tags" value={formFields.tags || ''} onChange={handleFormFieldChange} className="form-input" placeholder="React, JavaScript" />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Excerpt / Short Summary</label>
                      <textarea required name="excerpt" value={formFields.excerpt || ''} onChange={handleFormFieldChange} className="form-input h-20" />
                    </div>
                    <div>
                      <label className="admin-label">Content (HTML format)</label>
                      <textarea required name="content" value={formFields.content || ''} onChange={handleFormFieldChange} className="form-input h-48 font-mono text-xs" />
                    </div>
                    <div>
                      <label className="admin-label">Banner Image URL</label>
                      <input name="image" value={formFields.image || ''} onChange={handleFormFieldChange} className="form-input" />
                    </div>
                  </>
                )}

                {activeTab === 'skills' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Skill Name</label>
                        <input required name="name" value={formFields.name || ''} onChange={handleFormFieldChange} className="form-input" placeholder="Node.js" />
                      </div>
                      <div>
                        <label className="admin-label">Proficiency Percentage (0 - 100)</label>
                        <input type="number" required min="0" max="100" name="percentage" value={formFields.percentage || 80} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="admin-label">Category</label>
                        <select name="category" value={formFields.category || 'frontend'} onChange={handleFormFieldChange} className="form-input">
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="database">Database</option>
                          <option value="tools">Tools & Others</option>
                        </select>
                      </div>
                      <div>
                        <label className="admin-label">Theme Color (Hex)</label>
                        <input name="color" value={formFields.color || '#2563EB'} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Order</label>
                        <input type="number" name="order" value={formFields.order || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'experiences' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Year / Duration String</label>
                        <input required name="year" value={formFields.year || ''} onChange={handleFormFieldChange} className="form-input" placeholder="2024 - 2025" />
                      </div>
                      <div>
                        <label className="admin-label">Type</label>
                        <select name="type" value={formFields.type || 'work'} onChange={handleFormFieldChange} className="form-input">
                          <option value="work">Work Experience</option>
                          <option value="project">Key Project</option>
                          <option value="learning">Self Learning</option>
                          <option value="current">Current Engagement</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="admin-label">Role Title</label>
                        <input required name="title" value={formFields.title || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Company / Institution</label>
                        <input required name="company" value={formFields.company || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Order</label>
                        <input type="number" name="order" value={formFields.order || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Details / Description</label>
                      <textarea required name="description" value={formFields.description || ''} onChange={handleFormFieldChange} className="form-input h-24" />
                    </div>
                    <div>
                      <label className="admin-label">Skills Utilized (comma separated)</label>
                      <input name="skills" value={formFields.skills || ''} onChange={handleFormFieldChange} className="form-input" placeholder="React, Express, MongoDB" />
                    </div>
                  </>
                )}

                {activeTab === 'certifications' && (
                  <>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="admin-label">Title</label>
                        <input required name="title" value={formFields.title || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Issuer</label>
                        <input required name="issuer" value={formFields.issuer || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-4 gap-4">
                      <div>
                        <label className="admin-label">Date</label>
                        <input name="date" value={formFields.date || ''} onChange={handleFormFieldChange} className="form-input" placeholder="Jan 2024" />
                      </div>
                      <div>
                        <label className="admin-label">Badge Icon (Emoji)</label>
                        <input name="icon" value={formFields.icon || '🌐'} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Theme Color</label>
                        <input name="color" value={formFields.color || '#2563EB'} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Order</label>
                        <input type="number" name="order" value={formFields.order || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Verification URL / Credential Link</label>
                      <input name="credential" value={formFields.credential || ''} onChange={handleFormFieldChange} className="form-input" />
                    </div>
                  </>
                )}

                {activeTab === 'achievements' && (
                  <>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="admin-label">Number Value</label>
                        <input type="number" required name="value" value={formFields.value || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Suffix (e.g. +, %)</label>
                        <input name="suffix" value={formFields.suffix || ''} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                      <div>
                        <label className="admin-label">Display Order</label>
                        <input type="number" name="order" value={formFields.order || 0} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="admin-label">Label Description</label>
                        <input required name="label" value={formFields.label || ''} onChange={handleFormFieldChange} className="form-input" placeholder="Projects Completed" />
                      </div>
                      <div>
                        <label className="admin-label">Trophy Icon (Emoji)</label>
                        <input name="icon" value={formFields.icon || '🏆'} onChange={handleFormFieldChange} className="form-input" />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">Theme Color</label>
                      <input name="color" value={formFields.color || '#F59E0B'} onChange={handleFormFieldChange} className="form-input" />
                    </div>
                  </>
                )}

                {/* Form buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-white/5">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-outline text-slate-300 border-white/10 text-xs py-2 px-4">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="btn-primary text-xs py-2 px-4">
                    {loading ? 'Saving...' : 'Save Entry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Message Reader Dialog Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMessage(null)} className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} className="glass-card max-w-lg w-full p-6 sm:p-8 rounded-3xl relative z-10 border border-white/10 overflow-hidden shadow-2xl">
              <h2 className="text-lg font-display font-bold text-white mb-4 border-b border-white/5 pb-3">
                Message from {selectedMessage.name}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5">Email</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline font-semibold block">{selectedMessage.email}</a>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5">IP Address</span>
                    <span className="text-white block font-mono">{selectedMessage.ip || 'unknown'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5">Date Received</span>
                    <span className="text-white block">{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block mb-0.5">Status</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedMessage.read ? 'bg-slate-500/20 text-slate-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {selectedMessage.read ? 'Read' : 'New/Unread'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <span className="text-slate-500 text-xs uppercase block mb-1">Subject</span>
                  <div className="text-white font-bold">{selectedMessage.subject}</div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5">
                  <span className="text-slate-500 text-xs uppercase block mb-2">Message Body</span>
                  <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleMarkAsRead(selectedMessage)}
                  className="btn-outline text-xs py-2 px-4 text-slate-300 border-white/10 hover:bg-white/5"
                >
                  Mark as {selectedMessage.read ? 'Unread' : 'Read'}
                </button>
                <button
                  onClick={() => { setSelectedMessage(null); handleDelete(selectedMessage); }}
                  className="btn-primary bg-red-500 hover:bg-red-600 text-xs py-2 px-4"
                >
                  Delete Message
                </button>
                <button onClick={() => setSelectedMessage(null)} className="btn-outline text-xs py-2 px-4 border-white/5 text-slate-500 hover:text-white">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
