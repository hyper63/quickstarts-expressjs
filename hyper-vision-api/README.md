# Hyper Vision

## Introduction

In this quickstart, you will find a REST API built with expressjs and hyper cloud.  This API let's you view entries within each hyper service (data, cache, search, etc.).  


## Need Help?

Be sure to checkout our [workshops](https://github.com/hyper63/workshops-expressjs) for a guided tour of common use cases. 

## Prerequisites

Here's what you need to know:

- HTTP/JSON APIs
- Javascript and Promises
- ExpressJS - NodeJS (https://nodejs.org)
- git/github
- curl

## What you will learn

Learn how to:

- Get and List data from [Data API](https://docs.hyper.io/cloud/data-api), [Search API](https://docs.hyper.io/cloud/search-api), [Cache API](https://docs.hyper.io/cloud/cache-api) and the [hyper-connect](https://docs.hyper.io/cloud/hyper-connect) SDK 
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application).
- Create a new search instance named "default" within our hyper cloud application.
- Obtain a [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from your [app key](https://docs.hyper.io/cloud/app-keys).
- Set up the `HYPER` environment variable for `hyper-connect`.

## Setup

- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application)
- Create a **.env** file within the **hyper-vision** directory.
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and place it in the **.env** file

    ```
    HYPER=[connection string here]
    ```

- Within the terminal, ensure you are in the **hyper-vision** directory.
- Install dependencies 

    ```sh
    npm install
    ```

## Start Up

- Within the terminal, ensure you are in the **hyper-vision** directory.
- start the API:

    ```sh
    npm start
    ```

- The API should be running on port 3333.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3333/
    ```

    You should see a response like this:

    ```sh
    {"name":"Hyper Vision API","ok":true}
    ```

## Sample Data Curl Commands


### Adding Documents
```sh
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-1", "title": "Ghostbusters", "type": "movie", "year": "1984"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-2", "title": "Top Gun", "type": "movie", "year": "1986"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-3", "title": "Footloose", "type": "movie", "year": "1986"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-4", "title": "Stripes", "type": "movie", "year": "1981"}'

curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-5", "title": "Meatballs", "type": "movie", "year": "1979"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-6", "title": "Matrix", "type": "movie", "year": "1999"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-7", "title": "Usual Suspects", "type": "movie", "year": "1995"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-8", "title": "Super Troopers", "type": "movie", "year": "2001"}'

```

### Querying Documents

```sh
curl localhost:3000/api/data/_query?type=movie
curl localhost:3000/api/data/_query?title=Top%20Gun
curl localhost:3000/api/data/_query?year=1981
curl localhost:3000/api/data/_query?year=$lt|1999
curl localhost:3000/api/data/_query?year=$lt|1999&type=movie
curl localhost:3000/api/data/_query?year=$gt|1999&type=movie
```