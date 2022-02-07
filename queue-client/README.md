# Queue Quickstart

## Introduction

The hyper Queue service provides the ability to perform background processing without having to manage your own queue servers. It works great for server-less implementations that need to offload short-lived processes to prevent slow-running transactions for the client application.

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

- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application).
- Create a new queue instance named "default" within our hyper cloud application.
- Obtain a [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from your [app key](https://docs.hyper.io/cloud/app-keys).
- Use Express middleware to verify the incoming target request from hyper queue

## Setup

This quickstart involves two separate APIs:  the **queue-client** folder contains the 'queue client API' that will call hyper queue.  Once the hyper queue service receives a message, it will perform an HTTP POST to the configured queue target API. The **queue-target** folder contains the 'queue target API'.

your client --> queue-client API --> hyper-connect.queue.enqueue --> hyper queue  --> queue-target API --> your client


- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application). You'll have to choose at least one service, so select the hyper Data service and then create the hyper app.
- Once the hyper app has been provisioned, open the hyper app, select the **Queue** tab, and [create a queue service](https://docs.hyper.io/cloud/adding-a-queue-service).  Provide the following values in the **Add Queue Service** form:
  - Service Name: default
  - Target URL: The publically available URL to your target API service.
- Create a **.env** file within the **queue-client** directory.
- Within the **.env** file, create an environment variable named `HYPER`. 
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and paste it for the value of the `HYPER` environment variable
    ```
    HYPER=[connection string here]
    ```

- [Add a search service](https://docs.hyper.io/cloud/adding-a-search-service) and provide the following details within the **Add Search Service** form.  This will create a search service instance named `default` and create an index based on the `author` field.  This way we can search for books by author.  

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
curl localhost:3001/api/books/book-3 
```

## Update a book

Make a call to the `PUT /api/books/book-3` endpoint to update the `published` date to `1997`:

```sh
curl -X PUT localhost:3001/api/books/book-3 \
-H 'Content-Type: application/json' \
-d '{ "id": "book-3", "type": "book", "name": "Dune", "author": "Frank Herbert", "published": "1997" }'
```

## Delete a book

Make a call to the `DELETE /api/books/book-3` endpoint to delete a book:

```sh
curl -X DELETE localhost:3001/api/books/book-3
```