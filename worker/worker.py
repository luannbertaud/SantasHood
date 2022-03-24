#!/usr/bin/env python3

import sys
from computation.clusters import create_relations
from controllers.giftcards import refresh_gifts_clusters
from controllers.usercards import refresh_users_clusters
from tools.db import validateDatabase


if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    validateDatabase()
    print("Valid database, starting worker ..")

    runID = "theid"
    refresh_gifts_clusters(runID)
    refresh_users_clusters(runID)
    create_relations(runID)