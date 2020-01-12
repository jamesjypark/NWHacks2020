# NWHacks2020 - Froogle

### Overview

Froogle is an SMS based search engine, that allows for searching without an internet connection. This allows users with limited or no data plans to complete simple searches and get answers with ease. 

### Technologies

This project's frontend utilizes React Native to render the Android and iOS applications, uses a shared codebase for quicker development. The backend is created using Node.js to create a server that receives, filters, formats, and sends queries to and from the frontend. A full list of the project's 
technologies is found below.

- React Native
- Node.js
- Standard Library
- Twilio

### Installation

#### Frontend
After cloning the repository, complete the following steps to run the frontend on a physically connected Android device: 

1. Navigate to the `/frontend` folder.
2. Run `npm install`.
3. Run `react-native run-android` to start the application.
4. The application should automatically launch - if it doesn't, look for an app called "Froogle" in the app drawer.
5. Ensure to enable the SMS permissions prior to using the app. These permissions can be found in `Settings > Applications > Froogle > Permissions > "Allow SMS".

#### Backend
After cloning the repository, complete the following steps to run the backend on a webserver: 

1. Navigate to the `/frontend` folder.
2. Run `lib .` to slocally run the server.

Requests can be sent to `[BASE_URL]/text-internet@dev`
