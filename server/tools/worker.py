#!/usr/bin/env python3

from controllers.hood_db import validateDatabase
from functools import wraps

from datetime import datetime, timedelta
from peewee import DoesNotExist
from models.db import ClustersRelations, DBdata
from tools.db import needs_db

@needs_db
def get_last_runID_parsing(min_relation_age=60, relations_limit=10):
    last_rl = None
    min_date = datetime.now() - timedelta(seconds=min_relation_age)
    try:
        rls = ClustersRelations.select().order_by(ClustersRelations.date.desc()).limit(relations_limit)
    except:
        return None
    for rl in rls:
        if (rl.runid == last_rl):
            continue
        last_rl = rl.runid
        if (rl.date >= min_date):
            continue
        return rl.runid
    return None

@needs_db
def get_last_runID():
    runID = None
    try:
        dbdata = DBdata.get()
    except:
        return None
    if ((not dbdata.workerstate) or ("lastRunID" not in dbdata.workerstate.keys()) or (dbdata.workerstate["lastRunID"] == -1)):
        return None
    runID = dbdata.workerstate["lastRunID"]
    return runID


@needs_db
def update_entries(removed=False):
    try:
        dbdata = DBdata.get()
    except:
        return False
    dbdata.workerstate = {
        "lastRunID": dbdata.workerstate["lastRunID"] if "lastRunID" in dbdata.workerstate.keys() else -1,
        "newEntries": dbdata.workerstate["newEntries"] if "newEntries" in dbdata.workerstate.keys() else 0,
    }
    dbdata.workerstate["newEntries"] += 1 if (not removed) else -1
    dbdata.save()
    return True