# Compose Data and Search Quickstart

## Introduction

In this quickstart, you will find a REST API built with expressjs and hyper cloud.  This API let's you add, update, get, and delete books from hyper's data service and search service.  As part of this quickstart, we will configure a search service instances that supports searching books by author.  As a search is made to our expressjs REST API via `GET api/books/_search` we will check for a `author` query string: example: `GET api/books/_search?author=Frank%20Herbert`.


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

- Compose hyper cloud's data and search backend services with the [Data API](https://docs.hyper.io/cloud/data-api) and [Search API](https://docs.hyper.io/cloud/search-api) and the[hyper-connect](https://docs.hyper.io/cloud/hyper-connect) SDK 
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application).
- Create a new search instance named "default" within our hyper cloud application.
- Obtain a [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from your [app key](https://docs.hyper.io/cloud/app-keys).
- Set up the `HYPER` environment variable for `hyper-connect`.

## Setup

- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application)
- Create a **.env** file within the **compose-data-and-search** directory.
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and place it in the **.env** file

    ```
    HYPER=[connection string here]
    ```
- [Add a search service](https://docs.hyper.io/cloud/adding-a-search-service) and provide the following details within the **Add Search Service** add form.  This will create a search service instance named `default` and create an index based on the `author` field.  This way we can search for books by author.  Search results will return the `id`, `name`, and `published` fields.

    | Field           | Value               |
    |-----------------|---------------------|
    | Service Name    | default             |
    | Fields to index | author              |
    | Fields to store | id, name, published |

- Within the terminal, ensure you are in the **compose-data-and-search** directory.
- Install dependencies 

    ```sh
    npm install
    ```

## Start Up

- Within the terminal, ensure you are in the **compose-data-and-search** directory.
- start the API:

    ```sh
    npm start
    ```
- The API should be running on port 3001.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3001/
    ```

    You should see a response like this:

    ```sh
    {"name":"Quickstart Node Express JS Compose Data and Search","ok":true}
    ```

## Create some books

Using curl, make several calls to the `POST /api/books` endpoint to create some books.  Three books are from Frank Herber, author of the Dune series.  The last book is from Dr. Suess.


```sh
curl -X POST localhost:3001/api/books \
-H 'Content-Type: application/json' \
-d '{ "id": "book-3", "type": "book", "name": "Dune", "author": "Frank Herbert", "published": "1965" }'
```

```sh
curl -X POST localhost:3001/api/books \
-H 'Content-Type: application/json' \
-d '{ "id": "book-20", "type": "book", "name": "Children of Dune", "author": "Frank Herbert", "published": "1975" }'
```

```sh
curl -X POST localhost:3001/api/books \
-H 'Content-Type: application/json' \
-d '{ "id": "book-21", "type": "book", "name": "Dune Messiah", "author": "Frank Herbert", "published": "1969" }'
```

```sh
curl -X POST localhost:3001/api/books \
-H 'Content-Type: application/json' \
-d '{ "id":"book-22","type":"book","name":"Horton Hears a Who!","author":"Dr. Suess","published":"1955" }'
```

## Search Books

As books are added into the database, entries are made in the search service.  Make a call to retreive books by author from service service.

```sh
curl localhost:3001/api/books/_search?author=Frank%20Herbert 
```

## Get a book

Make a call to the `GET /api/books/book-3` endpoint to retrieve a book:

```sh
curl localhost:3000/api/books/book-3 
```

## Update a book

Make a call to the `PUT /api/books/book-3` endpoint to update the `published` date to `1997`:

```sh
curl -X PUT localhost:3000/api/books/book-3 \ 
-H 'Content-Type: application/json' \
-d '{ "id": "book-3", "type": "book", "name": "Dune", "author": "Frank Herbert", "published": "1997" }'
```

## Delete a book

Make a call to the `DELETE /api/books/book-3` endpoint to delete a book:

```sh
curl -X DELETE localhost:3000/api/books/book-3
