FROM node:alpine

WORKDIR /usr/api

COPY package.json .

RUN yarn 

COPY . . 

RUN yarn apidoc

RUN yarn test

EXPOSE 3333