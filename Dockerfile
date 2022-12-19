FROM node:16

EXPOSE 3000

RUN mkdir -p /reservApp

WORKDIR /reservApp

RUN npm install npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
