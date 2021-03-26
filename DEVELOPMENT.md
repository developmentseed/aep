# Development

## Installation
The steps below will walk you through setting up your own instance of the project.

### Install Project Dependencies
To set up the development environment for this website, you'll need to install the following on your system:

- [Node](http://nodejs.org/) (see [.nvmrc](./.nvmrc)) (To manage multiple node versions we recommend [nvm](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/) Package manager

### Install Application Dependencies

If you use [`nvm`](https://github.com/creationix/nvm), activate the desired Node version:

```
nvm install
```

Install Node modules:

```
yarn install
```

## Running the project locally

```
yarn serve
```

Compiles the javascript and launches the server making the site available at `http://localhost:9000/`
The system will watch files and execute tasks whenever one of them changes.
The site will automatically refresh since it is bundled with livereload.

*Known limitation* - changes to the Mapbox Styles do not trigger a reload. As a workaround, you can save one of the `.yml` files instead.

## Deployment
To prepare the app for deployment run:

```
yarn build
```
This will package the app and place all the contents in the `public` directory.
The app can then be run by any web server.