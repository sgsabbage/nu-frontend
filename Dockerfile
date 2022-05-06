FROM node:12

RUN apt-get update && apt-get upgrade -y

COPY . /opt/nu
WORKDIR /opt/nu

RUN --mount=type=cache,target=/root/.npm npm install

EXPOSE 8080