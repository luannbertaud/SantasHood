#!/usr/bin/env python3

from models.db import DBdata
from tools.db import needs_db


@needs_db
def save_state(runID):
    try:
        dbdata = DBdata.get()
    except Exception as e:
        raise Exception(f"Failed to save worker state: {e}.")
    
    dbdata.workerstate = {
        "lastRunID": runID,
        "newEntries": 0
    }
    dbdata.save()