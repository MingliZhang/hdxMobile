# hdxMobile

## Intro

The mobile version of HDX (Health Data Exchange). This is the react native only version of the project. No expo for training wheels. This is going to make your life a little harder than using expo but it is more versatile.

## Setup

1. Clone the repo to your local computer. (HTTPS, SSH, Github Desktop, or Github SLI).
2. Follow the step by step guide from [react native officail setup site](https://reactnative.dev/docs/next/environment-setup). Please use the React Native CLI instead of the Expo CLI and setup for android for now.
3. Install all of the dependencies by running `npm install`. Ignor the depreciations, vulnerabilities, and critical error unless you know what you are doing (expo does not support the latest everything).

## Running the app on your computer via simulation.

### Andriod Simulator

This is avaliable on MacOS, Windows, or Linux. You should have already set up these environments and tools during the setup section.

1. run `npm run android` to start the emulation. Please run this at the root of this project's directory. It wont work if you are at other locations.
2. If your andriod simulator does not pop up automatically. You will need to open it manually and if that still does not work, then you have some config not setup correctly.

### IOS simulator

I have not yet got this to work on my m1 mac... If you are successful, please complete the following guide.

1. Comming Soon! Hopefully...

## Build For Production

### Andriod

The process is described throughly [here](https://youtu.be/A3--3Ozxz6o). Some of the steps mentioned only needs to be done once.

1. Change version number in the package.json file first.
2. Run `react-native-version --never-amend`, this command should update all of the version numbers in the repo and increment the versionCode.
3. cd into the android directory using the command `cd android`.
4. Build the app using the command `./gradlew bundleRelease`. This might take a while to complete depending on your hardware and current usage.
5. Locate the new .aab file under `android/app/build/outputs/bundle/release`. It should named as app-release.aab and.
6. Upload the aab file into google play console.

### IOS

I have not yet got this to work on my m1 mac... If you are successful, please complete the following guide.

1. Comming Soon! Hopefully...

## Dependencies

- react-native-safe-area-context: Create a safe area to add our app.
- react and react-native: Needed inorder to run the app. (It is a react native app after all)
- react-native-dropdown-picker: A library to inplement a dropdown menu.
- react-native-gesture-handler: A library to handle all of the interactive gestures
- react-native-screens, react-navigation, and react-navigation-stack: Libraries to support different screens for the app.
- lodash: Javascript libraries for simple, easy to use helper functions.
- react-native-toast-message: Toast message notification library.
