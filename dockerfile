FROM node:lts-alpine

# RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /usr/app

COPY package.json yarn.* ./

# USER node

RUN yarn

#  --chown=node:node
COPY . .

EXPOSE ${APP_PORT}

CMD [ "yarn","dev" ]
