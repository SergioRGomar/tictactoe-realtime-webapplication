# About The Project

This is a simple tic tac toe game for the web, with user registration and login, built using websockets, so it becomes a multiplayer game.

The frontend is built with React on top of Next.js, typescript and tailwind are used. The backend is developed in Nodejs whit express using TypeScript, and Socket.io. Mongodb is used as the database of the project.


## Prerequisites

Since the project was built using Next.js you will need to have installed **Node v16.8** or later to run te project correctly.


## Installation on dev enviroment

### Run the backend

Is recommended run the backend before of the frontend for evit problems for cors refused connection in your http requests.

**You need are located in the directory _server_ before run any command.**

* Install all dependencies
```sh
npm install
```
* Go to the server/src/index.ts file and replace the PORT and the URL_MONGO for you variables
```sh
const PORT = "Your preferred port"
```
```sh
const URL_MONGO= "Your mongodb url"
```
* Run server
```sh
npm run dev
```

### Run the frontend

**You need are located in the _root_ directory before run any command.**

* Install dependences
```sh
npm install
```
* Run the local server
```sh
npm run dev
```

You can go to https://localhost:3000 to verify the correct run of frontend service. 