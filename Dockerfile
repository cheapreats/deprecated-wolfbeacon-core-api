FROM mhart/alpine-node:base-6

COPY . /code

WORKDIR /code

RUN npm install

EXPOSE 3000

CMD ["babel-node", "./bin/www"]