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

## Populating the Data Service with Movies and Actors


### Adding Movie Documents

```sh
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-1", "title": "Ghostbusters", "type": "movie", "year": "1984"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-2", "title": "Top Gun", "type": "movie", "year": "1986"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-3", "title": "Footloose", "type": "movie", "year": "1986"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-4", "title": "Stripes", "type": "movie", "year": "1981"}'

curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-5", "title": "Meatballs", "type": "movie", "year": "1979"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-6", "title": "Matrix", "type": "movie", "year": "1999"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-7", "title": "Usual Suspects", "type": "movie", "year": "1995"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-8", "title": "Super Troopers", "type": "movie", "year": "2001"}'

curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{ "id": "movie-11","title": "Step Brothers","type": "movie","year": "2008"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-13","title": "Inception","type": "movie","year": "2010"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "movie-14","title": "Stir Crazy","type": "movie","year": "1980"}'
```

### Adding Actor Documents

```sh
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-bill-murray", "name": "Bill Murray", "type": "actor", "born": "1950"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-tom-cruise", "name": "Tom Cruise", "type": "actor", "born": "1962"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-kevin-bacon", "name": "Kevin Bacon", "type": "actor", "born": "1958"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-keanu-reeves", "name": "Keanu Reeves", "type": "actor", "born": "1964"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-kevin-spacey", "name": "Kevin Spacey", "type": "actor", "born": "1959"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-gene-wilder", "name": "Gene Wilder", "type": "actor", "born": "1933"}'
curl -X POST localhost:3000/api/data -H 'Content-Type: application/json' -d '{"id": "actor-leonardo-dicaprio", "name": "Leonardo Dicaprio", "type": "actor", "born": "1974"}'
```

### List/Paging Documents

- List all docs

    ```sh
    curl localhost:3000/api/data
    ```

- Page 1 (2 docs per page)

    ```sh
    curl localhost:3000/api/data?limit=2 
    ```

- Page 2 (2 docs per page)

    ```sh
    curl localhost:3000/api/data?limit=2&startkey=movie-3
    ```

- Page 3 (2 docs per page)

    ```sh
    curl localhost:3000/api/data?limit=2&startkey=movie-5
    ```
ç
### Querying Documents

```sh
curl localhost:3000/api/data/_query?type=movie
curl localhost:3000/api/data/_query?title=Top%20Gun

curl localhost:3000/api/data/_query? TODO

```

## Populating the Cache Service with Movies and Actors

Since each cached item is specific to the needs of your application, there's not a good way to do this with the hyper-vision-api.  Therefore, let's manually add some sample cache items directly through the hyper REST api. Your cache items will vary to accommodate your app's requirements.  

### Add Movies into the cache default service

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "movie-1-1984", "value": {"id": "movie-1", "title": "Ghostbusters"}, "ttl":"10d"}'
```

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "movie-2-1986", "value": {"id": "movie-2", "title": "Top Gun"}, "ttl":"10d"}'
```

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "movie-3-1986", "value": {"id": "movie-3", "title": "Footloose"}, "ttl":"10d"}'
```

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "movie-4-1981", "value": {"id": "movie-4", "title": "Stripes"}, "ttl":"10d"}'
```

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "movie-8-2001", "value": {"id": "movie-8", "title": "Super Troopers"}, "ttl":"10d"}'
```

### Add Actors into the cache default service

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "actor-bill-murray-1950", "value": {"id": "actor-bill-murray", "name": "Bill Murray", "born": "1950"}}'
```


```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "actor-tom-cruise-1962", "value": {"id": "actor-tom-cruise", "name": "Tom Cruise", "born": "1962"}}'
```

```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "actor-kevin-bacon-1958", "value": {"id": "actor-kevin-bacon", "name": "Kevin Bacon", "born": "1958"}}'
```
@@@
```sh
curl -X POST https://cloud.hyper.io/app-lightseagreen-lightning/cache/default \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZodXhyYXVnZnplaWZvZ2dhbWcyZnlrbHliMzE1MyIsImlhdCI6MTYzODI4MDEwN30.QAebFgPCfirvWWM1Dbx0ZJrRUwMxTmJhU5c3Og3LSs0' \
-d '{"key": "actor-keanu-reeves-1964", "value": {"id": "actor-keanu-reeves", "name": "Keanu Reeves", "born": "1964"}}'
```
