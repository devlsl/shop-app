FROM node:latest

WORKDIR /app

COPY package*.json .

COPY apps/server/package*.json ./apps/server/

COPY packages/shared/package*.json ./packages/shared/package*.json

RUN npm install

COPY . .

RUN npm run shared:build

RUN npm run server:build

CMD ["npm", "run", "server:start"]