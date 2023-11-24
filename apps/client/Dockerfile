FROM node:18-alpine
WORKDIR /opt/app
ADD package*.json ./
ENV WATCHPACK_POLLING=true
RUN npm install
COPY . .
EXPOSE 3000

CMD ["npm", "start"]
