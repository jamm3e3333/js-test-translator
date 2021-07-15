# English translator web application
I decided to build the application with node.js/express.js and handlerbars template.
I ran it first as a docker container on my local machine then I deployed it on digital ocean on a virtual linux machine unit as a docker container so it's accesible on the internet for everyone without running any commands. 
The app is available here: http://159.65.220.42:3030.

The code is accesible here on this link: https://github.com/jamm3e3333/js-test-translator. 

After cloning the repo run this command:

`npm install`

To run the application locally on the local machine use this command:

`npm run dev`
or
`npm run start`

Or it's possible to run it as a docker container with docker compose:
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

The application is divided into backend and frontend. Both backend and frontend runs on node.js.
## Backend

Backend is built with express.js.
There are three endpoints:
When you run the code locally then the url parameter is `localhost:3030`.

1. POST `{{url}}/send/data`
- body:
```
{
    text: <text to be translated>,
    target_ln: <target language>
}
```
- in the body of request 2 properties must be specified: the text that will be translated and the target language
- when the request is sent to this endpoint the function `translate` is executed and will send the request ot hte DEPL API with the specified parameters. The function will then return a response from the server, which is sent to the client. 

2. GET `{{url}}/`
- sending the request to this endpoint the whole frontend app is sent to the client 

3. GET `{{url}}*`
- whatever parameters are specified within the url and the get method the response is 404 page

## Frontend
Frontend runs on node.js too. It's created with simple JS/html/css and hbs templates.

On the html page there's a text area where the text is written for translation. 

Under the textarea there's a submit button. When the button is clicked it will send a post request using fetch. The body of the request contains of object where the text and target language are specified. 

When the response is obtained then it will put the data accordingly into the div element. 