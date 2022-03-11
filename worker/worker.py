#!/usr/bin/env python3

import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_blobs
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import MinMaxScaler
from tools.db import validateDatabase

# validateDatabase()
# print("OK")

def show_clusters(labels, features):
    u_labels = np.unique(labels)

    for i in u_labels:
        plt.scatter(features[labels == i , 0] , features[labels == i , 1] , label = i)
    plt.legend()
    plt.show()

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

def compute_clusters(features, n_clusters=None):
    scaler = MinMaxScaler()
    scaled_features = scaler.fit_transform(features)
    
    if (not n_clusters):
        scores = []
        record = (-1, 2)
        distances = range(2, len(scaled_features))
        for d in distances:
            agc = AgglomerativeClustering(n_clusters=d)
            agc.fit(scaled_features)
            score = silhouette_score(scaled_features, agc.labels_)
            scores.append(score)
            if (score > record[0]):
                record = (score, d)

        n_clusters = record[1]
        print(f"The Optimal cluster number seems to be {n_clusters}.")

        # plt.style.use("fivethirtyeight")
        # plt.plot(distances, scores)
        # plt.xticks(distances)
        # plt.xlabel("Number of Clusters")
        # plt.ylabel("Silhouette Coefficient")
        # plt.show()

    agc = AgglomerativeClustering(n_clusters=n_clusters)
    agc.fit(scaled_features)
    return agc.labels_, agc


features, true_labels = make_blobs(
    n_samples=200,
    centers=3,
    cluster_std=2.75,
    random_state=42
)

# features = np.array([[  9.77075874,   3.27621022],
#        [ -9.71349666,  11.27451802],
#        [ -6.91330582,  -9.34755911],
#        [-10.86185913, -10.75063497],
#        [ -8.50038027,  -4.54370383],
#        [-100, 100]])
# true_labels = np.array([1, 0, 2, 2, 2])
# features = features[:25]
# true_labels = true_labels[:25]

labels, _ = compute_clusters(features)
show_clusters(labels, features)