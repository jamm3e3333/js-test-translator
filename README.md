# English translator web application
I built the application with node.js/express.js and with the handlerbars template because it was the quickest for me.
After testing the app I ran it first as a docker container on my local machine then I deployed it on digital ocean on a virtual Linux machine unit as a docker container so it's accesible on the internet for everyone without running any commands. 
The app is available here: http://159.65.220.42:3030.

The code can be clonded and accessed here on this link: https://github.com/jamm3e3333/js-test-translator. 

After cloning the repo, run this command:

### `npm install`

To run the application locally on the local machine use this command:

### `npm run dev`
or
### `npm run start`

Or it's possible to run it as a docker container with docker compose:
### `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

The application is divided into backend and frontend. Both backend and frontend runs on node.js.
## Backend

Backend is built with express.js.
There are three endpoints.
When you run the code locally, the url parameter is `localhost:3030`.

Endpoints:

1. POST `{{url}}/send/data`
- REQUEST
```
body:
{
    text: <text to be translated:String>,
    target_ln: <target language:String>
}
```
- In the request in the body object two properties of type string are specified: the text that will be translated and the target language.
- When the request is sent from the client to this endpoint the function `translate` is executed and will send the request to the DeepL API with the specified parameters. The function will then return a response from the server, which is sent back to the client. 

2. GET `{{url}}/`
- When the request is sent to this endpoint, the whole frontend app is served to the client.

3. GET `{{url}}*`
- In case the client will try to add some parameters within the `GET` method, the server will return the 404 - page not found.

## Frontend
Frontend runs on node.js too. It's created with simple JS/html/css and hbs templates.

On the html, page there's a textarea element where the text is written for translation. 

Under the textarea element there's a submit button. When the button is clicked, it will send a post request using fetch. The body of the post request contains of object where the text and target language are specified and are then used to send a request to the DeepL API. 

When the response is obtained, then it will insert the data accordingly into the div element. 