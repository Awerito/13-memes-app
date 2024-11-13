# React Native + Expo Template

<!-- ![GitHub package.json dev dependency version](https://img.shields.io/github/package-json/dependency-version/awerito/react-native-expo-template/dev/expo?logo=expo) -->
![GitHub package.json prod dependency version](https://img.shields.io/github/package-json/dependency-version/awerito/13-memes-app/react-native?logo=react)
<!-- [![GitHub License](https://img.shields.io/github/license/Awerito/react-native-expo-template?logo=github)](./LICENSE) -->

This is a template for projects using [React Native](https://reactnative.dev/)
and [Expo](https://expo.dev/), providing a solid, customizable foundation for
building modern mobile applications.

## Features

- **React Native**: Popular JavaScript library for building native mobile
interfaces.
- **Expo**: Platform that simplifies setup and deployment of React Native apps.
- **JavaScript (ES6+)**: Modern JavaScript setup to keep your code efficient
and clean.

## Requirements

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) >= 18.0.x
- [npm](https://www.npmjs.com/) >= 9.0.x or [yarn](https://yarnpkg.com/) >= 1.22.x
- [Expo CLI](https://docs.expo.dev/get-started/installation/) >= 6.0.x
(optional, but recommended for local setup)

## Installation

1. Install the dependencies:

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn
   ```

## Available Scripts

In the project directory, you can run the following commands:

### `npx expo start` or `yarn start`

Starts the app in development mode. Scan the QR code with the Expo Go app on
your device to preview the app or install web dependencies for web preview.

## Project Structure

```bash
.
├── assets/              # Static assets like images and fonts
├── components/          # Reusable React Native components
├── screens/             # Main application screens
├── navigation/          # Navigation setup
├── App.js               # Root component of the application
├── app.json             # Expo configuration
├── babel.config.js      # Babel configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project information
```

## Customization

Feel free to modify the structure, components, and styling according to your
needs. The Expo and React Native documentation are excellent resources for
customizing components and functionalities of the app.
