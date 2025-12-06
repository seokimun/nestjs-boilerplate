FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]