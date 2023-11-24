FROM node:18-alpine AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
ADD package*.json ./
RUN npm install glob rimraf
RUN npm install
COPY . .
EXPOSE 8080
RUN npm run build

FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
ADD package*.json ./
RUN apk add curl
RUN npm install --only=production
COPY --from=development /opt/app/dist ./dist
EXPOSE 8080

CMD [ "node","./dist/main" ]


