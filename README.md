# sfmc-custom-activity
This repo is still under development. 
## Goals:
* Create a production level template for node + expressjs + pug + mongodb.
* Create a production level template for creating custom activities for Salesforce Marketing Cloud (SFMC).
* The architecture should be: Portable, Decomposable, Extensible, and Maintainable.
## What is missing to be production ready (Work in progress)
* Right integration for steps in the SFMC activity, so it's not running standalone (connection.trigger('nextStep') not working, need more analysis).
* Error and logging management (Need to test libraries).
* Preview of the web push notification in the second step of the activity.
* Save the selected countries and the configured push message in mongodb in the third step.
* Review Security of the application. Basic JWT implemented.
* Auto bundling and minifying for images, css and js (Need to test libraries).
* Need to add comment blocks around all the code.
* Quality checks of the pipeline in Github and Heroku.
* Unit testing and automated postman tests for the endpoints.
* Cleanup deprecated code.
## About Key points of the challenge
* I wouldn't work with jquery as the interactions don't require a complex level. A custom library using HMLT5 would be easier to have and will get you better performance results.
* I wouldn't work with require.js yet, it's a good library, but would like to try top players as Webpack. (Need to test libraries).
* To run it locally read the getting started guide.
* Time invested: more than 15h.
## Considerations
* I've started from zero knowledge in Docker, VS code for Docker, Node, Mongodb and its modules.
* I've started from zero knowledge in SFMC and custom activities.
* I've started from zero knowledge in Heroku.
* I've done a basic setup of the folders organization and it's interactions between folders and modules.
* I've implemented a maintanable solution based in other languages and some best practices found while reasearching.
* I've read documentation of all of it and tested in different levels.
## Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. This guide assume you have already setup all the tools listed in the Prerequisites.
### Prerequisites
* [Docker](https://www.docker.com/) For packaging the application and its dependencies in a virtual container that can be portable and has the basic setup and configuration of node.
* [VS Code](https://code.visualstudio.com/) IDE with important extensions to work with docker and node remotely. Follow the [guide: Developing inside a container](https://code.visualstudio.com/docs/remote/containers) for set up the development environment.
* [Heroku](https://www.heroku.com/) Account for deploying and automating the CI/CD process, also to setup the database with mongodb. Follow this [guide: Install mLab MongoDB](https://dashboard.heroku.com/provision-addon?addonServiceId=3dfb031f-23f4-4123-856f-5cb95ecdadc9&planId=8e6163ec-a935-4738-a0f4-60867f4f86cb) to have it setup once you have created an application inside the heroku dashboard.
* [OneSignal](https://onesignal.com/) Account for testing the web push notifications integration.
* [Github](https://github.com/) Account for cloning/fork the repository and contribute.
* [Git](https://git-scm.com/) For version control.
### Installing
Clone the repository, setup your own Github repo and follow this [guide](https://stackoverflow.com/questions/5181845/git-push-existing-repo-to-a-new-and-different-remote-repo-server) to push changes to a new remote repository of your own, then you can create pull-request to push commits to mine.
```
git clone https://github.com/Forcebits/sfmc-custom-activity.git
```
Open it as a workspace with VSCode and then attached to a remote container using the command:
```
>Remote-containers: Open Folder in Container...
```
This will automatically read the .devcontainer folder, the it will install and initialize the container. Do not run the 'npm start' command yet until you have configured your .env file. This is just an example and should be filled with your own data.
```
.env file
PORT=3000 -> can be changed
DB_COLLECTION=CustomActivityCollection
DB_NOTIFICATION_DOC=Notification
SFMC_APP_ID=<SFMC App ID>
SFMC_APP_SECRET_KEY=<SFMC App Secret>
PRO_MONGODB=<Production mongo instance URL>
PRE_MONGODB=<Pre-production mongo instance URL>
MONGODB_URI=  ->leave this empty, it's for heroku. In heroku PRO_MONGODB and PRE_MONGODB don't exist.
DOMAIN=<heroku app url>
ACTIVITY_NAME=Web Push Notifications
ACTIVITY_URI=WebPushNotifications
ACTIVITY_FLOW_NAME=Send Web push notification
ACTIVITY_UNIQUE_NAME=call-web-push-notification
ONESIGNAL_USER_AUTH_KEY=<One signal auth key>
ONESIGNAL_APP_AUTH_KEY=<One signal app auth key>
ONESIGNAL_ID=<One signal user id>
COUNTRIES_LIST_URL=https://mock-countries.herokuapp.com/list
DEFAULT_COUNTRY_CODES=ES,US  -> can be changed
NODE_OPTIONS="--max-old-space-size=4096"  -> also setup docker to have some good ram and cpu allocation to don't get the app hanging and freezing all the time.
```
From now you can use the VSCode terminal to run commands in git. If you are connected to your own repository, create a branch called 'staging'. We will use this branch for the CI/CD.

On heroku, create a pipeline, then create 2 apps, in my case is custom-activity-challenge-pre por staging purposes and custom-activity-challenge for production. Place them in the correct stages of the pipeline and configure them like the image below:
![Heroku-Pipeline](https://custom-activity-challenge.herokuapp.com/images/github/heroku-pipeline.png)

On the setup of each app, connect with Github and connect 'pre' with the 'staging' branch, and 'master' with 'production'. And check the option for automatic builds and deployments. This option tells the heroku app to keep listening to any changes done in those github branches and will automatically deploy them in the respective apps. 
![Heroku-Automatic-Builds](https://custom-activity-challenge.herokuapp.com/images/github/heroku-automatic-builds.png)

Then in order for Heroku to compile correctly, add all the .env variables as 'config vars' in the setup. Do not upload PORT, PRO_MONGODB, PRE_MONGODB and NODE_OPTIONS keys.
![Heroku-Config-Vars](https://custom-activity-challenge.herokuapp.com/images/github/heroku-config-vars.png)

If all of the above is correct, the environment would be up and running for local, remote (github) and deployments (heroku).

Additionally create a *.gitignore* file with the following
```
/node_modules
npm-debug.log
.DS_Store
/.env
```

You can run now this command in local VSCode terminal:
```
npm start
```
Remember that this command is running the app in the docker container, in order to view it in your local browser, run the following command:
```
>Remote-Containers: Forward Port from Container...
```
Write the port where you are exposing the app in the docker (3000), then you cna see it in the browser as localhost:3000
## About the project structure
The project it's applying the MVC pattern, additionally decouples the use of specific components. It's divided in the following:
### Controllers
The controller responds to the user input and performs interactions on the data model objects. Here it shouldn't be any logic, instead it should only deliver the request to the right Logic of the corresponding component. Once it's ready, it should share the response and pass it to the view. It can be used for front-end uses or API endpoints to be exposed.
### Model
The model is responsible for managing the data of the application. In this case, because the have decoupled the component to a different folder, we only maintain the specifics realted to the database we want to work on. In this case we have created a wrapper for Mongo db connector called MongoODM. Additionally we can define the different objects needed by this ODM to do the data transformation, like DocumentInfo. There is also no business logic in this layer.
### Views
This layer is the presentation of the application in a particular format. It uses pug and define the structure and manage the data passed in the response by the controller. It also doesn't define the business logic, but the methods to improve the presentation layer, like callouts, animations, specific behaviours like showing a notification preview when the texts in the inputs are being filled.
### Components
Components it's a different concept, what we do it's to isolate a specific sub-application, in this case everything related to WebNotification. It contains the business logic, it's main object definition, it's specific data transfer object (DTO, called Scheme) and data access layer (DAL) for mongo. Here we can add different DALs and DTOs depending on the Database. We can use components in other applications as doesn't depend in any of the other MVC structure. We can also extent the amount of components we need in this project.
### Public
Usually for css/js/images files and some configurations like manifest and web workers. But in this case, couldn't make it work the custom activity without having postmonger and the definition of the interaction of the activity with postmonger in this place. Need more time to look for improvements.
### Routing
Decouples the routing definition in one place to improve maintaiability and extensibility. 
### Utils
Suppoort classes for Logging, mailing, external libraries, JWT, etc.
## Important
### About OneSignal
If you have configured all the .env variables, you can test the sending of web push notifications with onesignal using the following url (check the routing folder for more) or just check [this link](https://custom-activity-challenge-pre.herokuapp.com/TestNotification/).
```
http://<your-heroku-or-local-url>/TestNotification
```
![OneSignal-testnotification](https://custom-activity-challenge.herokuapp.com/images/github/one-signal-testnotifications.png)
### About Installed packages
* body-parser: Used to parse requests for express (in recent versions doesn't come natively).
* dotenv: For using the .env file and variables.
* express: Node framework for building web applications. Decided to use this one for it's similarities with other frameworks I've worked with in other languages.
* express-validator: used by express.
* jsonwebtoken: for managing JSON Web Tokens, recommended by SFMC.
* mongoose: To connect with MongoDB. Decided to use this DB for it's compatibility to work with JSON. No transactions are needed in this app and it has natively High performance, availability and scalability features.
* onesignal-node: for web push notifications, good documentation and api to work with onesignal.
* pug: easy to understand library for views, react and angular are strong alternativies, but for a small challenge pug have the advantage of fast learning curve.
* request: designed to be the simplest way possible to make http calls for node.
### About SFMC
I had the opportunity to do some testing of the custom activity.
* In the panel:\
![SFMC-custom-activity-panel](https://custom-activity-challenge.herokuapp.com/images/github/sfmc-custom-activity.png)
* On the journey:\
![SFMC-custom-activity-journey](https://custom-activity-challenge.herokuapp.com/images/github/sfmc-custom-activity2.png)
* Opened:\
![SFMC-custom-activity-journey](https://custom-activity-challenge.herokuapp.com/images/github/sfmc-custom-activity-view.png)