/**
 * api.js — Practical 6 & 7: Central API configuration
 *
 * Single source of truth for the Express backend URL.
 * After Practical 7, every task request includes the JWT from
 * localStorage in the Authorization header.
 */

const BASE_URL = 'http://localhost:5000';

// ── Token helpers ───────────────────────────────────────────────────────────
export const getToken  = ()          => localStorage.getItem('token');
export const setToken  = (token)     => localStorage.setItem('token', token);
export const clearToken = ()         => localStorage.removeItem('token');

/** Builds headers — includes Bearer token if one is stored */
const authHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

// ── Auth routes (public) ────────────────────────────────────────────────────

/** POST /register */
export const registerUser = (email, password) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json().then((data) => {
    if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
    return data;
  }));

/** POST /login — returns { token } */
export const loginUser = (email, password) =>
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json().then((data) => {
    if (!res.ok) throw new Error(data.error || `Server error ${res.status}`);
    return data; // { token }
  }));

/** GET /me — returns logged-in user info */
export const getMe = () =>
  fetch(`${BASE_URL}/me`, { headers: authHeaders() }).then((res) => {
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return res.json();
  });

// ── Task CRUD helpers (protected) ───────────────────────────────────────────

/** GET /tasks */
export const getTasks = () =>
  fetch(`${BASE_URL}/tasks`, { headers: authHeaders() }).then((res) => {
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return res.json();
  });

/** POST /tasks */
export const createTask = (data) =>
  fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json().then((d) => {
    if (!res.ok) throw new Error(d.error || `Server error ${res.status}`);
    return d;
  }));

/** PUT /tasks/:id */
export const updateTask = (id, data) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  }).then((res) => res.json().then((d) => {
    if (!res.ok) throw new Error(d.error || `Server error ${res.status}`);
    return d;
  }));

/** DELETE /tasks/:id */
export const deleteTask = (id) =>
  fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  }).then((res) => {
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    return res.json();
  });

