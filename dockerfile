FROM node:alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build --omit=dev
WORKDIR /usr/src/app/build
RUN npm ci --only=production
EXPOSE 3333
USER node:node

CMD ["npm", "run", "start"]
