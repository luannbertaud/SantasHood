#!/usr/bin/env python3

import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from uuid import uuid4 as guuid
from peewee import DoesNotExist
from hdbscan import HDBSCAN
from sklearn.metrics import silhouette_score
from tools.db import needs_db
from models.db import ClustersRelations, GiftCards, UserCards

def compute_clusters(data, min_cluster_size=None):
    
    if (not min_cluster_size):
        scores = []
        record = (-1, 2, -1)
        cluster_nb_list = range(2, len(data)+1, 3)
        
        for cn in cluster_nb_list:
            agc = HDBSCAN(min_cluster_size=cn)
            agc.fit(data)
            
            if (len(np.unique(agc.labels_)) <= 1) or (len(np.unique(agc.labels_)) >= len(data)):
                scores.append(0)
                continue
            score = silhouette_score(data, agc.labels_)
            scores.append(score)
            
            if (score > record[0]):
                record = (score, cn, len(np.unique(agc.labels_)))

        min_cluster_size = record[1]
        print(f"For {len(data)} data, the optimal clusters number seems to be {record[2]} (min {record[1]}) -> {record[0]}.")

        # plt.style.use("fivethirtyeight")
        # plt.plot(cluster_nb_list, scores)
        # plt.xticks(cluster_nb_list)
        # plt.xlabel("Number of Clusters")
        # plt.ylabel("Silhouette Coefficient")
        # plt.show()

    agc = HDBSCAN(min_cluster_size=min_cluster_size)
    agc.fit(data)
    return agc.labels_, agc

def agregate_clusters(labels, e_uuids, extract_best=False):
    res = {}
    
    if (len(e_uuids) != len(labels)):
        raise Exception("Labels and Uuids number mismatch.")
    
    for i in range(len(labels)):
        if (e_uuids[i] not in res.keys()):
            res[e_uuids[i]] = []
        res[e_uuids[i]].append(labels[i])
        res[e_uuids[i]] = list(set(res[e_uuids[i]]))
    
    if (not extract_best):
        for k in list(res.keys()):
            res[k] = int("".join([str(x) for x in sorted(res[k])]))
        return res
    
    for k in list(res.keys()):
        res[k] = max(set(res[k]), key = res[k].count)
    return res

@needs_db
def create_relations(runID):
    relations = {}
    
    try:
        users = UserCards.select()
    except DoesNotExist as e:
        return False
    
    for u in users:
        if ((u.clusterdata == {}) or ("cluster" not in u.clusterdata.keys()) or ("runID" not in u.clusterdata.keys()) or (u.clusterdata["runID"] != runID)):
            continue
        cl = u.clusterdata["cluster"]
        if (cl not in relations.keys()):
            relations[cl] = []

        for gu in u.likedgifts:
            gift = None
            try:
                gift = GiftCards.get(GiftCards.uuid == gu)
            except DoesNotExist as e:
                continue
            if not (gift and gift.clusterdata != {} and ("cluster" in gift.clusterdata) and ("runID" in gift.clusterdata)):
                continue
            if (gift.clusterdata["runID"] != u.clusterdata["runID"]):
                continue
            relations[cl].append(gift.clusterdata["cluster"])
    
    for cl in list(relations.keys()):
        while True:
            newUUID = str(guuid())
            try:
                ClustersRelations.get(ClustersRelations.uuid == str(newUUID))
                continue
            except DoesNotExist as e:
                ClustersRelations.create(uuid=newUUID, usercluster=cl, giftclusters=relations[cl], runid=runID, date=datetime.now())
                break
    return True