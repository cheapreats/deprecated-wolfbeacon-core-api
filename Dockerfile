FROM mhart/alpine-node:6

COPY . /code

WORKDIR /code

RUN npm install

RUN node_modules/apidoc/bin/apidoc -i routes/

EXPOSE 3000

CMD ["node_modules/.bin/babel-node", "./bin/www"]