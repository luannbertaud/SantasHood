#!/usr/bin/env python3

from peewee import DoesNotExist
from sklearn.preprocessing import StandardScaler
from tools.db import needs_db
from tools.log import *
from models.db import GiftCards
from computation.clusters import compute_clusters, aggregate_clusters


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
        buff.append(card["cluttering"])
        buff.append(0 if not card["shortlived"] else 1)
        buff.append(all_scopes.index(card["scope"]))
        for cat in card["categories"]:
            buff.append(all_categories.index(cat))
            encoded.append(buff)
            based_uuids.append(card["uuid"])
            buff = buff[:-1]
    logger.info(f"\tData to be feed in cluster computation: {len(encoded)} encoded gifts.")
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


def refresh_gifts_clusters(runID):
    logger.info("---- Updating gifts clusters ----")
    logger_waiting.info("Loading gifts..")
    data = load_giftcards()
    logger_finished.info("..OK")

    logger.info("Preprocessing gifts..")
    encoded, e_uuids = encode_giftcards(data["cards"])
    logger.info("OK")
    logger.info("Computing clusters..")
    labels, _ = compute_clusters(encoded)
    uuid_clusters = aggregate_clusters(labels, e_uuids)
    logger.info("OK")

    logger_waiting.info("Saving clusters..")
    save_giftcards(uuid_clusters, runID)
    logger_finished.info("..OK")
    logger.info("---- Gifts clusters updated ----")