#!/usr/bin/env python3

import sys
import random
import numpy as np
from copy import deepcopy
from computation.clusters import compute_clusters
from sklearn.preprocessing import MinMaxScaler, StandardScaler, MaxAbsScaler
from tools.db import validateDatabase
from tools.graphical import show_clusters


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


def encode_giftcards(cards):
    all_scopes = []
    all_categories = []

    for card in cards:
        if (card["scope"] not in all_scopes):
            all_scopes.append(card["scope"])
        for cat in card["categories"]:
            if (cat not in all_categories):
                all_categories.append(cat)

    encoded = []
    for card in cards:
        buff = []
        # buff.append(0)
        buff.append(card["budget"])
        # buff.append(card["cluttering"])
        # buff.append(0 if not card["shortlived"] else 1)
        buff.append(all_scopes.index(card["scope"]))
        for cat in card["categories"]:
            buff.append(all_categories.index(cat))
            encoded.append(buff)
            buff = buff[:-1]
    
    scaler = StandardScaler()
    encoded = scaler.fit_transform(encoded)
    return encoded



data = {
        "cards": [
        # {
        #     "uuid": "999",
        #     "name": "FirstaOne",
        #     "description": "descOne",
        #     "budget": 100,
        #     "scope": "Family",
        #     "cluttering": 9,
        #     "shortlived": False,
        #     "categories": ["dodo", "bato", "cado"]
        # },
        # {
        #     "uuid": "9999",
        #     "name": "Secondone",
        #     "description": "descTwo",
        #     "budget": 10,
        #     "scope": "Personal",
        #     "cluttering": 1,
        #     "shortlived": True,
        #     "categories": ["nature", "sport", "dodo"]
        # }
    ]
}

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
    

if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    # validateDatabase()
    # test_clustering()

from pprint import pprint

encoded = encode_giftcards(data["cards"])

pprint(encoded)
labels, _ = compute_clusters(encoded)
pprint(labels)
show_clusters(labels, np.array(encoded))
# test_clustering()

for i in range(len(data["cards"])):
    if (labels[i] == 1):
        pprint(data["cards"][i])