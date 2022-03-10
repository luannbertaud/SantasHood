#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from tools.db import validateDatabase

app = Flask("app")
CORS(app, origins="*")

validateDatabase()

@app.route("/ping")
def app_ping():
    return "pong"
