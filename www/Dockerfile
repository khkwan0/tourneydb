FROM node:lts-alpine

RUN apk add --no-cache bash
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/public
WORKDIR /usr/src/app
COPY ./index.js /usr/src/app
COPY ./public/privacy.html /usr/src/app/public
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install
