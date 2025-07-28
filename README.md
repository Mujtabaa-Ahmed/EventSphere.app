## 🌿 Branching Strategy for Full-Stack Deployment

This project follows a structured Git branching model to separate frontend and backend development and ensure smooth deployment to different platforms.

### 🗂 Branch Overview

| Branch     | Purpose                            | Deployment Target |
|------------|-------------------------------------|-------------------|
| `main`     | Stable, integrated branch with both frontend and backend code. Used for staging or final production review. | None (optional staging) |
| `frontend` | Contains only the frontend code (React, Vite, or Next.js inside `/frontend` folder). | Vercel |
| `backend`  | Contains only the backend code (Node.js, Express, or Nest.js inside `/backend` folder). | Railway |

---

### 🧭 Branch Purpose & Deployment Details

#### 🔵 `frontend` Branch
- Hosts all frontend-related code under the `/frontend` directory.
- Automatically deployed to **Vercel**.
- Contains environment variables and build scripts specific to the frontend.

#### 🔴 `backend` Branch
- Hosts all backend-related code under the `/backend` directory.
- Automatically deployed to **Railway**.
- Includes API logic, database integration, and other server-side functionality.

#### 🟢 `main` Branch
- Serves as the **integration branch**, combining both `frontend` and `backend`.
- Useful for testing the full-stack application as a whole.
- Stable reference point for collaboration or staging.

---

### 🚀 Deployment Platforms

| Platform | Branch     | Directory    | Build Settings         |
|----------|------------|--------------|-------------------------|
| Vercel   | `frontend` | `/frontend`  | `npm run build` or `next build` |
| Railway  | `backend`  | `/backend`   | `npm install`, `npm start` or custom command |

---

### 🛠 Workflow Example

```bash
# Work on frontend
git checkout branch_frontend
# Make changes to frontend code

# Work on backend
git checkout branch_backend
# Make changes to backend code

# Merge both into main for integration
git checkout main
git merge frontend
git merge backend
