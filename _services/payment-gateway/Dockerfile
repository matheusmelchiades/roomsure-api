FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]

