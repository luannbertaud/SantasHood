#!/usr/bin/env python3

from flask import Blueprint, request
from tools.db import needs_db
from controllers.users.save_cards import save_usercard

usersBP = Blueprint('usersBP', __name__)

def __validate_cards_data(data):
    if ('cards' not in data.keys()) or not isinstance(data['cards'], list):
        return False
    for d in data['cards']:
        try:
            assert(isinstance(d, dict))
            assert(isinstance(d["uuid"], str))
            assert(isinstance(d["age"], int))
            assert(isinstance(d["sexe"], str))
            assert(isinstance(d["interests"], list))
            assert(isinstance(d["likedgifts"], list))
        except:
            return False
    return True


@usersBP.route("/newcards", methods=["POST"])
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
            res = save_usercard(c)
        except Exception as e:
            failed.append(f"[{str(e)}]")
        if (res):
            updated.append(res)
    if (len(updated) != len(data['cards'])):
        return {"code": 400, "message": f"Not all cards could be updated: {', '.join(failed)}"}, 400
    return {"code": 200, "message": f"Updated cards: {', '.join(updated)}"}
