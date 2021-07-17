mkdir src
mkdir src/app
mkdir src/app/controllers
mkdir src/app/components
mkdir src/app/reducers
mkdir src/app/hooks
mkdir src/app/api
mkdir src/assets
mkdir src/assets/scss
mkdir src/assets/fonts
mkdir src/routes
mkdir src/views

touch src/views/index.tsx
touch src/assets/scss/base.scss

cp "$1/samples/reducer.master.ts" src/app/reducers/master.ts
cp "$1/samples/routes-origin.sample.ts" src/routes/origin.ts
echo {} > src/app/reducers/reducers.map.json
