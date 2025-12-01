# EC EduCare Rise Mobile

A modern, cross-platform mobile application for EC EduCare built with React Native and Expo.

## Overview

EC EduCare Rise Mobile is a comprehensive education management system that enables administrators, teachers, and students to manage classes, schedules, and educational content efficiently. The app features a beautiful, intuitive interface with full dark mode support.

## Features

### Core Functionality
- **Dashboard**: Overview of classes, teachers, and students with quick actions
- **Class Management**: Create, view, and manage classes with detailed information
- **Calendar**: Visual schedule view with class filtering by date
- **Directory**: Browse and manage teachers and students
- **Profile Management**: User profile and settings

### Technical Features
- **Authentication**: OAuth2 Authorization Code flow with PKCE (IdentityServer)
- **State Management**: Zustand for auth state, RTK Query for API caching
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router with file-based routing
- **Security**: Secure token storage with automatic refresh
- **Dark Mode**: Full dark mode support across all screens

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS)
- **State Management**: Zustand + Redux Toolkit
- **Navigation**: Expo Router
- **API**: RTK Query
- **Authentication**: OAuth2 with PKCE

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ec-educare-rise-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your configuration:
   - For Android Emulator, use `10.0.2.2` instead of `localhost`
   - Set your IdentityServer URL and API endpoints

4. **IdentityServer Configuration**
   
   Ensure your IdentityServer client is configured with:
   - Client ID: `ec-educare-mobile`
   - Redirect URI: `com.eceducare.app://`
   - Scopes: `openid profile email roles offline_access educare.api`
   - PKCE enabled
   - Grant types: `authorization_code`, `refresh_token`

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## Project Structure

```
ec-educare-rise-mobile/
├── app/                    # Expo Router screens and layouts
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── index.tsx      # Dashboard
│   │   ├── classes.tsx    # Classes list
│   │   ├── calendar/      # Calendar view
│   │   └── directory/     # Teacher/Student directory
│   ├── auth/              # Authentication screens
│   ├── class/             # Class detail and creation
│   ├── student/           # Student management
│   ├── teacher/           # Teacher management
│   └── profile/           # User profile
├── components/            # Reusable UI components
├── services/              # RTK Query API definitions
├── store/                 # Zustand and Redux stores
├── utils/                 # Helper functions
└── assets/                # Images, fonts, etc.
```

## Key Screens

### Dashboard
- Quick action cards for common tasks
- Statistics overview (classes, teachers, students)
- Today's classes with time display
- Daily tips and insights

### Classes
- List view with search and filtering
- Class details with student/teacher information
- Create and manage classes

### Calendar
- Monthly calendar view with class indicators
- Filter classes by date
- Visual schedule overview

### Directory
- Browse teachers and students
- Search and filter functionality
- Quick access to profiles

## Authentication Flow

1. User initiates login
2. App opens system browser to IdentityServer
3. User authenticates
4. IdentityServer redirects to app with authorization code
5. App exchanges code for access and refresh tokens
6. Tokens stored securely in device storage
7. User redirected to dashboard

## API Integration

- Base API configuration in `services/api.base.ts`
- Automatic `Authorization: Bearer <token>` header injection
- Token refresh on 401 responses
- Automatic logout on refresh failure

## Building for Production

### Android
```bash
# Build APK
eas build --platform android --profile preview

# Build AAB for Play Store
eas build --platform android --profile production
```

### iOS
```bash
# Build for TestFlight
eas build --platform ios --profile production
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[Your License Here]

## Support

For support, email support@eceducare.com or open an issue in the repository.
