#!/usr/bin/env python3

from peewee import DoesNotExist
from sklearn.preprocessing import StandardScaler
from tools.db import needs_db
from models.db import UserCards
from computation.clusters import compute_clusters, agregate_clusters


def encode_usercards(cards):
    all_sexes = []
    all_interests = []

    for card in cards:
        if (card["sexe"] not in all_sexes):
            all_sexes.append(card["sexe"])
        for i in card["interests"]:
            if (i not in all_interests):
                all_interests.append(i)

    encoded = []
    based_uuids = []
    for card in cards:
        buff = []
        buff.append(card["age"])
        buff.append(all_sexes.index(card["sexe"]))
        for i in card["interests"]:
            buff.append(all_interests.index(i))
            encoded.append(buff)
            based_uuids.append(card["uuid"])
            buff = buff[:-1]
    
    scaler = StandardScaler()
    encoded = scaler.fit_transform(encoded)
    return encoded, based_uuids


@needs_db
def load_usercards():
    query = None
    
    try:
        query = UserCards.select()
    except:
        return {"cards": []}
    if (not query):
        return {"cards": []}
    return {"cards": [d for d in query.dicts()]}


@needs_db
def save_usercards(uuid_clusters, runID):
    query = None
    
    try:
        query = UserCards.select()
    except DoesNotExist as e:
        return False
    
    if not query:
        return False
    
    for q in query:
        if (q.uuid not in uuid_clusters.keys()):
            continue
        q.clusterdata = {
            "runID": runID,
            "cluster": int(uuid_clusters[q.uuid])
        }
        q.save()
    return True


def refresh_users_clusters(runID): # TODO Logging
    data = load_usercards()

    encoded, e_uuids = encode_usercards(data["cards"])
    labels, _ = compute_clusters(encoded)
    uuid_clusters = agregate_clusters(labels, e_uuids, False)

    save_usercards(uuid_clusters, runID)