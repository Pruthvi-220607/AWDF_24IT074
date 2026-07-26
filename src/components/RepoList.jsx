import React from 'react';

/**
 * RepoList Component
 * Renders a responsive grid of GitHub repository cards.
 *
 * Props:
 *   repos {Array} - Filtered array of repository objects from the GitHub API.
 */
function RepoList({ repos }) {
  if (repos.length === 0) {
    return (
      <p className="repo-empty">
        No repositories match your search. Try a different keyword.
      </p>
    );
  }

  return (
    <div className="repo-grid" role="list">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="repo-card card"
          role="listitem"
          aria-label={`Repository: ${repo.name}`}
        >
          {/* Repository Name */}
          <div className="repo-header">
            <span className="repo-icon" aria-hidden="true">📦</span>
            <h3 className="repo-name">{repo.name}</h3>
          </div>

          {/* Description */}
          <p className="repo-desc">
            {repo.description
              ? repo.description
              : <span className="repo-no-desc">No description provided.</span>}
          </p>

          {/* Metadata row: language + stars + forks */}
          <div className="repo-meta">
            {repo.language && (
              <span className="repo-language">
                <span className="lang-dot" aria-hidden="true">●</span>
                {repo.language}
              </span>
            )}
            <span className="repo-stars" title="Stargazers">
              ⭐ {repo.stargazers_count ?? 0}
            </span>
            <span className="repo-forks" title="Forks">
              🍴 {repo.forks_count ?? 0}
            </span>
          </div>

          {/* Link to repository */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
            id={`repo-link-${repo.id}`}
            aria-label={`Open ${repo.name} on GitHub`}
          >
            View on GitHub ↗
          </a>
        </div>
      ))}
    </div>
  );
}

export default RepoList;
