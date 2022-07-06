FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock /app

RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "dev","npm"]
