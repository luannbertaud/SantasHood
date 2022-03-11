#!/usr/bin/env python3

import numpy as np
import matplotlib.pyplot as plt


def show_clusters(labels, features):
    u_labels = np.unique(labels)

    ax = plt.axes(projection='3d')
    ax.view_init(elev=20., azim=160)
    for i in u_labels:
        ax.scatter3D(features[labels == i , 0], features[labels == i , 1], features[labels == i , 2], label = i)
    # plt.legend()
    plt.show()
