FROM node:lts AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm

RUN npm install

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
