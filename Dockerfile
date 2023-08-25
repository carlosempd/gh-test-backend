FROM node:19-alpine as dev
WORKDIR /app
COPY package.json ./
CMD [ "npm", "start:dev" ]

FROM node:19-alpine as dev-dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install --frozen-lockfile

FROM node:19-alpine as builder
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
# RUN npm test
RUN npm run build

FROM node:19-alpine as prod-dependencies
WORKDIR /app
COPY package.json package.json
RUN npm install --prod --frozen-lockfile

FROM node:19-alpine as prod
EXPOSE 3000
WORKDIR /app
ENV GITHUB_BASE_URL=${GITHUB_BASE_URL}
ENV GITHUB_USERNAME=${GITHUB_USERNAME}
COPY --from=prod-dependencies /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
CMD [ "node","dist/main.js"]