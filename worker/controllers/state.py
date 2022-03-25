#!/usr/bin/env python3

import time
from models.db import DBdata
from tools.db import needs_db
from tools.log import *


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

@needs_db
def wait_for_entries(entries_nb=10, checks_delay=30, waiter=time.sleep, break_flag=None):
    while True:
        if (break_flag and break_flag.is_set()):
            break
        logger_waiting.info("Checking for new entries..")
        try:
            dbdata = DBdata.get()
        except Exception as e:
            raise Exception(f"Failed to check worker state: {e}.")
        if ((not dbdata.workerstate) or ("newEntries" not in dbdata.workerstate.keys()) or (dbdata.workerstate["newEntries"] < entries_nb)):
            logger_finished.info(f"..{dbdata.workerstate['newEntries']} new entries (< {entries_nb}), waiting.")
            waiter(checks_delay)
            continue
        else:
            logger_finished.info(f"..{dbdata.workerstate['newEntries']} new entries (>= {entries_nb}), triggered.")
            break