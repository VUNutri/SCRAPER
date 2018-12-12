FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install --dev
COPY . /app
RUN npm run build
CMD node ./build/app.js
EXPOSE 8084
