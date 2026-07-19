# 🎓 React Student Portfolio

A modern, responsive single-page web application built with **React**, **Vite**, and **React Router**. This repository is updated to complete the requirements of **Practical 2: State Management and Routing**.

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
