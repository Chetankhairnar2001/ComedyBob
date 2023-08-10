ARG PORT

# work on top of node image
FROM node:18 
# specifiy working directory
WORKDIR /frontend
# make port argument available as environment variable
ENV PORT=$PORT

# init directories
RUN mkdir server && mkdir app

# install pm2
RUN npm install -g pm2

# ========================
# Server Setup
# ========================
# copy dependency files to docker image
COPY server/package.json server/
COPY server/yarn.lock server/
# install dependencies
RUN cd server && yarn install
# copy remaining assests to docker image
COPY server/ server/

# ========================
# Frontend Setup
# ========================
# copy dependency files to docker image
COPY app/package.json app/
COPY app/yarn.lock app/
# install dependencies
RUN cd app && yarn install
# copy remaining assests to docker image
COPY app/ app/
# build frontend code
RUN cd app && yarn build

# move static files to server
RUN mv app/dist server/

# Expose container port
EXPOSE $PORT
# set working directory to server
WORKDIR /frontend/server
# start server daemon
CMD [ "pm2-runtime", "start", "server.js" ]