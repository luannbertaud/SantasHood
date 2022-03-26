#!/usr/bin/env python3

from uuid import uuid4 as guuid
from threading import Thread, Event
from computation.clusters import create_relations
from controllers.giftcards import refresh_gifts_clusters
from controllers.usercards import refresh_users_clusters
from controllers.state import save_state, wait_for_entries
from tools.db import validateDatabase
from tools.log import *


class Worker(Thread):

    def __init__(self, *args, entries_nb=10, checks_delay=30, **kwargs):
        self._stop = Event()
        self.checks_delay = checks_delay
        self.entries_nb = entries_nb
        kwargs['target'] = self.runner
        super().__init__(*args, **kwargs)

    def stop(self):
        logger.warning(f"Exiting worker [{self.name}]..")
        self._stop.set()

    def runner(self, *args, **kwargs):
        logger.warning(f"Starting worker [{self.name}] with parameters entries_nb={self.entries_nb}, checks_delay={self.checks_delay}..")
        while (not self._stop.is_set()):
            self.__run()
            wait_for_entries(entries_nb=self.entries_nb, checks_delay=self.checks_delay, waiter=self._stop.wait, break_flag=self._stop)

    def __run(self):
        logger.warning("=> Worker run triggered.")
        validateDatabase()
        logger.info("Valid database, starting worker ..")

        logger.info("<<<< Updating all clusters >>>>")
        
        runID = str(guuid())
        logger.info(f"RunID is {runID}.")
        refresh_gifts_clusters(runID)
        refresh_users_clusters(runID)
        logger.info("Saving relations between clusters..")
        create_relations(runID)
        logger.info("OK")
        logger_waiting.info("Saving state..")
        save_state(runID)
        logger_finished.info("..OK")

        logger.info("<<<< All clusters updated >>>>")