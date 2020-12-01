from celery import Celery
import os
import docker
import os

app = Celery('deploy', broker='redis://localhost:6379/0')
client = docker.from_env()

@app.task
def deploy(git_url):
	# git clone
    cmd = "git clone " + git_url
    os.system(cmd)
    
    name = (git_url.split('/')[-1]).split('.')[0]

    unique_id = str(len(next(os.walk("../models"))[1])+1)
    print(unique_id)
    cmd = "mkdir ../models/project"+unique_id
    os.system(cmd)
    cmd = "cp -a "+name+"/. ../models/project"+unique_id
    os.system(cmd)
    cmd = "rm -rf "+name
    os.system(cmd)

    # copy and setup
    cmd = "cp ../build/server.py ../models/project"+unique_id
    os.system(cmd)
    cmd = "cp ../build/server_requirements.txt ../models/project"+unique_id
    os.system(cmd)
    cmd = "cp ../build/build.sh ../models/project"+unique_id
    os.system(cmd)
   
    port = str(5000+int(unique_id))
   
    client.containers.run("baseimage",detach=True,environment=["PORT="+port],
        name="project"+unique_id,ports={port:port},
        volumes={os.getcwd()+"/../models/project"+unique_id:{'bind':'/app','mode':'rw'},
                os.getcwd()+"/../pythoncache":{'bind':'/root/.cache','mode':'rw'}}
        )
    

# celery -A deploy worker --pool=solo --loglevel=info
