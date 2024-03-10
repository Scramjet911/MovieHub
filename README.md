# About
Movie Hub is a react native (0.73) app which can be used for browsing and searching for movies found in the TMdb database.

## Setup

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install dependencies

Use `npm install` or `yarn install` to install all dependencies before running

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 3: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Design

Since the number of features are low, the project has separate screens and components partitions.

Project hierarchy:
```bash
src
├── navigation
├── theme
├── config
├── api
│   └── slices
├── types
├── contexts
├── store
│   └── slices
├── assets
│   └── images
├── components
│   ├── template
│   ├── movies
│   │   └── MovieList
│   ├── movieDetails
│   │   ├── CastList
│   │   └── MovieOverview
│   └── common
│       ├── AsyncImage
│       └── NotFound
└── screens
    ├── MovieCatalog
    └── MovieDetails
__dummy_data__
```
- **src**: Root directory of the application source code.

- **navigation**: Contains code related to application navigation, such as navigation stacks, routes, and navigation helpers.

- **theme**: Holds theme-related configuration and styling constants, such as colors and typography settings.

- **config**: Houses configuration files for the application, such as API endpoints.

- **api**: Directory containing code for interacting with APIs. The `slices` subdirectory organizes API-related code by feature slices, using RTK query library.

- **types**: Holds TypeScript type definitions ordered by feature.

- **contexts**: Contains React context providers, currently only housing the redux provider.

- **store**: Directory containing Redux store-related logic. The `slices` subdirectory organizes reducers by feature slices.

- **assets**: Stores static assets like images.

- **components**: Contains reusable UI components organized into subdirectories based on functionality.

- **screens**: Holds the main screens or pages of the application, corresponding to specific user interfaces or features.

- **__dummy_data__**: Directory containing dummy data used for testing or development purposes.



## Current Progress
- [x] Navigation, color scheme setup
- [x] Landing page UI
- [x] Movie details page UI
- [x] Redux state management
- [x] Landing page api integration
- [x] Movie details page api integration
- [x] Infinite Scroll on landing page
- [x] Eslint Airbnb rule usage
- [x] Error handling (Basic)
- [x] Loading States
- [ ] Search functionality
- [ ] Error handling (Complete)
- [ ] Unit tests