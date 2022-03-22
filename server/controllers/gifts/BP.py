#!/usr/bin/env python3

import base64
import json
from flask import Blueprint, request
from tools.db import needs_db
from controllers.gifts.save_cards import save_giftcard

from models.db import UserCards
from peewee import Case, Expression, SQL
from playhouse.postgres_ext import fn, ArrayField

giftsBP = Blueprint('giftsBP', __name__)

def __validate_cards_data(data):
    if ('cards' not in data.keys()) or not isinstance(data['cards'], list):
        return False
    for d in data['cards']:
        try:
            assert(isinstance(d, dict))
            assert(isinstance(d["uuid"], str))
            assert(isinstance(d["name"], str))
            assert(isinstance(d["description"], str))
            assert(isinstance(d["budget"], int))
            assert(isinstance(d["scope"], str))
            assert(isinstance(d["cluttering"], int))
            assert(isinstance(d["shortlived"], bool))
            assert(isinstance(d["categories"], list))
        except:
            return False
    return True


@giftsBP.route("/newcards", methods=["POST"])
@needs_db
def users_newcards():
    data = request.json
    updated = []
    failed = []
    if (not data or not __validate_cards_data(data)):
        return {"code": 400, "message": "Malformed JSON payload"}, 400
    for c in data['cards']:
        res = None
        try:
            res = save_giftcard(c)
        except Exception as e:
            failed.append(f"[{str(e)}]")
        if (res):
            updated.append(res)
    if (len(updated) != len(data['cards'])):
        return {"code": 400, "message": f"Not all cards could be updated: {', '.join(failed)}"}, 400
    return {"code": 200, "message": f"Updated cards: {', '.join(updated)}"}


def __get_cost(bage, bsexe, binterests):
    age = fn.ABS(UserCards.age - bage)
    sexe = (0 if UserCards.sexe == bsexe else 1)
    interests_less = Expression(SQL(f"cardinality(array(select unnest(ARRAY{binterests})"), "EXCEPT", Expression(fn.select(fn.UNNEST(UserCards.interests.cast("text[]"))), "", SQL('))')))
    interests_more = Expression(SQL("cardinality(array("), "", Expression(fn.select(fn.UNNEST(UserCards.interests.cast("text[]"))), "EXCEPT", SQL(f"select unnest(ARRAY{binterests})))")))
    res = age + sexe + interests_less + interests_more
    return res

@giftsBP.route("/searchfor", methods=["GET"])
@needs_db
def users_searchfor():
    usercard = None
    try:
        usercard = json.loads(base64.urlsafe_b64decode(request.args["usercard"]))
    except:
        return {"code": 400, "message": "Invalid usercard argument."}, 400
    if not usercard:
        return {"code": 400, "message": "Invalid usercard argument."}, 400


    cost = __get_cost(usercard["age"], usercard["sexe"], usercard["interests"])
    query = UserCards.select(UserCards.age, cost.alias('cost')).order_by(cost)
    for q in query.dicts():
        print(q)
    return usercard