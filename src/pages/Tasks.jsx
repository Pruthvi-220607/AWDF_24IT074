import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import { getTasks, createTask, updateTask, deleteTask, clearToken } from '../api';

  /**
   * Tasks Page — Practical 6 & 7: Full-Stack Integration + Auth
   *
   * Practical 7 additions:
   *  • All API calls include Authorization: Bearer <token> header
   *  • 401 responses (expired/missing token) redirect to /auth
   */

const PRIORITY_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
};

const EMPTY_FORM = { title: '', description: '', priority: 'medium', completed: false };

function Tasks({ setIsLoggedIn }) {
  const navigate = useNavigate();
  // ── State ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [fetchKey, setFetchKey]   = useState(0);         // increment → re-fetch (retry)

  // Form state
  const [form, setForm]           = useState(EMPTY_FORM);
  const [formLoading, setFormLoading] = useState(false);  // POST in-flight
  const [formError, setFormError] = useState(null);

  // Edit mode
  const [editId, setEditId]       = useState(null);       // null = creating, id = editing

  // Delete confirm dialog
  const [confirmId, setConfirmId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast
  const [toast, setToast]         = useState(null);       // { message, type }

  // ── Helpers ────────────────────────────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const handleRetry = useCallback(() => setFetchKey((k) => k + 1), []);

  // ── 401 handler — token expired, redirect to login ──────────────────────
  const handleUnauthorized = useCallback(() => {
    clearToken();
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate('/auth');
  }, [navigate, setIsLoggedIn]);

  // ── Fetch tasks on mount & retry ───────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setError(null);

    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => {
        if (err.message.includes('401')) { handleUnauthorized(); return; }
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [fetchKey, handleUnauthorized]);

  // ── Form handlers ──────────────────────────────────────────────────────────
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      completed: task.completed || false,
    });
    setFormError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }

    setFormLoading(true);
    setFormError(null);

    try {
      if (editId) {
        // ── UPDATE ────────────────────────────────────────────────────────
        const updated = await updateTask(editId, form);
        // Update state from server response (don't assume success)
        setTasks((prev) => prev.map((t) => (t._id === editId ? updated : t)));
        showToast('✅ Task updated successfully!');
        cancelEdit();
      } else {
        // ── CREATE (optimistic UI) ────────────────────────────────────────
        const tempId = `temp-${Date.now()}`;
        const optimistic = { ...form, _id: tempId, createdAt: new Date().toISOString() };
        setTasks((prev) => [optimistic, ...prev]);

        const created = await createTask(form);
        // Replace optimistic entry with real server data
        setTasks((prev) => prev.map((t) => (t._id === tempId ? created : t)));
        setForm(EMPTY_FORM);
        showToast('🎉 Task created!');
      }
    } catch (err) {
      setFormError(err.message);
      // Roll back optimistic entry on failure
      if (!editId) {
        setTasks((prev) => prev.filter((t) => !t._id.startsWith('temp-')));
      }
      showToast('❌ Operation failed: ' + err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const confirmDelete = (id) => setConfirmId(id);
  const cancelDelete  = ()  => setConfirmId(null);

  const handleDelete = async () => {
    if (!confirmId) return;
    setDeleteLoading(true);
    try {
      await deleteTask(confirmId);
      setTasks((prev) => prev.filter((t) => t._id !== confirmId));
      showToast('🗑️ Task deleted.');
    } catch (err) {
      showToast('❌ Delete failed: ' + err.message, 'error');
    } finally {
      setDeleteLoading(false);
      setConfirmId(null);
    }
  };

  // ── Toggle Completed ──────────────────────────────────────────────────────
  const toggleCompleted = async (task) => {
    try {
      const updated = await updateTask(task._id, { ...task, completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
    } catch (err) {
      showToast('❌ Could not update task: ' + err.message, 'error');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="tasks-section" aria-label="Task Manager">

      {/* ── Toast notification ──────────────────────────────────────────── */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* ── Delete Confirmation Dialog ───────────────────────────────────── */}
      {confirmId && (
        <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="confirm-box card">
            <p className="confirm-icon">🗑️</p>
            <h3 className="confirm-title">Delete this task?</h3>
            <p className="confirm-desc">This action cannot be undone.</p>
            <div className="confirm-actions">
              <button id="confirm-cancel-btn" className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                id="confirm-delete-btn"
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting…' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create / Edit Form ───────────────────────────────────────────── */}
      <div className="card task-form-card">
        <h2 className="section-title">
          {editId ? '✏️ Edit Task' : '➕ New Task'}
        </h2>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-title">Title *</label>
            <input
              id="task-title"
              name="title"
              type="text"
              className="form-input"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={handleFormChange}
              disabled={formLoading}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label" htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              className="form-input"
              placeholder="Optional details…"
              value={form.description}
              onChange={handleFormChange}
              disabled={formLoading}
              rows={3}
            />
          </div>

          {/* Priority + Completed row */}
          <div className="task-form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label" htmlFor="task-priority">Priority</label>
              <select
                id="task-priority"
                name="priority"
                className="form-input form-select"
                value={form.priority}
                onChange={handleFormChange}
                disabled={formLoading}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div className="form-group form-group-check">
              <label className="form-label check-label" htmlFor="task-completed">
                <input
                  id="task-completed"
                  name="completed"
                  type="checkbox"
                  className="task-checkbox"
                  checked={form.completed}
                  onChange={handleFormChange}
                  disabled={formLoading}
                />
                Completed
              </label>
            </div>
          </div>

          {/* Form-level error */}
          {formError && (
            <p className="form-error" role="alert">⚠️ {formError}</p>
          )}

          {/* Actions */}
          <div className="task-form-actions">
            {editId && (
              <button
                id="cancel-edit-btn"
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
                disabled={formLoading}
              >
                Cancel
              </button>
            )}
            <button
              id="submit-task-btn"
              type="submit"
              className="btn btn-primary"
              disabled={formLoading}
            >
              {formLoading
                ? editId ? 'Saving…' : 'Creating…'
                : editId ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>

      {/* ── Task List ────────────────────────────────────────────────────── */}
      <div className="card">
        <h2 className="section-title">📋 All Tasks</h2>

        {/* Loading */}
        {loading && <Spinner />}

        {/* Error */}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Empty */}
        {!loading && !error && tasks.length === 0 && (
          <div className="tasks-empty">
            <span className="tasks-empty-icon">📭</span>
            <p>No tasks yet. Create your first one above!</p>
          </div>
        )}

        {/* Task cards */}
        {!loading && !error && tasks.length > 0 && (
          <div className="task-list">
            {tasks.map((task) => (
              <div
                key={task._id}
                className={`task-card${task.completed ? ' task-card--done' : ''}`}
                role="listitem"
                aria-label={`Task: ${task.title}`}
              >
                {/* Left: checkbox + content */}
                <button
                  className={`task-toggle${task.completed ? ' task-toggle--done' : ''}`}
                  onClick={() => toggleCompleted(task)}
                  aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
                  title={task.completed ? 'Mark as pending' : 'Mark as completed'}
                  id={`toggle-${task._id}`}
                >
                  {task.completed ? '✅' : '⬜'}
                </button>

                <div className="task-body">
                  <div className="task-header-row">
                    <h3 className={`task-title${task.completed ? ' task-title--done' : ''}`}>
                      {task.title}
                    </h3>
                    <span
                      className="task-priority-badge"
                      style={{ background: `${PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium}22`, color: PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium, border: `1px solid ${PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.medium}55` }}
                    >
                      {task.priority ?? 'medium'}
                    </span>
                  </div>
                  {task.description && (
                    <p className="task-desc">{task.description}</p>
                  )}
                  <p className="task-date">
                    Created {new Date(task.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Right: actions */}
                <div className="task-actions">
                  <button
                    id={`edit-${task._id}`}
                    className="task-action-btn task-edit-btn"
                    onClick={() => startEdit(task)}
                    aria-label={`Edit task: ${task.title}`}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    id={`delete-${task._id}`}
                    className="task-action-btn task-delete-btn"
                    onClick={() => confirmDelete(task._id)}
                    aria-label={`Delete task: ${task.title}`}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Tasks;
