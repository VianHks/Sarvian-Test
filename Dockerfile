FROM nginx:stable-alpine
ENV USER=nextplatform
ENV UID=5000
ENV GROUP=nextplatform
ENV GID=5000
RUN addgroup -g ${GID} ${GROUP} \
    && adduser -u ${UID} -G ${GROUP} -S -D -H -g "" -h /app -s /sbin/nologin -k /dev/null ${USER} \
    && apk add --update --no-cache ca-certificates bash curl \
    && chown -R $UID:0 /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R $UID:0 /etc/nginx \
    && chmod -R g+w /etc/nginx
COPY ./deploy/nginx/ /etc/nginx
COPY ./dist/ /app
WORKDIR /app
USER $UID
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]