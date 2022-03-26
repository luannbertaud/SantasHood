#!/usr/bin/env python3

import random
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from pprint import pprint
from tools.graphical import show_clusters
from computation.clusters import compute_clusters


def test_clustering():
    features = np.array([[random.randint(0, 100), random.randint(0, 100), random.randint(0, 100), random.randint(0, 100)]])

    for i in range(0, 20):
        tmp = []
        for ii in range(0, 4):
            tmp.append(random.randint(0, 100))
        features = np.append(features, [tmp], axis=0)

    scaler = MinMaxScaler()
    gifts = scaler.fit_transform(features)
    pprint(gifts)
    labels, _ = compute_clusters(gifts)
    pprint(labels)
    show_clusters(labels, features)


def generate_data():
    data = {}
    cats = ["nature", "sport", "dodo"]
    scopes = ["Personal", "Family", "Tryue"]
    for i in range(200):
        data["cards"].append(
        {
            "uuid": "999",
            "name": "FirstaOne",
            "description": "descOne",
            "budget": random.randint(10, 1000),
            "scope": scopes[random.randint(0, len(scopes)-1)],
            "cluttering": 1,
            "shortlived": False,
            "categories": [cats[random.randint(0, len(cats)-1)]]
        })
    return data    
