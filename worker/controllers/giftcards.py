#!/usr/bin/env python3

from peewee import DoesNotExist
from models.db import GiftCards
from sklearn.preprocessing import StandardScaler

from tools.db import needs_db

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
        # buff.append(0)
        buff.append(card["budget"])
        # buff.append(card["cluttering"])
        # buff.append(0 if not card["shortlived"] else 1)
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