#!/usr/bin/env python3

import sys
from computation.clusters import compute_clusters_tmp, create_relations
from tools.db import validateDatabase



if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    validateDatabase()
    print("Valid database, starting worker ..")

    compute_clusters_tmp("theid")
    create_relations()