#!/usr/bin/env python3

from peewee import InterfaceError
import psycopg2 as __driver
from packaging import version as __version
import models.db_globals as __DBglobals
from models.db import DBdata
from tools.log import *


def __ensureVersionSystem():
    try:
        if ("dbdata" not in __DBglobals.db.get_tables()):
            return False
        if not DBdata.table_exists():
            return False
        query = DBdata.select()
        if (len(query) <= 0):
            return False
    except InterfaceError:
        raise Exception("Can't find DBdata table for Database version verification.")
    return True


def validateDatabase():

    # Creating database if it does not already exist
    try:
        co = __driver.connect(host=__DBglobals.DATABASE_PARAMS["host"], port=__DBglobals.DATABASE_PARAMS["port"], user=__DBglobals.DATABASE_PARAMS["user"], password=__DBglobals.DATABASE_PARAMS["password"])
    except Exception as e:
        logger.error(f"Error: {e}")
        return False
    co.autocommit = True
    curs = co.cursor()
    try:
        curs.execute(f'SELECT datname FROM pg_database')
        databases = [d for (d,) in curs.fetchall()]
        if __DBglobals.DATABASE_PARAMS["name"].lower() not in databases:
            raise Exception(f"Can't find database {__DBglobals.DATABASE_PARAMS['name'].lower()}.")
    except Exception as e:
        logger.error(f"Connecting to database: {e}")
        exit(84)
    co.close()


    # Open connection to the database and migrate if needed

    if (not hasattr(__DBglobals, "db")) or (not __DBglobals.db):
        __DBglobals.init()
    try:
        __ensureVersionSystem()
    except Exception or InterfaceError as e:
        __DBglobals.init()
        if (not __ensureVersionSystem()):
            logger.error(f"Connecting to database: {e}")
            exit(84)

    vers = DBdata.get()
    if (__version.parse(vers.version) != __version.parse(__DBglobals.WORKER_VERSION)):
        raise Exception("Worker and Database version mismatch. Please update this worker.")
    return True
