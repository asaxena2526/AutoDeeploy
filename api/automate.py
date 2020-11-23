import flask
import os
from flask import request
import json
from deploy import deploy
import requests
import docker


app = flask.Flask(__name__)
app.config["DEBUG"] = True
client = docker.from_env()

@app.route('/create-api', methods=['POST'])
def create_api():  
    data=request.json
    git_url = data['url']

    print(git_url)
    

    deploy.delay(git_url)
    
    port = 5001 + (len(next(os.walk("../models"))[1]))
    return str(port)

@app.route('/api', methods=['POST'])
def modelresponse():
    model_id  = request.args['model_id']
    payload = request.json
    payload = json.dumps(payload)
    # print(payload)
    headers = {'Content-Type': "application/json"}
    response = requests.request("POST","http://0.0.0.0:"+model_id+"/api",data=payload,headers=headers)
    print(response.text)
    return response.text 


@app.route('/logs', methods=['GET'])
def logs():
    model_id  = request.args['model_id']
    model_id = str(int(model_id)-5000)
    
    try:
        logtext=client.containers.get("project"+model_id).logs()
        return logtext
    except docker.errors.NotFound:
        return "Wait"
    


app.run()
    
    