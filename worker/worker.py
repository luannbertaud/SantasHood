#!/usr/bin/env python3

import sys
import random
import numpy as np
from tools.db import validateDatabase
from tools.graphical import show_clusters
from computation.clusters import compute_clusters


def test_clustering():
    features = np.array([[random.randint(0, 100), random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)]])

    for i in range(0, 20):
        tmp = []
        for ii in range(0, 4):
            tmp.append(random.randint(0, 100))
        features = np.append(features, [tmp], axis=0)

    labels, _ = compute_clusters(features)
    show_clusters(labels, features)


if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    validateDatabase()
    test_clustering()