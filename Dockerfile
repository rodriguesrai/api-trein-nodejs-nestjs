#Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

#Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY --from=build /app/dist ./dist

COPY --from=build /app/.env .

CMD ["node", "dist/src/main.js"]