FROM node:13-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm
COPY . ./
RUN npm build

FROM nginx:mainline-alpine
EXPOSE 80
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
