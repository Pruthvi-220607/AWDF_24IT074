import React, { useState, useEffect, useCallback } from 'react';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import RepoList from '../components/RepoList';

// ─────────────────────────────────────────────
// GitHub username whose public repos to display
// ─────────────────────────────────────────────
const GITHUB_USERNAME = 'torvalds'; // Change to your GitHub username

/**
 * Projects Page — Practical 3
 *
 * Demonstrates:
 *  • useEffect to trigger a side-effect (fetch) on component mount
 *  • Three-state async management: loading | error | success
 *  • Conditional rendering based on those states
 *  • Supplementary: retry button, search filter, star count display
 */
function Projects() {
  // ── State ──────────────────────────────────
  const [repos, setRepos]       = useState([]);      // raw API data
  const [loading, setLoading]   = useState(true);    // true while request is in flight
  const [error, setError]       = useState(null);    // holds error message string on failure
  const [search, setSearch]     = useState('');      // controlled search input
  const [fetchKey, setFetchKey] = useState(0);       // increment to re-trigger useEffect (retry)

  // ── Fetch on mount (and on retry) ──────────
  useEffect(() => {
    // Reset state before every new request
    setLoading(true);
    setError(null);
    setRepos([]);

    const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`;

    fetch(apiUrl)
      .then((res) => {
        // HTTP-level error (e.g., 404, 403 rate-limit)
        if (!res.ok) {
          throw new Error(`GitHub API responded with status ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        // Always clear loading — whether success or failure
        setLoading(false);
      });
  }, [fetchKey]); // Re-runs only when fetchKey changes (retry mechanism)

  // ── Retry handler — increments fetchKey to re-trigger useEffect
  const handleRetry = useCallback(() => {
    setFetchKey((prev) => prev + 1);
  }, []);

  // ── Derived: filter repos by search term ───
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  // ── Render ─────────────────────────────────
  return (
    <section className="projects-section" aria-label="GitHub Projects">
      <div className="card">
        <h2 className="section-title">📂 GitHub Repositories</h2>

        {/* Search bar — only shown once data has loaded */}
        {!loading && !error && (
          <div className="repo-search-bar">
            <span className="repo-search-icon" aria-hidden="true">🔍</span>
            <input
              id="repo-search-input"
              type="text"
              className="repo-search-input"
              placeholder="Search repositories by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Filter repositories by name"
            />
            {search && (
              <button
                id="repo-search-clear"
                className="repo-search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* ── Conditional Rendering based on async state ── */}

        {/* 1. Loading state */}
        {loading && <Spinner />}

        {/* 2. Error state */}
        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* 3. Success state — show count badge + repo list */}
        {!loading && !error && (
          <>
            <div className="repo-count-badge" aria-live="polite">
              Showing{' '}
              <strong>{filteredRepos.length}</strong> of{' '}
              <strong>{repos.length}</strong> repositories for{' '}
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-username-link"
                id="github-profile-link"
              >
                @{GITHUB_USERNAME}
              </a>
            </div>
            <RepoList repos={filteredRepos} />
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;
