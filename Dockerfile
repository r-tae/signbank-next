FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]
