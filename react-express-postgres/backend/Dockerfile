# syntax=docker/dockerfile:1.4

FROM node:14-alpine AS development

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apk add --no-cache bind-tools

WORKDIR /code

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install

COPY . /code


CMD [ "node", "src/index.js" ]


