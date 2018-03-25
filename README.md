# React Starter

Isomorphic web application skeleton build on top of [React](https://reactjs.org), [Express](http://expressjs.com), [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/).

## What's included

- ES6/ES7/ES8 support
- Fully automated toolchain with npm/yarn scripts
- Environment configuration
- Linting and testing tools
- Server-side rendering (SSR)

## Getting started

1. Clone and install dependencies:

```
$ git clone https://github.com/kvokov/react-starter.git myapp && cd myapp
$ yarn install
```

2. In first terminal run application in development mode:

```
$ yarn start
```

3. In second terminal run development server:

```
$ yarn serve
```

4. Visit [`localhost:3000`](http://localhost:3000)

**That's it!** :sunglasses:

## Local Environment Configuration

To override configuration variables for local environment create `.env` file in project root with needed variables. Example:

```
NODE_ENV=development
WEB_PORT=3000
WDS_PORT=7000
API_URL=https://emaple.com/api
```

To find used variables check `src/shared/config.js`. Also system environment variables are used too.

## Scripts

### Development:

* `$ yarn start` - Run application in development mode.

* `$ yarn serve` - Run `webpack-dev-server` for development purposes.

### Production:

* `$ yarn prod:build` - Make production build.

* `$ yarn prod:start` - Start application server with `PM2` in production mode.

* `$ yarn prod:stop` - Stop production server.

* `$ yarn prod:restart` - Stop production server.

* `$ yarn prod:build-server` - Make production build for server only.

* `$ yarn prod:build-client` - Make production build for client only.

### Testing

* `$ yarn lint` - Check code linting.

* `$ yarn test` - Run tests.
