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
![Heroku-Pipeline](https://custom-activity-challenge-pre.herokuapp.com/images/github/heroku-pipeline.png)

On the setup of each app, connect with Github and connect 'pre' with the 'staging' branch, and 'master' with 'production'. And check the option for automatic builds and deployments. This option tells the heroku app to keep listening to any changes done in those github branches and will automatically deploy them in the respective apps. 
![Heroku-Pipeline](https://custom-activity-challenge-pre.herokuapp.com/images/github/heroku-automatic-builds.png)

Then in order for Heroku to compile correctly, add all the .env variables as 'config vars' in the setup. Do not upload PORT, PRO_MONGODB, PRE_MONGODB and NODE_OPTIONS keys.
![Heroku-Pipeline](https://custom-activity-challenge-pre.herokuapp.com/images/github/heroku-config-vars.png)