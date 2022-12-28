FROM node:15.13-alpine as final
FROM node:15.13-alpine as build

# Build step of the Dockerfile. Compiles the application into a smaller, sleeked down, optimized build.
RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN yarn install --silent --ignore-engines

COPY . .

RUN yarn build

# Run step of the Dockerfile. Gets the compiled build of the app from the build step and runs it.
FROM final

RUN mkdir -p /app

WORKDIR /app

COPY package.json ./

RUN yarn global add serve --ignore-engines

COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]