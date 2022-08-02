FROM node:alpine AS builder

WORKDIR /app

COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile --production=false
COPY . .
RUN yarn build
#RUN npm prune --omit=dev # yarn doesn't have an equiv

FROM node:alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

#CMD ["yarn", "dev"]
CMD ["yarn", "start"]
