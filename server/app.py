#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from tools.db import validateDatabase
# from controllers.auth.area import areaAuthBP
from controllers.users.BP import usersBP

app = Flask("app")
CORS(app, origins="*")

# app.register_blueprint(areaAuthBP, url_prefix="/auth/area")
app.register_blueprint(usersBP, url_prefix="/users")

validateDatabase()

@app.route("/ping")
def app_ping():
    return "pong"