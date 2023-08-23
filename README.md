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
GITHUB_ACCESS_TOKEN='your_github_access_token'

```

| variable | description |
| --- | --- | 
| GITHUB_BASE_URL | Github base url to connect the API |
| GITHUB_USERNAME | Github username, it is intended to only retrieve commmits for this project and this username |
| GITHUB_ACCESS_TOKEN | Access token configured on your Github account |



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