#!/usr/bin/env python3

from peewee import DoesNotExist
from sklearn.preprocessing import StandardScaler
from tools.db import needs_db
from models.db import GiftCards
from computation.clusters import compute_clusters, agregate_clusters

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
    based_uuids = []
    for card in cards:
        buff = []
        buff.append(card["budget"])
        # buff.append(card["cluttering"])
        # buff.append(0 if not card["shortlived"] else 1) # TODO verify hight dimensional
        buff.append(all_scopes.index(card["scope"]))
        for cat in card["categories"]:
            buff.append(all_categories.index(cat))
            encoded.append(buff)
            based_uuids.append(card["uuid"])
            buff = buff[:-1]
    
    scaler = StandardScaler()
    encoded = scaler.fit_transform(encoded)
    return encoded, based_uuids


@needs_db
def load_giftcards():
    query = None
    
    try:
        query = GiftCards.select()
    except:
        return {"cards": []}
    if (not query):
        return {"cards": []}
    return {"cards": [d for d in query.dicts()]}

@needs_db
def save_giftcards(uuid_clusters, runID):
    query = None
    
    try:
        query = GiftCards.select()
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

def refresh_gifts_clusters(runID): # TODO Logging
    data = load_giftcards()

    encoded, e_uuids = encode_giftcards(data["cards"])
    labels, _ = compute_clusters(encoded)
    uuid_clusters = agregate_clusters(labels, e_uuids)

    save_giftcards(uuid_clusters, runID)