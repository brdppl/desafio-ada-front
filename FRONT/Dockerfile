FROM node:16.16.0
WORKDIR /client
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 4200
CMD [ "yarn", "start", "--host=0.0.0.0" ]