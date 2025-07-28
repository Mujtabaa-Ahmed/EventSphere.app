## 🌿 Branching Strategy for Full-Stack Deployment

This project follows a structured Git branching model to separate frontend and backend development and ensure smooth deployment to different platforms.

### 🗂 Branch Overview

| Branch     | Purpose                            | Deployment Target |
|------------|-------------------------------------|-------------------|
| `main`     | Stable, integrated branch with both frontend and backend code. Used for staging or final production review. | None (optional staging) |
| `branch_frontend` | Contains only the frontend code (React, Vite, or Next.js inside `/frontend` folder). | Vercel |
| `brnach_backend`  | Contains only the backend code (Node.js, Express, or Nest.js inside `/backend` folder). | Railway |

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
After the changes made in frontend branch, you have to push the changes on frontend brnach (branch_frontend)
# To push changes in frontend branch
git push origin branch_frontend

# Work on backend
git checkout branch_backend
# Make changes to backend code
After the changes made in backend branch, you have to push the changes on backend brnach (branch_backend)
git push origin branch_backend

# Merge both into main for integration
git checkout main
git merge branch_frontend
git merge branch_backend
