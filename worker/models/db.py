#!/usr/bin/env python3

from peewee import Model as __Model
from peewee import TextField, IntegerField, BooleanField, DateTimeField
from playhouse.postgres_ext import ArrayField, JSONField
from models.db_globals import db

class __BaseModel(__Model):
    class Meta:
        database = db

class DBdata(__BaseModel):
    version = TextField()
    workerstate = JSONField()

class UserCards(__BaseModel):
    uuid = TextField(primary_key=True)
    age = IntegerField()
    sexe = TextField()
    clusterdata = JSONField()
    interests = ArrayField(TextField)
    likedgifts = ArrayField(TextField)

class GiftCards(__BaseModel):
    uuid = TextField(primary_key=True)
    name = TextField()
    description = TextField()
    clusterdata = JSONField()
    budget = IntegerField()
    scope = TextField()
    cluttering = IntegerField()
    shortlived = BooleanField()
    categories = ArrayField(TextField)

class ClustersRelations(__BaseModel):
    uuid = TextField(primary_key=True)
    usercluster = TextField()
    giftclusters = ArrayField(TextField)
    runid = TextField()
    date = DateTimeField()