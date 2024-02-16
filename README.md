# Todo App: YourTasks
![logo](./apps/assets/images/logofull.png)

This is the small project built by [**React Native**](https://reactnative.dev) using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

This mobile apps can be actived on both iOS and Android platforms.

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Install and start metro server

```bash
# install easlily with using npm
npm i

# or yarn
yarn
```

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

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

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Project Structure

This project used some main libraries to build the structure from the scratch:

- `React Navigation` (version v6.x): Handle the navigation for all screens.
- `Redux Toolkit` (version v2.x): Handle the state management in the project.
- `AsysnStorage`: it is used to save the local data in the user's device. And it is designed as the api with full services: Create / Update / Delete / Retrieve in this project.
- `Reanimated` (version v3.x) and `Gesture Handler` (version v2.x): it is used to get the simple gesture to swipe the actions (update & delete).

The structure:

```bash
|- index.js
|---- android/ # native builder for Android platform
|---- ios/ # native builder for iOS platform
|---- __tests__/ # unit tests are here
|---- jest/setup.js # jest file for setting
|---- babel.config.js # set up babel config to the project
|---- tsconfig.json # set up typescript config to the project
|---- react-native.config.js # set up to access the assets data (images, fonts) in the project
|---- apps/ # source code is here
      | ---- assets/ # store the assets files as images and fonts
      | ---- commons/ # configure the text-contents, retrieving images, screen names and theme of the project
      | ---- cores/ # Pure UI components will be created and used from here
      | ---- redux/ # Configure the state management with Redux toolkit
      | ---- screens/ # define all screens using in the project
      | ---- storages/ # define all services using with AsyncStorage.
      | ---- App.tsx # Main component in the project
```

## Step 4: Design Figma

This Figma design is the open source in Figma community, and we could adjust some details to make sense the project.

- Link is here: [**Your Tasks Design**](https://www.figma.com/file/qoJoHiC2TlzZc3MSGCyzpa/Todo-List-App-(Community)?type=design&node-id=0%3A1&mode=design&t=C7gzL8xuTD4JeXyT-1)

![design](./apps/assets/images/design-yourtasks.png)

## Conclusion

This is only the repository to practice the React Native framework, and I hope to help you to get something which is helpful.
