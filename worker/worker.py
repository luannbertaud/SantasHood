#!/usr/bin/env python3

import sys
import random
import numpy as np
from copy import deepcopy
from computation.clusters import compute_clusters
from sklearn.preprocessing import MinMaxScaler, StandardScaler, MaxAbsScaler
from tools.db import validateDatabase
from tools.graphical import show_clusters



if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    validateDatabase()