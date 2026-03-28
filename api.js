/**
 * API Client
 * Central axios instance with interceptors for auth and error handling
 */

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("arcstudio_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally — redirect to login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      const isAdminRoute = window.location.pathname.startsWith("/admin");
      if (isAdminRoute && window.location.pathname !== "/admin/login") {
        localStorage.removeItem("arcstudio_token");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(err);
  }
);

// ─── Public endpoints ─────────────────────────────────────────────

export const publicApi = {
  getSettings: () => api.get("/settings"),
  getProjects: (params) => api.get("/projects", { params }),
  getProject: (slug) => api.get(`/projects/${slug}`),
  getTestimonials: (params) => api.get("/testimonials", { params }),
  getServices: () => api.get("/services"),
  getTeam: () => api.get("/team"),
  getGallery: (params) => api.get("/gallery", { params }),
  getGalleryCategories: () => api.get("/gallery/categories"),
  submitContact: (data) => api.post("/contact", data),
  trackEvent: (data) => api.post("/analytics/track", data),
};

// ─── Admin endpoints ──────────────────────────────────────────────

export const adminApi = {
  // Auth
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
  changePassword: (data) => api.put("/auth/password", data),

  // Settings
  getSettings: () => api.get("/settings"),
  updateSettings: (data) => api.put("/settings", data),
  updateTheme: (data) => api.put("/settings/theme", data),
  updateHero: (data) => api.put("/settings/hero", data),
  updateContact: (data) => api.put("/settings/contact", data),
  uploadLogo: (form) => api.post("/settings/logo", form, { headers: { "Content-Type": "multipart/form-data" } }),

  // Projects
  getProjects: () => api.get("/projects/admin"),
  createProject: (data) => api.post("/projects", data),
  updateProject: (id, data) => api.put(`/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  uploadProjectImages: (id, form) => api.post(`/projects/${id}/images`, form, { headers: { "Content-Type": "multipart/form-data" } }),
  reorderProjects: (items) => api.patch("/projects/reorder", { items }),

  // Testimonials
  getTestimonials: () => api.get("/testimonials/admin"),
  createTestimonial: (data) => api.post("/testimonials", data),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}`),
  uploadTestimonialImage: (id, form) => api.post(`/testimonials/${id}/image`, form, { headers: { "Content-Type": "multipart/form-data" } }),

  // Services
  getServices: () => api.get("/services/admin"),
  createService: (data) => api.post("/services", data),
  updateService: (id, data) => api.put(`/services/${id}`, data),
  deleteService: (id) => api.delete(`/services/${id}`),
  reorderServices: (items) => api.patch("/services/reorder", { items }),

  // Team
  getTeam: () => api.get("/team/admin"),
  createMember: (data) => api.post("/team", data),
  updateMember: (id, data) => api.put(`/team/${id}`, data),
  deleteMember: (id) => api.delete(`/team/${id}`),
  uploadMemberImage: (id, form) => api.post(`/team/${id}/image`, form, { headers: { "Content-Type": "multipart/form-data" } }),

  // Gallery
  getGallery: () => api.get("/gallery/admin"),
  uploadGalleryImages: (form) => api.post("/gallery", form, { headers: { "Content-Type": "multipart/form-data" } }),
  updateGalleryImage: (id, data) => api.put(`/gallery/${id}`, data),
  deleteGalleryImage: (id) => api.delete(`/gallery/${id}`),

  // Media
  uploadMedia: (form) => api.post("/media/upload", form, { headers: { "Content-Type": "multipart/form-data" } }),
  deleteMedia: (publicId) => api.delete(`/media/${encodeURIComponent(publicId)}`),
  listMedia: (folder) => api.get("/media/list", { params: { folder } }),

  // Contact
  getMessages: (params) => api.get("/contact", { params }),
  updateMessageStatus: (id, status) => api.patch(`/contact/${id}/status`, { status }),
  deleteMessage: (id) => api.delete(`/contact/${id}`),

  // Analytics
  getSummary: () => api.get("/analytics/summary"),
};

export default api;
