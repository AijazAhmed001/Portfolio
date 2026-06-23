import axios from 'axios';
import * as staticData from '../data/portfolioData';

// Determine API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create AXIOS instance with timeout
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Request interceptor to attach bearer token
apiClient.interceptors.request.use(
  (config) => {
    const password = localStorage.getItem('admin_password');
    if (password) {
      config.headers.Authorization = `Bearer ${password}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Contact Messages ────────────────────────────────────────────────────────
export const submitContact = async (messageData) => {
  try {
    const res = await apiClient.post('/contact', messageData);
    return res.data;
  } catch (error) {
    console.error('Contact submission failed:', error);
    // If backend is down, simulate success in frontend for user feedback or reject
    throw error.response?.data || new Error('Failed to connect to contact service.');
  }
};

export const fetchContacts = async () => {
  const res = await apiClient.get('/contact');
  return res.data.data;
};

export const deleteContact = async (id) => {
  const res = await apiClient.delete(`/contact/${id}`);
  return res.data;
};

export const toggleContactRead = async (id) => {
  const res = await apiClient.put(`/contact/${id}/read`);
  return res.data;
};

// ─── Projects ────────────────────────────────────────────────────────────────
export const fetchProjects = async () => {
  try {
    const res = await apiClient.get('/projects');
    if (res.data?.success && res.data?.data?.length > 0) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Projects API unavailable. Using offline static data.', error.message);
  }
  return staticData.projects;
};

export const createProject = async (projectData) => {
  const res = await apiClient.post('/projects', projectData);
  return res.data.data;
};

export const updateProject = async (id, projectData) => {
  const res = await apiClient.put(`/projects/${id}`, projectData);
  return res.data.data;
};

export const deleteProject = async (id) => {
  const res = await apiClient.delete(`/projects/${id}`);
  return res.data;
};

// ─── Blogs ───────────────────────────────────────────────────────────────────
export const fetchBlogs = async () => {
  try {
    const res = await apiClient.get('/blogs');
    if (res.data?.success && res.data?.data?.length > 0) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Blogs API unavailable. Using offline static data.', error.message);
  }
  return staticData.blogs;
};

export const fetchBlogBySlug = async (slug) => {
  try {
    const res = await apiClient.get(`/blogs/${slug}`);
    if (res.data?.success) {
      return res.data.data;
    }
  } catch (error) {
    console.warn(`Blog slug '${slug}' API unavailable. Searching offline static data.`, error.message);
  }
  const localBlog = staticData.blogs.find(b => b.slug === slug);
  if (localBlog) return { ...localBlog, content: localBlog.content || `<p>${localBlog.excerpt}</p>` };
  throw new Error('Blog post not found.');
};

export const createBlog = async (blogData) => {
  const res = await apiClient.post('/blogs', blogData);
  return res.data.data;
};

export const updateBlog = async (id, blogData) => {
  const res = await apiClient.put(`/blogs/${id}`, blogData);
  return res.data.data;
};

export const deleteBlog = async (id) => {
  const res = await apiClient.delete(`/blogs/${id}`);
  return res.data;
};

// ─── Skills ──────────────────────────────────────────────────────────────────
export const fetchSkills = async (grouped = false) => {
  try {
    const res = await apiClient.get(`/skills?grouped=${grouped}`);
    if (res.data?.success && (res.data?.data?.length > 0 || Object.keys(res.data?.data).length > 0)) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Skills API unavailable. Using offline static data.', error.message);
  }
  
  if (grouped) {
    return staticData.skills;
  }
  // Flatten static skills
  return Object.keys(staticData.skills).reduce((acc, cat) => {
    return acc.concat(staticData.skills[cat].map(s => ({ ...s, category: cat })));
  }, []);
};

export const createSkill = async (skillData) => {
  const res = await apiClient.post('/skills', skillData);
  return res.data.data;
};

export const updateSkill = async (id, skillData) => {
  const res = await apiClient.put(`/skills/${id}`, skillData);
  return res.data.data;
};

export const deleteSkill = async (id) => {
  const res = await apiClient.delete(`/skills/${id}`);
  return res.data;
};

// ─── Experiences ─────────────────────────────────────────────────────────────
export const fetchExperiences = async () => {
  try {
    const res = await apiClient.get('/experiences');
    if (res.data?.success && res.data?.data?.length > 0) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Experiences API unavailable. Using offline static data.', error.message);
  }
  return staticData.experience;
};

export const createExperience = async (expData) => {
  const res = await apiClient.post('/experiences', expData);
  return res.data.data;
};

export const updateExperience = async (id, expData) => {
  const res = await apiClient.put(`/experiences/${id}`, expData);
  return res.data.data;
};

export const deleteExperience = async (id) => {
  const res = await apiClient.delete(`/experiences/${id}`);
  return res.data;
};

// ─── Achievements ────────────────────────────────────────────────────────────
export const fetchAchievements = async () => {
  try {
    const res = await apiClient.get('/achievements');
    if (res.data?.success && res.data?.data?.length > 0) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Achievements API unavailable. Using offline static data.', error.message);
  }
  return staticData.achievements;
};

export const createAchievement = async (achData) => {
  const res = await apiClient.post('/achievements', achData);
  return res.data.data;
};

export const updateAchievement = async (id, achData) => {
  const res = await apiClient.put(`/achievements/${id}`, achData);
  return res.data.data;
};

export const deleteAchievement = async (id) => {
  const res = await apiClient.delete(`/achievements/${id}`);
  return res.data;
};

// ─── Certifications ──────────────────────────────────────────────────────────
export const fetchCertifications = async () => {
  try {
    const res = await apiClient.get('/certifications');
    if (res.data?.success && res.data?.data?.length > 0) {
      return res.data.data;
    }
  } catch (error) {
    console.warn('Certifications API unavailable. Using offline static data.', error.message);
  }
  return staticData.certifications;
};

export const createCertification = async (certData) => {
  const res = await apiClient.post('/certifications', certData);
  return res.data.data;
};

export const updateCertification = async (id, certData) => {
  const res = await apiClient.put(`/certifications/${id}`, certData);
  return res.data.data;
};

export const deleteCertification = async (id) => {
  const res = await apiClient.delete(`/certifications/${id}`);
  return res.data;
};
