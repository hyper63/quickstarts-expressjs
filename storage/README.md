# Storage Quickstart

## Introduction





In this quickstart you'll receive a file upload using `express-fileupload` library.  The `express-fileupload` library is a middleware for the Express framework that provides you with an easy way to handle file upload using the Express framework. Once we have the file uploaded into our API, we'll store in within a hyper storage service using the hyper connect SDK.

## Need Help?

Be sure to checkout our [workshops](https://github.com/hyper63/workshops-expressjs) for a guided tour of common use cases. 

## Prerequisites

Here's what you need to know:

- HTTP/JSON APIs
- Javascript and Promises
- ExpressJS - NodeJS (https://nodejs.org)
- git/github


## What you will learn

Learn how to:

- Use the [Storage API](https://docs.hyper.io/cloud/storage-api) with the [hyper-connect](https://docs.hyper.io/cloud/hyper-connect) SDK 
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application) with a storage service.
- Obtain a [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) from your [app key](https://docs.hyper.io/cloud/app-keys).
- Set up the `HYPER` environment variable for `hyper-connect`.

## Setup

- Go to [https://dashboard.hyper.io](https://dashboard.hyper.io) and sign in with your github account.
- [Create a hyper cloud application](https://docs.hyper.io/cloud/applications#zl-creating-a-new-hyper-application)
- Create a **.env** file within the **storage** directory.
- Copy the [connection string](https://docs.hyper.io/cloud/app-keys#6s-copying-the-key-secret-and-connection-string) and place it in the **.env** file

    ```
    HYPER=[connection string here]
    ```

- Within the terminal, ensure you are in the **storage** directory.
- Install dependencies and start the app

    ```sh
    npm install
    npm start
    ```

- The API should be running on port 3003.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3003/
    ```

    You should see an html form:

    

## Store some files

Using the html form, select some files and click the **Submit** button. 


