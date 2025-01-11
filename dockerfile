from node:15.10.0

WORKDIR /Cypress-E-commerce-Sample-Project

COPY package.json ./

RUN npm install -g npm@7.8.0
RUN npm install
RUN npm install cypress
