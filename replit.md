# Overview

This is a React-based user dashboard application built with Vite, featuring Firebase Realtime Database for data persistence and OpenWeatherMap API integration for location data. The application follows a feature-based architecture pattern, organizing code by features rather than by file types. Users can add, edit, and delete user records with automatic location data fetching based on zip codes. The app includes toast notifications for user feedback, human-readable timezone formatting, and real-time search/filter functionality. The application is configured to run on Replit with TypeScript support available.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## October 12, 2025 - Firebase Authentication
- **Frontend-Only Authentication**: Implemented Firebase Authentication for user access control
  - Google sign-in with popup authentication
  - No backend server required - pure frontend implementation
  - Auth state management with onAuthStateChanged listener
- **Protected Dashboard**: User dashboard now requires authentication
  - Login page displayed for unauthenticated users
  - User profile displayed in dashboard header (avatar, name, email)
  - Sign-out button for authenticated users
- **AuthProvider Context**: Centralized authentication state management
  - Loading state handling during authentication check
  - Automatic session persistence across page refreshes

## October 11, 2025 - Form Validation Enhancement
- **React Hook Form Integration**: Replaced local state management with react-hook-form
  - Cleaner form handling with automatic field registration
  - Built-in validation state management
  - Form reset functionality on success
- **Yup Validation**: Added schema-based validation for user forms
  - Name: 2-50 characters, required, trimmed
  - Zip Code: Exactly 5 digits, required, trimmed
  - Real-time validation feedback on blur
  - User-friendly error messages

## October 10, 2025 - UX Enhancements
- **Toast Notifications**: Added Chakra UI v3 toaster system for user feedback
  - Success toasts for add/update/delete operations
  - Error toasts with specific, user-friendly messages for API failures
  - Weather API errors now properly categorized (invalid zip, network errors, API key issues)
- **Timezone Display**: Improved timezone formatting from raw seconds to human-readable format
  - UTC-4:00, UTC+5:30, UTC (for zero offset)
  - Consistent HH:MM format for all timezones
- **Search/Filter**: Added real-time search functionality
  - Case-insensitive search by name or zip code
  - Defensive normalization handles null/numeric values safely
  - Empty state messages for no results
- **Error Handling**: Enhanced weatherService with specific error messages
  - 404: Invalid zip code with helpful message
  - 401: API key configuration error
  - Network errors clearly identified

# System Architecture

## Frontend Framework
- **Technology**: React 18.2.0 with Vite 5.0.0
- **Rationale**: Vite provides fast Hot Module Reloading (HMR) and optimized builds, making development efficient. React offers a component-based architecture for building interactive UIs.
- **Language Support**: JavaScript with optional TypeScript support (configured via tsconfig.json)
- **Build Tool**: Vite with React plugin for JSX/TSX transformation

## Architecture Pattern: Feature-Based

The project uses a feature-based architecture where code is organized by feature domains rather than file types:

```
src/
  features/
    users/
      components/       # UI components for user feature
      services/         # Business logic and API calls
      hooks/           # Custom React hooks
      index.js         # Feature exports
  providers/          # Global providers (Chakra UI, React Query)
  App.jsx            # Main application component
  firebase.js        # Firebase configuration
```

### Users Feature Components
- **UserTable**: Main dashboard displaying users in a table with CRUD operations
- **AddUserModal**: Dialog with form to add new users (name, zip code)
- **EditUserModal**: Dialog with form to edit existing users

### Services Layer
- **userService.js**: Firebase CRUD operations (getUsers, addUser, updateUser, deleteUser)
- **weatherService.js**: OpenWeatherMap API integration for location data

### Custom Hooks
- **useUsers**: Fetches all users with React Query
- **useAddUser**: Mutation hook for adding users with location data
- **useUpdateUser**: Mutation hook for updating users (re-fetches location if zip changes)
- **useDeleteUser**: Mutation hook for deleting users

## Development Configuration
- **Dev Server**: Vite dev server running on port 5000
- **Host Configuration**: Bound to 0.0.0.0 with strict port enforcement and allowedHosts enabled for Replit iframe compatibility
- **Module System**: ESNext modules with ES6+ features enabled
- **Hot Reload**: Fast refresh enabled for instant development feedback

## Data Architecture
- **State Management**: 
  - React's built-in hooks (useState for local UI state)
  - @tanstack/react-query for server state management and caching
- **API Communication**: axios for HTTP requests
- **Real-time data synchronization**: Firebase Realtime Database
- **Data Structure**: Users stored at `/users` path with auto-generated IDs
- **User Schema**: 
  ```json
  {
    "id": "string (auto-generated)",
    "name": "string",
    "zipCode": "string",
    "latitude": "number",
    "longitude": "number",
    "timezone": "number (seconds offset from UTC)",
    "createdAt": "number (timestamp)",
    "updatedAt": "number (timestamp)"
  }
  ```

# UI Framework

## Chakra UI v3
- **Component Library**: Modern, accessible React component library
- **Provider**: Custom ChakraProvider wraps the app with Chakra's default system
- **Components Used**:
  - Table (for user data display)
  - Dialog (for modals)
  - Button, Input, Field (for forms)
  - Stack, Box, Flex (for layout)
- **Key Feature**: Composition-based components (e.g., Field.Root, Field.Label)

# External Dependencies

## Firebase Integration
- **Service**: Firebase Realtime Database + Firebase Authentication
- **SDK Version**: firebase@12.4.0
- **Configuration File**: `src/firebase.js` - initializes Firebase app, database, and authentication
- **Environment Variables**: Configured via Vite's import.meta.env (prefix: VITE_)
  - VITE_FIREBASE_API_KEY - Firebase API key
  - VITE_FIREBASE_AUTH_DOMAIN - Authentication domain
  - VITE_FIREBASE_DATABASE_URL - Realtime Database URL (required)
  - VITE_FIREBASE_PROJECT_ID - Project identifier
  - VITE_FIREBASE_STORAGE_BUCKET - Storage bucket name
  - VITE_FIREBASE_MESSAGING_SENDER_ID - Cloud messaging sender ID
  - VITE_FIREBASE_APP_ID - App identifier

### Firebase Realtime Database
- **Operations Used**:
  - `getDatabase()` - Initialize database connection
  - `ref()` - Create database references
  - `get()` - Read data once
  - `push()` - Generate unique IDs for new entries
  - `set()` - Write complete data
  - `update()` - Update specific fields
  - `remove()` - Delete data
- **Purpose**: Persistent storage for user data

### Firebase Authentication
- **Service**: `src/services/authService.js` - authentication service layer
- **Provider**: Google Authentication with popup sign-in
- **Operations Used**:
  - `getAuth()` - Initialize Firebase Auth
  - `signInWithPopup()` - Google OAuth popup sign-in
  - `signOut()` - Sign out current user
  - `onAuthStateChanged()` - Listen for auth state changes
  - `GoogleAuthProvider()` - Google authentication provider
- **State Management**: 
  - `src/providers/AuthProvider.jsx` - React Context for auth state
  - Automatic session persistence across page refreshes
  - Loading state management during authentication checks
- **UI Components**:
  - `src/components/Login.jsx` - Login page with Google sign-in button
  - Protected routes in `src/App.jsx` - Conditional rendering based on auth state
  - User profile display in UserTable header with sign-out button
- **Architecture**: Frontend-only authentication (no backend server required)

## OpenWeatherMap API
- **Service**: Weather and location data API
- **API Key**: Hardcoded in weatherService.js (7afa46f2e91768e7eeeb9001ce40de19)
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Purpose**: Fetches latitude, longitude, and timezone based on zip code
- **Data Retrieved**:
  - `coord.lat` - Latitude
  - `coord.lon` - Longitude
  - `timezone` - Timezone offset in seconds from UTC
- **Usage**: Automatically called when adding or updating users (if zip code changes)

## React Query (@tanstack/react-query)
- **Version**: Latest
- **Configuration**: Custom QueryProvider with optimized defaults
  - `refetchOnWindowFocus: false`
  - `retry: 1`
  - `staleTime: 5 minutes`
- **Purpose**: Server state management, caching, and automatic refetching
- **Query Keys**:
  - `['users']` - User list data

## Axios
- **Version**: Latest
- **Purpose**: HTTP client for OpenWeatherMap API calls
- **Usage**: Simplified async/await API requests with automatic JSON parsing

## Form Management
- **react-hook-form**: Modern form library for React with minimal re-renders
- **yup**: Schema validation library for robust form validation
- **@hookform/resolvers**: Integration layer between react-hook-form and yup
- **Usage**: Declarative form validation with schema-based rules

## Build & Development Tools
- **Vite**: Frontend build tool and dev server
- **@vitejs/plugin-react**: React support for Vite (JSX transformation, Fast Refresh)
- **TypeScript**: Type checking support (optional, can rename .jsx to .tsx files)
- **React & React-DOM**: UI library (v18.2.0) and DOM renderer
- **@emotion/react**: CSS-in-JS library required by Chakra UI v3

## Hosting Platform
- **Platform**: Replit
- **Server Configuration**: Custom Vite config for Replit's hosting requirements (0.0.0.0 binding, port 5000, allowed hosts)