# Frontend API Consumption Guide

This document outlines how the frontend application interacts with the backend REST API. It is designed as a quick reference for frontend developers.

## Base URL
`https://gigflow-smart-leads-dashboard-backend-hqz6.onrender.com/api`

*(Note: In local development, this is handled by the `VITE_API_URL` environment variable in `.env`).*

---

## Global API Concepts

### Authentication
All requests except `/auth/login` and `/auth/register` require authentication.
- You do **not** need to manually attach tokens to your API calls.
- The `src/api/axios.config.ts` interceptor automatically reads the JWT from the Zustand store and attaches the `Authorization: Bearer <token>` header to all outgoing requests.

### Standard Response Format
Every backend response follows a strict contract. Our custom React hooks (`useLeads`) and API wrappers usually extract the `data` automatically.

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T; // This is the actual payload you will use
  error?: string; // Present only if success is false
}
```

### Paginated Response Format
Endpoints that return lists of data (like fetching all leads) include pagination metadata:

```typescript
interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[]; // Array of items
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
}
```

---

## Endpoint Cheat Sheet

### 1. Authentication (`/auth`)

| Method | Endpoint | Payload (Body) | Returns (`data` shape) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/register` | `{ name, email, password, role? }` | `{ user: User, token: string }` | Role is optional. |
| **POST** | `/login` | `{ email, password }` | `{ user: User, token: string }` | Zustand saves token on success. |
| **GET** | `/profile` | *None* | `User` | Used for session restoration. |

### 2. Leads (`/leads`)

| Method | Endpoint | Query / Params / Body | Returns (`data` shape) | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/` | **Query:** `status`, `source`, `search`, `sortBy`, `page`, `limit` | `PaginatedResponse<Lead>` | All filters can be combined. |
| **GET** | `/:id` | **Param:** `id` | `Lead` | |
| **POST** | `/` | **Body:** `{ name, email, source, status?, notes? }` | `Lead` | Creates a new lead. |
| **PUT** | `/:id` | **Param:** `id` <br> **Body:** Optional Lead fields | `Lead` | Updates an existing lead. |
| **DELETE** | `/:id` | **Param:** `id` | `null` | **Admin Only**. |
| **GET** | `/export/csv` | *None* | `File Stream` (CSV) | Triggered via browser download. |

---

## Error Handling
If an API call fails (e.g., 400 Validation Error, 401 Unauthorized, 404 Not Found), the backend returns:
```json
{
  "success": false,
  "message": "Error description here",
  "error": "Detailed error string or object"
}
```
In the frontend, React Query's `isError` flag will turn true, and you can display `error.message` directly in the UI.
