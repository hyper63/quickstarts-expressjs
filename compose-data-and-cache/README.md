# Compose Data and Cache Quickstart

## Introduction

In this quickstart, you will find a REST API built with expressjs and hyper cloud.  This API let's you add, update, get, and delete books from hyper's data and cache services.   When you add a book, the API will store the book into a hyper database and cache the book.  When you retrieve a book, the API will first check to see if the book resides in cache, and if so, retrieves the book from the cache rather than the database.  This makes your API performant while keeping demand off your transactional data store.  Win-win!

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
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application)
- Create a **.env** file within the **compose-data-and-cache** directory.
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and place it in the **.env** file

    ```
    HYPER=[connection string here]
    ```
- Within the terminal, ensure you are in the **compose-data-and-cache** directory.
- Install dependencies 

    ```sh
    npm install
    ```

## Start Up

- Within the terminal, ensure you are in the **compose-data-and-cache** directory.
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
    {"name":"Quickstart Node Express JS Cache","ok":true}
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


