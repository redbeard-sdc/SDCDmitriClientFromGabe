# RickAdvisor Server Optimization.

> "Reviews" Component legacy front end which was optimized for backend.
> The end result is the backend could handle 500 requests per second stable
> and handle momentary spikes of 1000 requests per second. 


## Table of Contents

1. [Usage](#Usage)
2. [Technologies](#Technologies)
3. [Requirements](#Requirements)
4. [Install] (#Install)
5. [License] (#License)

## Usage

> Some usage instructions

## Technologies
- Express 
- Artillery (launching requests)
- New Relic (testing server performance)
- Postgres
- Dynamodb
- CouchDB
- 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.15.3
- docker-compose 3


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
dockerize the code with docker run docker.
put the component in AWS ECR
make a instance RDS postgres database.
make a redis elasticache instance.
make an ecs task definition with the container. Have the database and redis caches as enviroment variables.
make a cluster with the previously made task definition and make n instances depending on horozontal scaling needs
(used a t2 micro server)
go to ecs instances and use the link to access the server

to stress test the service
npm install -g artillary
go to the awstest.yml and change the uri link to the one in the ecs instance.
```

## License
refer to this [License](https://github.com/redbeard-sdc/SDCDmitriClientFromGabe/LICENSE.md)
