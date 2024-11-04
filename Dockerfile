# Base stage for building the static files
FROM node:lts AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV STRAPI_URL $STRAPI_URL
ENV STORE_SLUG $STORE_SLUG

# Runtime stage for serving the application
FROM nginx:mainline-alpine-slim AS runtime
COPY --from=base ./app/dist /usr/share/nginx/html
EXPOSE 80
