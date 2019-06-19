# CANS

CANS stands for Child and Adolescent Needs and Strengths. It is an application built to capture the needs and strengths of children and adolescents through assessments. This repository contains the front end application which is explained in detail in the [architecture](#architecture) section.

# Table of Contents

1. [First Time Setup](#first-time-setup)
2. [Running the App](#running-the-app)
  1. [Running with Preint](#running-with-preint-environment)
  2. [Running with local docker images](#running-everything-locally-with-docker-compose)
  3. [Linting and Testing](#linting-and-tests)
3. [Hotfix Approach](#hotfix-approach)
4. [Architecture](#architecture)
  1. [Rails](#rails)
  2. [React](#react)
5. [Questions](#questions)

# First Time Setup

Install Ruby 2.5.1 (Check the version specified in the .ruby-version file, in case this readme is stale).

Example instructions for `rbenv` installed through Homebrew on Mac:

```
brew update
brew upgrade rbenv
brew upgrade ruby-build
rbenv install 2.5.1
```

Install language-specific package dependencies

```
bundle install # Ruby gems
yarn install # Node modules
```

# Running the App

There are two primary ways of running the CANS app:

1. Running the CANS app and all dependencies locally using Docker, or...
2. Running only the CANS app and using an existing environment such as Preint as an API backend.

## Running with Preint environment

In order to run against Preint environment: 
1. Create a `.env` file and copy its body from the [CWDS env-store repo's cans.dev.local-with-preint.env](https://github.com/ca-cwds/env-store/blob/master/envs/cans/cans.dev.local-with-preint.env) (the repo is private, for CWDS developers usage only).
2. Run local instance of Redis (`docker-compose up redis` or `redis-server` if you have it installed)
3. Run CANS application: 
    1. Run Rails (`rails s`), and the webpack dev server (`yarn start` or `./bin/webpack-dev-server`).
    2. **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CANS root folder. Please do not include the foreman gem in the Gemfile

## Running everything locally with Docker Compose

You will need a full **.env** file for this.
Copy it from the [CWDS env-store repo's cans.dev.local.env](https://github.com/ca-cwds/env-store/blob/master/envs/cans/cans.dev.local.env) (the repo is private, for CWDS developers usage only).

Once you have your **.env** file next to the **docker-compose.yml** file, start up your dependency applications by running:

```docker-compose up```

Then run Rails (`rails s`) and the webpack development server (`yarn start` or `./bin/webpack-dev-server`). **OR** Run rails and webpack dev sever using single comamnd `yarn dev`, which runs the Procfile.dev with foreman, so make sure foreman utility is installed on your machine. You can quickly install foreman using `gem install foreman` at CANS root folder. Please do not include the foreman gem in the Gemfile.

## Linting and Tests

To run the React test suite with watcher:

```yarn test```

and a one-time run with coverage

```yarn test:coverage```

Other commands:

```
yarn test:rspec # runs Rspec unit tests
yarn test:acceptance # runs acceptance tests, requires app to be running
yarn test:regression # runs regression tests, requires app to be running
yarn test:a11y # runs accessibility tests, requires app to be running
yarn lint
```

# Hotfix approach
## Hotfix steps

1. Check out current hotfix branch
	* CANS: 1.0.0-hotfix
2. Fix the issue locally and create PR to сorresponding hotfix branch
3. **Important!!!** Create PR to master branch with the same fix if relevant to current functionality
3. When hotfix approved and merged into hotfix branch use one of hotfix Jenkins jobs to build new hotfix artifacts. Hotfix jobs disabled by default. Work with your Sr.Dev/Team Lead to coordinate the hotfix. In order to select correct hotfix version please use hotfix branch name plus a sequential number at the end (for example 1.0.0-hotfix1, 1.0.0-hotfix2). Use https://github.com/ca-cwds/cws-cares/blob/master/prod.yaml to identify the current version of the application in PROD.
	* CANS: [http://jenkins.dev.cwds.io:8080/view/CANS/job/cans-hotfix-build/](http://jenkins.dev.cwds.io:8080/view/CANS/job/cans-hotfix-build/)
4. When Docker image with hotfix is built and published to Docker Hub create PR for deployment to PreProd https://github.com/ca-cwds/cws-cares/blob/master/preprod.yml
5. When hotfix is tested in PreProd, create PR into https://github.com/ca-cwds/cws-cares/blob/master/prod.yaml for deployment to Prod 
 
## After the new release
1. New hotfix branches should be created for new release versions
2. Hotfix branches should be protected in GitHub similar to master
3. Hotfix pipelines in CANS should be changed to use new hotfix branches as a baseline

# Architecture

The CANS application front end has two parts Rails and React. Each part has its own libraries and design decisions which are covered in the respective sections. Rails serves the React application, proxies api calls, and stores session information using Redis. React is the front end application code that runs in the browser and makes requests to Rails for API calls. Rails is meant to be a simple proxy for API calls not a complex middle-man between the CANS API and the React application.

## Rails

[Rails](https://github.com/rails/rails) is an MVC Framework for developing web applications. Its usage in CANS is minimal because it primarily serves as session storage and a proxy for API calls. However, Rails is developed in a community with strong ties to [Test Driven Development](http://agiledata.org/essays/tdd.html) and automated testing methods which proves to be very valuable for development.

### Regression Suite
We have a set of regression tests developed to make sure that our application does not break from a user perspective when we make changes. These tests are stored in our Rails app and run as part of our pipeline during deployments. Regression tests use capybara and rspec, two of the rails dependencies mentioned in the following section, and use Site Prism as part of a page object model approach for testing.

### Primary Dependencies
* [sass-rails](https://github.com/rails/sass-rails) for scss stylesheets
* [rails webpacker](https://github.com/rails/webpacker) for compiling the React application
* [capybara](https://github.com/teamcapybara/capybara) for integration/feature testing the application as a real user would use it
* [rspec rails](https://github.com/rspec/rspec-rails) for running tests in a Test Driven Development fashion
* [selenium-webdriver](https://www.seleniumhq.org/projects/webdriver/) a driver for Capybara to interact with the browser
* [site prism](https://github.com/natritmeyer/site_prism) to define page objects for testing

## React

The React part of CANS is JavaScript written in [ES6](http://es6-features.org/#Constants) and [JSX](https://reactjs.org/docs/introducing-jsx.html) as a [React](https://reactjs.org/) application

### Primary Dependencies
* [React](https://reactjs.org/) a library for developing web applications
* [component library](https://github.com/ca-cwds/design-system) a library for CWDS components used accross all CWDS services
* [material UI](https://material-ui.com/) for custom components outside the component library (assessment form)
* [react-strap](https://reactstrap.github.io/) for custom components built with bootstrap 4
* [downshift](https://github.com/downshift-js/downshift) for React-based autocomplete components
* [recharts](https://github.com/recharts/recharts) for React-based chart components
* [axios](https://github.com/axios/axios) a web client for making API calls
* [babel](https://babeljs.io/) for transpiling ES6 and JSX into JavaScript
* [webpack](https://webpack.js.org/) for packaging all assets into packs
* [eslint](https://eslint.org/) a utility for checking that code follows cleanliness standards
* [jest](https://jestjs.io/) a test framework for unit tests

### Loading Boundaries

Loading boundaries are components meant to load a particular resource by API call, and display a spinner or other details until the result is successfully returned and displayed. They pass certain props to their children to communicate the status of the call and handle errors.

### Redux

The CANS development team made a conscious decision *not* to use [Redux](https://redux.js.org/) because there was little need for it. Redux is most useful for global state or shared state that would otherwise become too difficult to maintain. There proved not to be much need for a complex architecture with Redux because the application design was fairly simple, modular, and multi-paged. Loading Boundaries proved to be a good mechanism for wrapping API calls and sharing responses with child components, so there was no need to store API responses with Redux either.

There are or were other CWDS projects that used Redux, so it is worth calling out that Redux is *not* used in CANS.

## Deployments

deployments are done using [Docker](https://www.docker.com/) images. Docker can bring up a fresh environment in a straightforward manner using images as a starting point. It also documents changes to images since those images are maintained through docker files in this repository. There exists docker files for testing, and deployment.

# Questions

If you have any questions regarding the contents of this repository, please email the Office of Systems Integration at FOSS@osi.ca.gov.
