FROM node:lts

WORKDIR /src

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]