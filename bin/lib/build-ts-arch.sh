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
touch src/routes/origin.ts
touch src/assets/scss/base.scss
touch src/reducers/reducers.map.json

cp -i "$1/samples/reducer.master.ts" src/reducers/master.ts
echo {} > src/reducers/reducers.map.json
