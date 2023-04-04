FROM node:lts

ENV APP_NAME=risqlac-web
ENV NODE_ENV=production

WORKDIR /usr/server/$APP_NAME

COPY . .

RUN npm ci

EXPOSE 3000

CMD npm start
