FROM node:lts

ENV APP_NAME=risqlac-web
ENV NODE_ENV=production

WORKDIR /usr/server/$APP_NAME

COPY . .

RUN npm i && \
    npm run build

EXPOSE 3000

CMD npx serve dist
