#!/usr/bin/env python3

from os import environ
from dotenv import load_dotenv

load_dotenv()
SERV_URL = environ.get('SERV_URL')
JWT_SECRET = environ.get('JWT_SECRET')
JWT_VALIDITY_DELTA = environ.get('JWT_VALIDITY_DELTA')
SERV_ENCRYPT_KEY = environ.get('SERV_ENCRYPT_KEY')

POSTGRES_PASSWORD = environ.get('POSTGRES_PASSWORD')
POSTGRES_USER = environ.get('POSTGRES_USER')
POSTGRES_PORT = environ.get('POSTGRES_PORT')
POSTGRES_HOST = environ.get('POSTGRES_HOST')
POSTGRES_DB_NAME = environ.get('POSTGRES_DB_NAME')