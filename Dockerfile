FROM docker.io/library/centos:7

RUN yum install -y  epel-release
RUN yum install -y  nodejs npm python2 node-gyp gcc make unixODBC

RUN mkdir -p /app
WORKDIR /app
COPY *.* /app

RUN npm i  && ln -s /app/node_modules/ /node_modules

EXPOSE 4000

CMD ["node", "/app/server.js"]
