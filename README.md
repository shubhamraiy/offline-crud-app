# Offline CRUD App

A React Native mobile application that allows users to create, read, update, and delete items with offline storage capabilities using AsyncStorage.

## Features

- **Offline Storage**: All data is stored locally on the device using AsyncStorage
- **CRUD Operations**: Create, read, update, and delete items
- **Modern UI**: Clean and intuitive user interface with consistent theming
- **Form Validation**: Input validation for required fields
- **Responsive Design**: Works on various screen sizes

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Redux Toolkit**: State management
- **AsyncStorage**: Local data persistence
- **React Navigation**: Screen navigation
- **TypeScript**: Type safety and better developer experience
- **Expo**: Development platform for React Native

## Project Structure

```
offline-crud-app/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx      # Custom button component
│   │   ├── Card.tsx        # Card container component
│   │   ├── Input.tsx       # Form input component
│   │   └── ItemCard.tsx    # Item display component
│   ├── constants/          # App constants
│   │   └── theme.ts        # Theme variables (colors, spacing, etc.)
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx # Main navigation configuration
│   ├── redux/              # Redux state management
│   │   ├── slices/         # Redux slices
│   │   │   └── itemSlice.ts # Item state management
│   │   └── store/          # Redux store
│   │       └── store.ts    # Store configuration
│   ├── screens/            # App screens
│   │   ├── ItemFormScreen.tsx # Create/edit item screen
│   │   └── ItemListScreen.tsx # List items screen
│   └── types/              # TypeScript type definitions
│       └── index.ts        # App type definitions
├── App.js                  # App entry point
└── package.json            # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo Go app installed on your mobile device (for testing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shubhamraiy/offline-crud-app.git
   cd offline-crud-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the Expo development server:

   ```bash
   npx expo start
   # or
   yarn expo start
   ```

4. Running with Expo Go:

   - Install the Expo Go app on your mobile device from the [App Store](https://apps.apple.com/app/apple-store/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - Scan the QR code displayed in your terminal with your device's camera (iOS) or the Expo Go app (Android)
   - The app will open in Expo Go on your device

5. Alternative: Run on a simulator/emulator:

   ```bash
   # For iOS simulator
   npx expo run:ios

   # For Android emulator
   npx expo run:android
   ```

## Usage

- **View Items**: Open the app to see a list of all items
- **Add Item**: Tap "Add New Item" to create a new item
- **Edit Item**: Tap the "Edit" button on an item to modify it
- **Delete Item**: Tap the "Delete" button to remove an item

## Theme System

The app uses a comprehensive theme system with constants for:

- Colors
- Font sizes and weights
- Spacing
- Border radius
- Shadows

This ensures consistent styling throughout the application and makes it easy to update the app's appearance.

## Repository Information

- **GitHub Repository**: [offline-crud-app](https://github.com/shubhamraiy/offline-crud-app)
- **Author**: Shubham Rai
- **Email**: shubhamraiy@gmail.com
- **License**: MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
