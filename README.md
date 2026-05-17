# Smart Leads Dashboard - Frontend Architecture & Codebase Guide 🚀

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-Caching-FF4154?logo=reactquery&logoColor=white&style=for-the-badge)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-State-black?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Axios](https://img.shields.io/badge/Axios-Networking-5A29E4?logo=axios&logoColor=white&style=for-the-badge)](https://axios-http.com/)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?logo=zod&logoColor=white&style=for-the-badge)](https://zod.dev/)

Welcome to the frontend documentation for the **Smart Leads Dashboard**! This document is built for **Developers and Reviewers** to understand the specific architectural decisions, state management patterns, and folder structure of the React frontend.

We have built this frontend focusing on **Performance, Type Safety, and Maintainability**, adhering to modern React paradigms.

---

## 🛠 Technology Stack & Decisions

- **React 19 & Vite**: Chosen for blazingly fast Hot Module Replacement (HMR) and optimized production builds.
- **TypeScript**: Used strictly across the board. Types and Interfaces match the backend models exactly, ensuring end-to-end type safety.
- **Tailwind CSS v4**: Utility-first CSS framework for rapid, responsive UI development. Integrated with `clsx` and `tailwind-merge` for dynamic class assignment without conflicts.
- **Zustand**: A small, fast, and scalable bearbones state-management solution used for global state (e.g., Theme, Authentication status) without the boilerplate of Redux.
- **React Query (TanStack Query)**: Handles all asynchronous state, caching, background fetching, and data synchronization with the backend API.
- **Axios**: Configured with interceptors to automatically attach JWT tokens to outbound requests and handle 401 Unauthorized responses globally.
- **React Hook Form & Zod**: The ultimate combo for forms. React Hook Form handles the form state without re-rendering the whole component, while Zod ensures the input matches our strict validation schemas.
- **Lucide React**: Clean, modern SVG icons used throughout the UI.

---

## 📂 Directory Structure

The `src/` directory is organized by feature and technical concern:

```text
src/
├── api/                   # Axios configuration and API wrapper functions
├── assets/                # Static files (images, global SVGs)
├── components/            # Reusable React components
│   ├── auth/              # Login/Register forms
│   ├── layout/            # Navbar, Sidebar, Page wrappers
│   ├── leads/             # Lead tables, forms, filters
│   └── ui/                # Dumb/Shared components (Buttons, Modals, Badges)
├── guards/                # Route wrappers (ProtectedRoute, RoleGuard)
├── hooks/                 # Custom React hooks (useDebounce, useLeads)
├── pages/                 # Top-level route components (Views)
├── store/                 # Zustand global state stores (auth, theme)
└── types/                 # TypeScript interfaces and type definitions
```

---

## 🔍 Deep Dive into Components & Architecture

### 1. API Layer (`/api`)
- **`axios.config.ts`**: The central nervous system for API calls. It creates an Axios instance pointing to the backend environment URL.
  - **Interceptors**: A request interceptor automatically pulls the JWT from the Zustand auth store and appends it to the `Authorization` header as a Bearer token.
- **`auth.api.ts` & `lead.api.ts`**: Dedicated files that wrap the Axios calls into strongly-typed asynchronous functions. This isolates the networking logic from the UI components.

### 2. State Management (`/store` & React Query)
We split state into two categories: **Server State** and **Client State**.
- **Client State (Zustand - `/store`)**:
  - `auth.store.ts`: Manages the current logged-in user, their JWT, and the `isAuthenticated` boolean. This state persists across reloads via `localStorage`.
  - `theme.store.ts`: Handles the Dark/Light mode toggle.
- **Server State (TanStack Query)**:
  - We *do not* store fetched leads in Zustand. Instead, we use `useQuery` and `useMutation`. This provides out-of-the-box caching, loading states (`isPending`), and automatic background refetching.

### 3. Route Guards (`/guards`)
Security isn't just on the backend; the UI needs to respect permissions too.
- **`ProtectedRoute.tsx`**: Wraps any route that requires a user to be logged in. If `isAuthenticated` from the Zustand store is false, it forces a redirect to the `/login` page.
- **`RoleGuard.tsx`**: An advanced wrapper that checks the user's role. If a route is wrapped in `<RoleGuard allowedRoles={['admin']}>`, and the current user is a `sales_user`, it blocks access and shows an unauthorized message or redirects them.

### 4. Forms & Validation (`/components/auth` & `/components/leads`)
We avoid controlled components (e.g., standard React `useState` for inputs) to prevent unnecessary re-renders on every keystroke.
- We use **React Hook Form** paired with the `@hookform/resolvers/zod`.
- The Zod schemas mirror the backend schemas perfectly. If a user tries to submit an invalid email or a password that is too short, the validation happens instantly on the client side, displaying inline error messages before a network request is even made.

### 5. UI & Styling (`/components/ui`)
- **Utility Components**: Components like `Button`, `Badge`, and `Modal` are highly reusable. 
- **Tailwind Merge**: We use a utility function (often standard in modern Tailwind setups) combining `clsx` and `twMerge`. This allows us to define base classes for a `<Button />` (e.g., `px-4 py-2 bg-blue-500`) but safely override them from the parent component (e.g., `<Button className="bg-red-500" />`) without CSS conflicts.

### 6. Custom Hooks (`/hooks`)
- **`useLeads.ts`**: A custom hook that abstracts away the complex TanStack Query configuration for fetching leads. It accepts filters and pagination params, returning a clean object containing `data`, `isLoading`, and `error` for the views to consume.
- **`useDebounce.ts`**: Used primarily for the search bar. Instead of hitting the backend API on every single keystroke, this hook delays the state update by a few hundred milliseconds, drastically reducing network requests and backend load.

---

## 🚦 Data Flow Example (Fetching Leads)

To understand how these pieces fit together, here is the flow when a user opens the **Leads Dashboard**:

1. **Routing**: React Router matches `/leads` and renders `LeadsPage.tsx` (wrapped in `ProtectedRoute`).
2. **Component Mounts**: `LeadsPage` calls our custom `useLeads()` hook, passing the current filter state (e.g., `page: 1, search: ""`).
3. **React Query**: The `useLeads` hook triggers a `useQuery` call.
4. **API Call**: The query calls `leadApi.getLeads()`.
5. **Interceptor**: `axios.config.ts` intercepts the outgoing request, grabs the JWT from Zustand, and attaches it to the headers.
6. **Response**: The backend returns the paginated data. React Query caches it.
7. **Render**: `useLeads` returns `data` and `isLoading: false`. The `LeadsPage` passes the data down to the `LeadTable` component to render the rows.

---

## 🚀 Scripts

- `npm run dev`: Starts the Vite development server with HMR.
- `npm run build`: Compiles TypeScript and builds the production-ready Vite bundle to the `dist/` folder.
- `npm run lint`: Runs ESLint across the codebase to catch syntactical and stylistic errors.
