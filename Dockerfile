FROM node:12-alpine

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

CMD ["yarn", "production"]

EXPOSE 3000