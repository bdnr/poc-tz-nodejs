FROM docker.io/library/centos:7

# prepare OS packages
RUN yum update -y \
 && yum install -y  epel-release \
 && yum install -y  nodejs npm python2 node-gyp gcc make unixODBC git

# get source code
RUN mkdir -p /root/.ssh \
 && ssh-keyscan github.com >> /root/.ssh/known_hosts \
 && mkdir -p /app \
 && git clone https://6ded00324eea54d01f4b4654eaa738ef371d54be@github.com/bdnr/poc-tz-nodejs.git /app

# change working directory
WORKDIR /app

# install NodeJs dependencies
RUN npm i  && ln -s /app/node_modules/ /node_modules

# expose default port
EXPOSE 4000

# run app
CMD ["node", "/app/server.js"]
