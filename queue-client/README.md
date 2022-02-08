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

This quickstart involves two separate APIs:  the **queue-client** folder contains the 'queue client API' that will send (enqueue) a message to hyper queue.  Once the hyper queue service receives a message, it will perform an HTTP POST to the configured queue target API. The **queue-target** folder contains the 'queue target API'.

> The queue target API must be publically addressable.  We recommend using GitPod for this quickstart as it will enable you to run the target API publically. 

your client --> queue-client API --> hyper-connect.queue.enqueue --> hyper queue  --> queue-target API --> your client

### Setup Part 1: Setting a hyper app connection string to the **queue-client** API.

You'll need a hyper cloud app and app key for your queue-client API who's job will be to accept a HTTP request and then send (enqueue) a message to hyper queue. 

- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application). You'll have to choose at least one service, so select the hyper Data service and then create the hyper app.  

  > We'll add a queue service to the hyper app later, after we know the queue target API public URL address.

- Create a **.env** file within the **queue-client** directory.
- Within the **.env** file, create an environment variable named `HYPER`. 
- Copy the app key's [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from the newly created hyper cloud application and paste it for the value of the `HYPER` environment variable:

    ```
    HYPER=[connection string here]
    ```

- Within the terminal, ensure you are in the **queue-client** directory.
- Install dependencies 

    ```sh
    yarn
    ```

### Setup Part 2: Setting up the **queue-target** API

## Setup: Adding a queue service instance to your hyper app

- Once the hyper app has been provisioned, open the hyper app, select the **Queue** tab, and [create a queue service](https://docs.hyper.io/cloud/adding-a-queue-service).  Provide the following values in the **Add Queue Service** form:
  - Service Name: default
  - Target URL: The publically available URL to your target API service.

## Start Up

- Within the terminal, ensure you are in the **queue-client** directory.
- start the API:

    ```sh
    yarn start
    ```

- The API should be running on port 3001.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3001/
    ```

    You should see a response like this:

    ```sh
    {
        "name": "Quickstart Node Express JS Queue",
        "ok": true
    }
    ```

- If you are using GitPod you should be able to click Remote Explorer within your IDE, select the 3001 port and make it public.  Since the API is now publically addressable,  you can hit the API using a web browser that will be similar to something like this:  https://3001-hyper63-quickstartsexpr-e9zu4mkjvq9.ws-us30.gitpod.io/.  Your URL will be different for your specific GitPod environment.

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