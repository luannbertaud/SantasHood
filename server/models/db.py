#!/usr/bin/env python3

from peewee import Model as __Model
from peewee import TextField, IntegerField, BooleanField
from playhouse.postgres_ext import JSONField
from models.db_globals import db

class __BaseModel(__Model):
    class Meta:
        database = db

class DBdata(__BaseModel):
    version = TextField()

class UserCards(__BaseModel):
    uuid = TextField(primary_key=True)
    age = IntegerField()
    sexe = TextField()
    interests = JSONField()

class GiftCards(__BaseModel):
    uuid = TextField(primary_key=True)
    budget = IntegerField()
    scope = TextField()
    shortlived = BooleanField()
    categories = JSONField()