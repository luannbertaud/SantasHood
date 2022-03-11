#!/usr/bin/env python3

from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import MinMaxScaler


def compute_clusters(gifts, n_clusters=None):
    scaler = MinMaxScaler()
    scaled_gifts = scaler.fit_transform(gifts)
    
    if (not n_clusters):
        scores = []
        record = (-1, 2)
        cluster_nb_list = range(2, len(scaled_gifts))
        for cn in cluster_nb_list:
            agc = AgglomerativeClustering(n_clusters=cn)
            agc.fit(scaled_gifts)
            score = silhouette_score(scaled_gifts, agc.labels_)
            scores.append(score)
            if (score > record[0]):
                record = (score, cn)

        n_clusters = record[1] #TODO record is maybe not the best one
        print(f"For {len(gifts)} gifts, the optimal clusters number seems to be {n_clusters}.")

        # plt.style.use("fivethirtyeight")
        # plt.plot(cluster_nb_list, scores)
        # plt.xticks(cluster_nb_list)
        # plt.xlabel("Number of Clusters")
        # plt.ylabel("Silhouette Coefficient")
        # plt.show()

    agc = AgglomerativeClustering(n_clusters=n_clusters)
    agc.fit(scaled_gifts)
    return agc.labels_, agc
