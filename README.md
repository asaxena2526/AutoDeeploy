# AutoDeeploy

Automating the deployment process of Deep Learning models by creating APIs for different model. Given a git URL of Deep Learning project, we are building APIs so that one can use the models.

## How to Run?

1) Set up Docker, Celery and Redis-server on your machine.
2) Clone this repository.
`git clone https://github.com/asaxena2526/AutoDeeploy.git`
`cd AutoDeeploy`
3) Install all the requirements.
`pip3 install -r requirement.txt`
4) Create an empty repository named models.
`mkdir models`
5) Move to the folder images and build the image.
`cd images`
`docker build --tag baseimage .`
6) Move to the folder app and install the node modules.
`cd ../app`
`yarn install`
`yarn start` `# This will run the react server`
7) Move to the folder api and run flask server, redis server, celery.
`cd ../api`
`celery -A deploy worker --pool=solo --loglevel=info`
`redis-server`
`python3 automate.py`

8) All the things are set.
