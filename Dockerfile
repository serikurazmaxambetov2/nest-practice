FROM node:22-alpine

WORKDIR /backend
COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

CMD yarn build && yarn typeorm migration:run && yarn start:prod