#!/usr/bin/env python3

from peewee import DoesNotExist
from tools.db import needs_db
from models.db import UserCards


@needs_db
def searchuser(card):
    u = None
    if ("age" in card.keys()):
        if ("sexe" in card.keys()):
            if (("interests" in card.keys()) and (len(card["interests"]) > 0)):
                try:
                    u = UserCards.get((UserCards.age == card["age"]) )
                except DoesNotExist as e:
                    UserCards.create(uuid=card["uuid"], age=card['age'], sexe=card['sexe'], clusterdata={}, interests=card['interests'], likedgifts=card["likedgifts"])
                    return card["uuid"]
                


    # c.age = card["age"]
    # c.sexe = card["sexe"]
    # c.interests = card["interests"]
    # c.likedgifts = card["likedgifts"]
    # c.save()
    return card["uuid"]