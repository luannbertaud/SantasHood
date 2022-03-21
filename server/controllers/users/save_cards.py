#!/usr/bin/env python3

from peewee import DoesNotExist
from tools.db import needs_db
from models.db import UserCards


@needs_db
def save_usercard(card):
    try:
        c = UserCards.get(UserCards.uuid == card["uuid"])
    except DoesNotExist as e:
        UserCards.create(uuid=card["uuid"], age=card['age'], sexe=card['sexe'], clusterdata={}, interests=card['interests'], likedgifts=card["likedgifts"])
        return card["uuid"]
    c.age = card["age"]
    c.sexe = card["sexe"]
    c.interests = card["interests"]
    c.likedgifts = card["likedgifts"]
    c.save()
    return card["uuid"]