FROM nginx:mainline-alpine

ADD build/ /usr/share/nginx/html/
