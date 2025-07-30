FROM nginx:alpine

COPY index.html /usr/share/nginx/html/
COPY src/templates /usr/share/nginx/html/src/templates
COPY src/styles /usr/share/nginx/html/src/styles
COPY src/scripts /usr/share/nginx/html/src/scripts
COPY public /usr/share/nginx/html/public


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
