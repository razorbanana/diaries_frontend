FROM node:22.3.0
WORKDIR /app/
COPY public ./
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/

RUN npm install

CMD ["npm", "run", "dev"]

