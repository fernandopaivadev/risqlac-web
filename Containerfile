FROM node:lts

ENV APP_NAME=risqlac-web
ENV NODE_ENV=production

WORKDIR /usr/server/$APP_NAME

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD npm start
