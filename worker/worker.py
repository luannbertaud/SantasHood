#!/usr/bin/env python3

import random
import numpy as np
from sklearn.datasets import make_blobs
from tools.db import validateDatabase
from tools.graphical import show_clusters
from computation.clusters import compute_clusters


# validateDatabase()
# print("OK")

features, true_labels = make_blobs(
    n_samples=200,
    centers=3,
    cluster_std=2.75,
    random_state=42
)

features = \
np.array([
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],
    [random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)],

])

labels, _ = compute_clusters(features)
show_clusters(labels, features)