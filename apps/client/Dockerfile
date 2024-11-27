FROM node:alpine AS client_builder

WORKDIR /app

COPY package*.json .

COPY apps/client/package*.json ./apps/client/

COPY packages/shared/package*.json ./packages/shared/

RUN npm install

COPY . .

RUN npm run shared:build

RUN npm run client:build

FROM nginx:alpine

COPY --from=client_builder /app/apps/client/dist /usr/share/nginx/html

COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]