# AutoDeeploy

Automating the deployment process of Deep Learning models by creating APIs for different model. Given a git URL of Deep Learning project, we are building APIs so that one can use the models.

## How to Run?

1) Set up Docker, Celery and Redis-server on your machine, After installing docker, run the following command
`sudo groupadd docker`<br/>
`sudo usermod -aG docker $USER` <br/>
`newgrp docker`
2) Clone this repository.<br />
`git clone https://github.com/asaxena2526/AutoDeeploy.git`<br />
`cd AutoDeeploy`
3) Install all the requirements.<br />
`pip3 install -r requirement.txt`
4) Create an empty repository named models.<br />
`mkdir models`
5) Move to the folder images and build the image.<br />
`cd images`<br />
`docker build --tag baseimage .`
6) Move to the folder app and install the node modules.<br />
`cd ../app`<br />
`yarn install`<br />
`yarn start` `# This will run the react server`
7) Move to the folder api and run flask server, redis server, celery.<br />
`cd ../api`<br />
`celery -A deploy worker --pool=solo --loglevel=info`<br />
`redis-server`<br />
`python3 automate.py`

8) All the things are set.
