#!/usr/bin/env python3

import base64
import json
from flask import Blueprint, request
from peewee import Expression, SQL, DoesNotExist
from playhouse.postgres_ext import fn
from playhouse.shortcuts import model_to_dict
from tools.db import needs_db
from models.db import GiftCards, UserCards, ClustersRelations
from controllers.gifts.save_cards import save_giftcard


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
def users_searchfor(): # TODO error handling try / excepts
    usercard = None
    page = request.args.get("page", 0, type=int)
    gpp = request.args.get("gpp", 10, type=int)
    uts = request.args.get("uts", 1, type=int)
    interesting_gift_clusters = []
    gift_clusters_scores = {}
    res_gifts = None
    res = []

    if (page < 0):
        page = 0
    if (gpp < 1):
        gpp = 10
    if (uts < 1):
        uts = 1
    try:
        usercard = json.loads(base64.urlsafe_b64decode(request.args["usercard"]))
    except:
        return {"code": 400, "message": "Invalid usercard argument."}, 400
    if not usercard:
        return {"code": 400, "message": "Invalid usercard argument."}, 400

    cost = __get_cost(usercard["age"], usercard["sexe"], usercard["interests"])
    users = UserCards.select(UserCards.clusterdata, cost.alias('cost')).order_by(cost).paginate(0, uts)

    users_clusters = [u.clusterdata["cluster"] for u in users]
    print(users_clusters)

    for i in range(len(users_clusters)):
        rls = ClustersRelations.select().where(ClustersRelations.usercluster.cast("INT") == users_clusters[i])
        for rl in rls:
            interesting_gift_clusters += list(rl.giftclusters) * (len(users_clusters)-i)

    for c in interesting_gift_clusters:
        gift_clusters_scores[c] = interesting_gift_clusters.count(c) / len(interesting_gift_clusters)
    s_gift_clusters_scores = {k: v for k, v in sorted(gift_clusters_scores.items(), key=lambda item: item[1], reverse=True)}
    print(s_gift_clusters_scores)

    for k in list(s_gift_clusters_scores.keys()):
        gifts = None
        try:
            gifts = GiftCards.select().where(GiftCards.clusterdata["cluster"].cast("INT") == k)
        except DoesNotExist:
            continue
        if (not res_gifts):
            res_gifts = gifts
        else:
            res_gifts += gifts
        if (len(res_gifts) >= (page*gpp)+gpp):
            break
    res_gifts = res_gifts[page*gpp:(page**gpp)+gpp]
    res = [model_to_dict(g) for g in res_gifts]
    return {"code": 200, "data": res}