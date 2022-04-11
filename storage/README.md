# Storage Quickstart

## Introduction

![image](https://user-images.githubusercontent.com/2467354/161280951-49bbe79d-ad6d-4262-87fd-1e6e79ece3d8.png)

This quickstart demonstrates how to upload a file via a simple HTML multi-part form: [upload-form.html](upload-form.html)

![image](https://user-images.githubusercontent.com/2467354/161281549-0c015270-574d-4ecc-84d4-4cc337be62dc.png)

The upload form will submit an HTTP `POST` to an `/upload` endpoint which receives a file upload using the [`express-fileupload`](https://github.com/richardgirges/express-fileupload), an  Express framework middleware that provides you with an easy way to handle file uploads. Once uploaded, we'll store the file within a hyper storage service using the [hyper connect](https://docs.hyper.io/hyper-connect) SDK.

```js
// ... some code omitted for brevity ...
import { connect } from 'hyper-connect'
import fileUpload from 'express-fileupload'

const hyper = connect(process.env.HYPER)
const app = express()

app.use(fileUpload())

app.post('/upload', async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }

  const file = req.files.myFile
  const uploadResult = await hyper.storage.upload(file.name, file.data)
  console.log('POST /upload', { uploadResult })
  res.redirect('/')
})
```

Once a file has been uploaded to hyper storage, you can download it from hyper storage and view it in the browser with the [download-form.html](download-form.html):

![image](https://user-images.githubusercontent.com/2467354/161284313-ad9626e0-9b80-432f-9dd5-00b3542ac103.png)

The download form submits a `POST` to the `/download` endpoint where the file is downloaded from hyper storage and sent to the HTTP response.  `hyper.storage.download` returns a promise of a _readable_ stream which is piped to the Express response object which itself is a _writable_ stream. 


```js
app.post('/download', async (req, res) => {
  if (!req.body.filename) {
    return res.status(400).send('No file name found.')
  }

  console.log(`Attempting to download ${req.body.filename}`)
  const filename = req.body.filename

  const streamPipeline = promisify(pipeline)
  // download file and stream to response
  await streamPipeline(await hyper.storage.download(filename), res)
})
```

The result is the file streamed and displayed in the browser:

![image](https://user-images.githubusercontent.com/2467354/161286483-f5d507e2-5dae-4845-af8f-f5df34f5bb92.png)

> Be sure to checkout our [workshops](https://github.com/hyper63/workshops-expressjs) for a guided tour of common use cases. 

## Prerequisites

Here's what you need to know:

- HTTP/JSON APIs
- Javascript, promises, and streams
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
    yarn
    yarn start
    ```

- The API should be running on port 3003.  Run the following curl command in your terminal to verify the API started successfully:

    ```sh
    curl localhost:3003/
    ```

    You should see a webpage with upload and download options:
    
    ![image](https://user-images.githubusercontent.com/2467354/161280951-49bbe79d-ad6d-4262-87fd-1e6e79ece3d8.png)
    
    

