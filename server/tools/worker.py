#!/usr/bin/env python3

from controllers.hood_db import validateDatabase
from functools import wraps

from datetime import datetime, timedelta
from peewee import DoesNotExist
from models.db import ClustersRelations
from tools.db import needs_db

@needs_db
def get_last_runID(min_relation_age=60, relations_limit=10):
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
