#!/usr/bin/env python3

import sys
from uuid import uuid4 as guuid
from computation.clusters import create_relations
from controllers.giftcards import refresh_gifts_clusters
from controllers.usercards import refresh_users_clusters
from controllers.state import save_state
from tools.db import validateDatabase
from tools.log import *

def run():
    logger.warning("=> Worker run triggered.")
    validateDatabase()
    logger.info("Valid database, starting worker ..")

    logger.info("<<<< Updating all clusters >>>>")
    
    runID = str(guuid())
    logger.info(f"RunID is {runID}.")
    refresh_gifts_clusters(runID)
    refresh_users_clusters(runID)
    logger.info("Saving relations between clusters..")
    create_relations(runID)
    logger.info("OK")
    logger_waiting.info("Saving state..")
    save_state(runID)
    logger_finished.info("..OK")

    logger.info("<<<< All clusters updated >>>>")


if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    validateDatabase()
    run()
