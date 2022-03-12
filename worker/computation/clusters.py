#!/usr/bin/env python3

from sklearn.cluster import DBSCAN, AgglomerativeClustering, KMeans
from sklearn.metrics import silhouette_score
from hdbscan import HDBSCAN
import matplotlib.pyplot as plt
import numpy as np


def compute_clusters(gifts, n_clusters=None):
    
    if (not n_clusters):
        scores = []
        record = (-1, 2, -1)
        cluster_nb_list = range(2, len(gifts)+1)
        for cn in cluster_nb_list:
            # agc = KMeans(n_clusters=cn, algorithm="k-mean++")
            agc = HDBSCAN(min_cluster_size=cn)
            agc.fit(gifts)
            if (len(np.unique(agc.labels_)) <= 1) or (len(np.unique(agc.labels_)) >= len(gifts)):
                scores.append(0)
                continue
            score = (silhouette_score(gifts, agc.labels_))
            scores.append(score)
            if (score >= record[0]):
                record = (score, cn, len(np.unique(agc.labels_)))

        n_clusters = record[1] #TODO record is maybe not the best one
        print(f"For {len(gifts)} gifts, the optimal clusters number seems to be {record[2]} (min {record[1]}) -> {record[0]}.")
        print(scores)

        # plt.style.use("fivethirtyeight")
        # plt.plot(cluster_nb_list, scores)
        # plt.xticks(cluster_nb_list)
        # plt.xlabel("Number of Clusters")
        # plt.ylabel("Silhouette Coefficient")
        # plt.show()

    # agc = AgglomerativeClustering(n_clusters=n_clusters)
    agc= HDBSCAN(min_cluster_size=n_clusters)
    agc.fit(gifts)
    return agc.labels_, agc
