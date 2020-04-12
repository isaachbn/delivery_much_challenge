FROM node:12-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "development"]

EXPOSE 3000