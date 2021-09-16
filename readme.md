# *_rps_client_*
This frontend-application uses React, HTML, CSS and Java script to transform data into a graphical interface with the use of Amcharts for users to connect and display data through digital interaction. 
The application runs on node.js and npm, which show all of the Raychem Pipeline Supervisor's user interface assets.


## *_Pre-requisites_*

* *_Node.js v12.16.0_*

Here is the link for reference `https://nodejs.org/en/`.


* *_Npm v6.13.4_*

Here is the link for reference `https://www.npmjs.com/package/npm-install`.


* *_Port_*

Port `3000` should be available on the machine.

## *_Pre-requisites using Docker_*

Assuming you have docker installed, you can use the bash scripts under ./bin to launch the tasks described below in a container, the same way that gitlab-ci would do.
  * note ./bin/npm_published exposes port 3000 on the container on localhost, so you can reach the dev server. so, you can do ```bin/npm_published run start``` and see the app on http://localhost:3000/. This isn't nessesairy for other build tasks, and in future should be replaced with proper dev services that can resolve the container the dev server is running in. 


## *_Quick start_*

Below are the steps to set up the application on Linux and Windows machine.

* #### *_LINUX_*

1. In order to install Node.js and npm follow the steps
```
$ sudo apt install curl -y
$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```
then, check the version of node and rpm, run the following commmand.

```
$ node -v

$ npm -v
```

2. Clone this repo using git clone.
```
$ git clone git@gitlab.com:EngineeringSoftware/nVentPartners/rps_client.git
```
3. Move to the appropriate directory.
```
 $ cd /rps_client
```
4. Run in order to install dependencies.
```
$ npm install
...
5. 
```
Set environment variable url to the right url, for example https://appliancetunnel-606c657544382801.elb.us-east-1.amazonaws.com/
...
6. At this point, you can run
 ```
$ npm start
 ``` 
7. Frontend application runs on `http://localhost:3000`

* #### *_WINDOWS_*

1. Visit the official website of node and install the current stable version of node js.
```
$ node -v

$ npm -v
```

2. Clone this repo using git clone.
```
git clone git@gitlab.com:EngineeringSoftware/nVentPartners/rps_client.git
```
3. Move to the appropriate directory.
```
cd /rps_client
```
4. Run in order to install dependencies.
```
npm install
```
5. At this point, you can run
 ```
npm start
 ``` 
6. Frontend application runs on `http://localhost:3000`

7. To run all unit tests
 ```
    npm test  -- -u
 ```   