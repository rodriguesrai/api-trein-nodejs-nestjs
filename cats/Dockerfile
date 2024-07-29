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

RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

CMD [ "node", "dist/src/main.js" ]    
#conferir comando acima para ver se o /src existe no /dist