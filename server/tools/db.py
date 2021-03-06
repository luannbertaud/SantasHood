#!/usr/bin/env python3

from controllers.hood_db import validateDatabase
from functools import wraps

def needs_db(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not validateDatabase():
            raise Exception("Can't validate database")
        return func(*args, **kwargs)
    return wrapper

