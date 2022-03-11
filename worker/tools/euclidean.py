#!/usr/bin/env python3

import numpy as np

def max_euclidean_distance(darray):
    record = -1
    for x in darray:
        for y in darray:
            if (x.all() == y.all()):
                continue
            buff = np.linalg.norm(x-y)
            if ((buff > record) or (record == -1)):
                record = buff
    return record

def min_euclidean_distance(darray):
    record = -1
    for x in darray:
        for y in darray:
            if (x.all() == y.all()):
                continue
            buff = np.linalg.norm(x-y)
            if ((buff < record) or (record == -1)):
                record = buff
    return record

def get_threshold_distances(darray, steps=10):
    diff = max_euclidean_distance(darray) - min_euclidean_distance(darray)
    distances = [diff*_ for _ in range(1, len(darray))]
    return distances
