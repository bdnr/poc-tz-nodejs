FROM docker.io/library/centos:7

RUN yum install -y  epel-release
RUN yum install -y  nodejs npm python2 node-gyp gcc make unixODBC git

RUN mkdir -p /app
RUN git clone git@github.com:bdnr/poc-tz-nodejs.git /app

WORKDIR /app

RUN npm i  && ln -s /app/node_modules/ /node_modules

EXPOSE 4000

CMD ["node", "/app/server.js"]
