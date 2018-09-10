FROM node:10-alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:mainline-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html