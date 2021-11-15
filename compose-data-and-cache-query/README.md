# Compose Data and Cache Query Quickstart

## Introduction

In this quickstart, you will find a REST API built with expressjs and hyper cloud that builds on the previous [compose-data-and-cache-stats](../compose-data-and-cache-stats) quickstart.  Everytime you add/remove a book document to the database, we will add/remove a cache entry to support a 'get books by author' query.  As a query is made to our expressjs REST API via `GET /api/books/_query` we will check for a `author` query string: example:  `GET /api/books/_query?author=Richard%20Adams`.  If the `author` query string exists then we will query the cache service for all books by the specified author.  If no results are found in the cache, we will fall back to querying the database.  This makes your API performant while keeping demand off your transactional data store. It's yet another classic win for the hyper cache service. 

## Need Help?

Be sure to checkout our [workshops](https://github.com/hyper63/workshops-expressjs) for a step-by-step videos that provide a hands-on, guided tour of these common use cases. 

## Prerequisites

Here's what you need to know:

- HTTP/JSON APIs
- Javascript and Promises
- ExpressJS - NodeJS (https://nodejs.org)
- git/github
- curl

## What you will learn

Learn how to:

- Compose hyper cloud's data and cache backend services with the [Data API](https://docs.hyper.io/cloud/data-api) and [Cache API](https://docs.hyper.io/cloud/cache-api) and [hyper-connect](https://docs.hyper.io/cloud/hyper-connect) SDK 
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application).
- Obtain a [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from your [app key](https://docs.hyper.io/cloud/app-keys).
- Set up the `HYPER` environment variable for `hyper-connect`.

## Setup


- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- If you haven't done so already, [create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application)
- Create a **.env** file within the **compose-data-and-cache-query** directory.
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and place it in the **.env** file

    ```
    HYPER=[connection string here]
    ```

- Within the terminal, ensure you are in the **compose-data-and-cache-query** directory.
- Install dependencies 

    ```sh
    npm install
    ```

## Start Up

- Within the terminal, ensure you are in the **compose-data-and-cache-query** directory.
- start the API:

    ```sh
    npm start
    ```

- The API should be running on port 3000.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3000/
    ```

    You should see a response like this:

    ```sh
    { "name": "Quickstart Node Express JS Cache Query for the Win!", "ok": true }
    ```

## Create some books

Using curl, make several calls to the `POST /api/books` endpoint to create some books

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-1","type":"book", "name":"War and Peace","author":"Leo Tolstoy","published":"1869" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-2","type":"book","name":"The Great Gatsby","author":"F. Scott Fitzgerald","published":"1925" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id": "book-3", "type": "book", "name": "Dune", "author": "Frank Herbert", "published": "1965" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-4","type":"book","name":"Cold Mountain","author":"Charles Frazier","published":"1998" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-5","type":"book","name":"A Separate Peace","author":"John Knowles","published":"1965" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-6","type":"book","name":"Watership Down","author":"Richard Adams","published":"1972" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-7","type":"book","name":"The Hunt for Red October","author":"Tom Clancy","published":"1984" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-8","type":"book","name":"Patriot Games","author":"Tom Clancy","published":"1987" }'
```

```sh
curl -X POST localhost:3000/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-9","type":"book","name":"Clear and Present Danger","author":"Tom Clancy","published":"1989" }'
```

## Query Books

```sh
curl localhost:3000/api/books/_query
```

Query with `limit` query parameter.

```sh
curl localhost:3000/api/books/_query?limit=5
```

Query with `author`  query parameter.

```sh
curl localhost:3000/api/books/_query?author=Richard%20Adams
```

Query with `author` and `limit` query parameters.

```sh
curl localhost:3000/api/books/_query?author=Richard%20Adams&limit=10
```

## Get book stats 

Make a call to the `GET /api/books/stats` endpoint to retrieve the book stats including the `bookCount`:

```sh
curl localhost:3000/api/books/stats
```

## Get a book

Make a call to the `GET /api/books/book-3` endpoint to retrieve a book:

```sh
curl localhost:3000/api/books/book-3 
```

## Update a book

Make a call to the `PUT /api/books/book-4` endpoint to update the `published` date to `1997`:

```sh
curl -X PUT localhost:3000/api/books/book-4 \ 
-H 'Content-Type: application/json' \
-d '{ "id":"book-4","type":"book","name":"Cold Mountain","author":"Charles Frazier","published":"1997" }'
```

## Delete a book

Make a call to the `DELETE /api/books/book-4` endpoint to delete a book:

```sh
curl -X DELETE localhost:3000/api/books/book-4
