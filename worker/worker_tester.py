#!/usr/bin/env python3

import sys
import numpy as np
from computation.clusters import compute_clusters, aggregate_clusters
from tools.graphical import show_clusters
from controllers.giftcards import refresh_gifts_clusters
from controllers.usercards import refresh_users_clusters
from computation.data_tools import generate_data

if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    # validateDatabase()
    # test_clustering()

from pprint import pprint

# data = load_giftcards()


# encoded, e_uuids = encode_giftcards(data["cards"])
# labels, _ = compute_clusters(encoded)
# uuid_clusters = aggregate_clusters(labels, e_uuids)
# pprint(uuid_clusters)

# show_clusters(labels, np.array(encoded))
# for i in range(len(data["cards"])):
#     data["cards"][i]["label"] = uuid_clusters[data["cards"][i]["uuid"]]
#     pprint(data["cards"][i])

# save_giftcards(uuid_clusters, "a")

refresh_gifts_clusters("truc")
refresh_users_clusters("truc")