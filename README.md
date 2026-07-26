# 🎓 React Student Portfolio

A modern, responsive single-page web application built with **React**, **Vite**, and **React Router**. Updated through **Practical 3: REST API Integration & Async State Management**.

## 🌟 Key Features (Practical 2)

- **Client-Side Routing**: Implemented multi-page navigation using `react-router-dom` v6 without page reloads.
  - `/` — **Home Page**: Renders the dynamic `About` section and custom `Skills` components.
  - `/projects` — **Projects Page**: Shows a grid layout showcasing mock projects with tags and links.
  - `/contact` — **Contact Page**: Features an interactive form for user input.
- **Reactive State Management (`useState`)**:
  - **Controlled Inputs**: The contact form captures user details and input in real time.
  - **Live Character Count**: Displays message character counts with dynamic feedback warnings (warn/danger colors as it approaches the 500 limit).
  - **UI Toggle (Help Tooltip)**: Interactive help tooltip on the message field toggleable by a button.
  - **Theme Toggle (Light/Dark Mode)**: Toggles the website look by dynamically adding a `.light-mode` class on the root element.
- **Custom 404 Route**: Handles unknown routes/paths gracefully with a themed error page and a "Back to Home" button.

---

## ✨ Key Features (Practical 3 — REST API Integration)

### API Used
- **GitHub REST API** — `https://api.github.com/users/{username}/repos`
- Public API, no authentication key required.
- Returns up to 30 repositories sorted by last-updated date.

### Async State Management
The **Projects page** (`src/pages/Projects.jsx`) implements three-state async data handling:

| State | Variable | Condition |
|-------|----------|-----------|
| Loading | `loading` | `true` while fetch is in-flight |
| Error | `error` | holds the error message string on failure |
| Success | `repos` | populated array after a successful response |

### New Components
| Component | File | Purpose |
|-----------|------|---------|
| `<Spinner />` | `src/components/Spinner.jsx` | Multi-ring animated loading indicator |
| `<ErrorMessage />` | `src/components/ErrorMessage.jsx` | Displays API error with retry button |
| `<RepoList />` | `src/components/RepoList.jsx` | Renders a responsive grid of repo cards |

### Supplementary Features Implemented
- ✅ **Retry button** — re-triggers the `useEffect` fetch by incrementing a `fetchKey` state counter.
- ✅ **Search/filter input** — live client-side filter on repository name.
- ✅ **Star count** — each repo card displays `⭐ stargazers_count` and `🍴 forks_count`.

### Key Concepts Demonstrated
- `useEffect` with an **empty dependency array `[]`** to run the fetch exactly once on mount.
- `useCallback` for the stable retry handler reference.
- `.finally()` guarantees `setLoading(false)` runs on **both** success and error paths.
- HTTP-level error detection: checks `res.ok` before parsing JSON.

---

## 🛠️ Tech Stack & Dependencies

- **Framework/Build**: React (v19+), Vite (v8+)
- **Routing**: `react-router-dom` (v6+)
- **Data Fetching**: Native `fetch` API (no external library needed)
- **Styling**: Vanilla CSS with CSS Variables for theme transitioning

## 🚀 Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Build the application for production:
   ```bash
   npm run build
   ```

> **To change the GitHub username displayed on the Projects page**, edit the `GITHUB_USERNAME` constant at the top of `src/pages/Projects.jsx`.


## 🌟 Key Features (Practical 2)

- **Client-Side Routing**: Implemented multi-page navigation using `react-router-dom` v6 without page reloads.
  - `/` — **Home Page**: Renders the dynamic `About` section and custom `Skills` components.
  - `/projects` — **Projects Page**: Shows a grid layout showcasing mock projects with tags and links.
  - `/contact` — **Contact Page**: Features an interactive form for user input.
- **Reactive State Management (`useState`)**:
  - **Controlled Inputs**: The contact form captures user details and input in real time.
  - **Live Character Count**: Displays message character counts with dynamic feedback warnings (warn/danger colors as it approaches the 500 limit).
  - **UI Toggle (Help Tooltip)**: Interactive help tooltip on the message field toggleable by a button.
  - **Theme Toggle (Light/Dark Mode)**: Toggles the website look by dynamically adding a `.light-mode` class on the root element.
- **Custom 404 Route**: Handles unknown routes/paths gracefully with a themed error page and a "Back to Home" button.

## 🛠️ Tech Stack & Dependencies

- **Framework/Build**: React (v19+), Vite (v8+)
- **Routing**: `react-router-dom` (v6+)
- **Styling**: Vanilla CSS with CSS Variables for theme transitioning

## 🚀 Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Build the application for production:
   ```bash
   npm run build
   ```
