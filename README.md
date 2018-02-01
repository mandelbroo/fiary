<p align="center">
  <img width="100"
  style="margin-left: 25px"
  src="https://c1.staticflickr.com/5/4630/39986732582_6d7e9d8982.jpg"
  alt="fiary logo">
</p>
<h1 align="center">fiary</h1>
<h3 align="center">Your personal financial diary</h3>

<p align="center">
  <a href="https://travis-ci.org/mandelbroo/fiary">
    <img src="https://travis-ci.org/mandelbroo/fiary.svg?branch=master" />
  </a>
  <a href="https://codecov.io/gh/mandelbroo/fiary">
    <img src="https://codecov.io/gh/mandelbroo/fiary/branch/master/graph/badge.svg" />
  </a>
</p>


#### Install Node Version Manager
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`

(help https://github.com/creationix/nvm#installation)

#### Install Node LTS
`nvm install 8`

#### Install project dependencies
`yarn`

### Database configuration

#### postgres dependencies
`sudo apt install libpq-dev cmake xvfb`

#### login under postgres and create new user
`sudo -iu postgres` and `createuser --createdb --pwprompt --superuser fiary`

(list users under psql `\du`)

#### .env should contain settings:
```
DB_USER=fiary
DB_PASS=
NODE_ENV=development
JWT_SECRET=
```

#### sequelize and db init
```
yarn db:create
yarn db:migrate
```


#### Run dev frontend watcher on localhost:3000
`yarn start:dev`
#### Run dev api server on localhost:4000
`yarn serve:dev`

### Running Unit Tests
`yarn test`

(check out index.js to see routes and examples)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
