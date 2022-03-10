#!/usr/bin/env python3

from peewee import DoesNotExist
from tools.db import needs_db
from models.db import GiftCards


@needs_db
def save_giftcard(card):
    try:
        c = GiftCards.get(GiftCards.uuid == card["uuid"])
    except DoesNotExist as e:
        GiftCards.create(uuid=card["uuid"], budget=card['budget'], scope=card['scope'], shortlived=card['shortlived'], categories=card['categories'])
        return card["uuid"]
    c.budget = card["budget"]
    c.scope = card["scope"]
    c.shortlived = card["shortlived"]
    c.categories = card["categories"]
    c.save()
    return card["uuid"]