# Commit History API

## Description

API built with [Nest](https://github.com/nestjs/nest) framework that lists commits for this repository.
It uses the GitHub API to fetch the data and exposes it through a RESTful endpoint. The project is deployed on Render at https://api-commit-history.onrender.com.

## Environment Variables

It is important to configure required environment variables in a '.env' file in order to run the project,
here is an example with all the required env variables

| **.env** |
| --- | 
```
GITHUB_BASE_URL='https://api.github.com'
GITHUB_USERNAME='github_username'

```

| variable | description |
| --- | --- | 
| GITHUB_BASE_URL | Github base url to connect the API |
| GITHUB_USERNAME | Github username, it is intended to only retrieve commmits for this project and this username |



## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Local URL
The app runs by default on port 3000.

https://localhost:3000

## Deployed URL

https://api-commit-history.onrender.com


## Swagger Documentation
The api is documented following the openapi standard using Swagger,
if you open the local or deployed url, and append **'/api'** (for example: https://localhost:3000/api) at the end, you will see the api documentation


## Endpoint

| endpoint | method | description| response OK|
| --- | --- | --- | --- |
| /commits?repository=backend | GET | Retrieves a list of all commits to the specified repository for this test (default: backend) | ``` Array<Commit> ```


The query param "repository" has two options: "backend" and "frontend".

## Entities
There is one main entity in this project, 'Commit'
 \
 \
**Commit** refers to the commit object made to the repository
```bash
Commit {
  sha: string,
  message: string,
  commitUrl: string,
  date: Date,
  author: Author,
}
```
 \
 **Author** refers to the object containing information about the author of the commit
 
 ```bash
Author {
	id: number,
	login: string,
	name: string,
	email: string,
	avatar: string,
}
```

## Docker Image

 If you want to run this app only using the image generated from Dockerfile, check the dockerhub image
 [here](https://hub.docker.com/repository/docker/carlosempd/gh-test-backend/general).

 It has the documentation to mount this image in a container and run it.
As you will see, in this case you will only need two files to run the app:
- **.env**
- **docker-compose.yaml**

Or simply running `docker container run ...` as specified in the overview of the image (https://hub.docker.com/repository/docker/carlosempd/gh-test-backend/general). 
