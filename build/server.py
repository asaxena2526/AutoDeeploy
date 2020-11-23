import flask
from flask import request
from predict import PythonPredictor
import json
import os

app = flask.Flask(__name__)
app.config["DEBUG"] = True

predictor = PythonPredictor()

@app.route('/api', methods=['POST'])
def api_predictor():    
    payload = request.json
    response = json.dumps(predictor.predict(payload))
    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=os.environ['PORT'])
    
    