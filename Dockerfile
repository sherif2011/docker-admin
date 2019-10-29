FROM postgres
USER POSTGRES
## ADD source './docker-entrypoint-initdb.d'
# USER postgres

# RUN postgres &\
#  psql --command "IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = 'user')\
#  THEN CREATE USER postgres WITH SUPERUSER ENCRYPTED PASSWORD 'Sunrise@2015'; END IF;" &\
#  createdb main

EXPOSE 5432
# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD [ "node", "." ]
