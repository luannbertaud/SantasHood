#!/usr/bin/env python3

from peewee import DoesNotExist
from tools.db import needs_db
from models.db import GiftCards

def __prevent_duplicate(card):
    try:
        c = GiftCards.get(GiftCards.budget == card["budget"], GiftCards.scope == card["scope"], GiftCards.cluttering == card["cluttering"], GiftCards.shortlived == card["shortlived"], GiftCards.categories == card["categories"])
    except DoesNotExist:
        return None
    return c

@needs_db
def save_giftcard(card):
    c = __prevent_duplicate(card)
    if (c):
        return f"{card['uuid']} -> {c.uuid}"
    try:
        c = GiftCards.get(GiftCards.uuid == card["uuid"])
    except DoesNotExist as e:
        GiftCards.create(uuid=card["uuid"], name=card["name"], description=card["description"], clusterdata={}, budget=card['budget'], scope=card['scope'], cluttering=card["cluttering"], shortlived=card['shortlived'], categories=card['categories'])
        return card["uuid"]
    c.name = card["name"]
    c.description = card["description"]
    c.budget = card["budget"]
    c.scope = card["scope"]
    c.cluttering = card["cluttering"]
    c.shortlived = card["shortlived"]
    c.categories = card["categories"]
    c.save()
    return card["uuid"]