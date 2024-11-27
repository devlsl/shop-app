FROM node:latest

WORKDIR /app

COPY apps/static/package*.json .

RUN npm install

COPY .env .

COPY apps/static/ .

RUN npm run build

CMD ["npm", "run", "start"]