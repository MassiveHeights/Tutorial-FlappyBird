# Flappy Bird Tutorial (BETA)
Simple Flappy Bird game build on Black Engine. The goal of this sample game is to show how to use Black Vector Graphics in your own projects.

# Size and performance
The whole game is about 55kb in size (gzipped). Textures is only 3kb in size (gzipped).
The reason for this is vector graphics which is baked into textures in realtime.

## Setup
Start by cloning this repo onto local computer:
```
git clone https://github.com/MassiveHeights/Tutorial-FlappyBird
cd Tutorial-FlappyBird
npm install
```

## Development server
To start development server  run `npm start` in the terminal then open a browser and navigate to `http://127.0.0.1:4245`.

## Watch and rebuild
All files inside `sheets`, `textures`, `fonts`, `html`, `spine` and `audio` folders will be automatically copied into `dist` folder when changed.

## Production build
For better compatibility and faster loading times please use production build `npm run bundle`.