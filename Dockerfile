FROM mhart/alpine-node:6

COPY . /code

WORKDIR /code

RUN npm install

EXPOSE 3000

CMD ["node_modules/.bin/babel-node", "./bin/www"]