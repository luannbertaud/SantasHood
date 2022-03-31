#!/usr/bin/env python3

from peewee import DoesNotExist
from sklearn.preprocessing import StandardScaler
from tools.db import needs_db
from tools.log import *
from models.db import UserCards
from computation.clusters import compute_clusters, aggregate_clusters


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
    logger.info(f"\tData to be feed in cluster computation: {len(encoded)} encoded users.")
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


def refresh_users_clusters(runID):
    logger.info("---- Updating users clusters ----")
    logger_waiting.info("Loading users..")
    data = load_usercards()
    logger_finished.info("..OK")


    logger.info("Preprocessing users..")
    encoded, e_uuids = encode_usercards(data["cards"])
    logger.info("OK")
    logger.info("Computing clusters..")
    labels, _ = compute_clusters(encoded)
    uuid_clusters = aggregate_clusters(labels, e_uuids)
    logger.info("OK")

    logger_waiting.info("Saving clusters..")
    save_usercards(uuid_clusters, runID)
    logger_finished.info("..OK")
    logger.info("---- Users clusters updated ----")