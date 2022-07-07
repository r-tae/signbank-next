FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock /app
RUN yarn install --production=false

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
