#!/usr/bin/env python3

import logging

__logging_level = logging.DEBUG

logging.getLogger("peewee").setLevel(logging.ERROR)

logger = logging.getLogger("SHWorker")
logger.setLevel(__logging_level)
logger_ch = logging.StreamHandler()
logger_ch.setLevel(__logging_level)
logger_form = logging.Formatter('%(asctime)s %(levelname)s: %(message)s', datefmt='%d/%m/%Y %H:%M:%S')
logger_ch.setFormatter(logger_form)
logger.addHandler(logger_ch)

logger_waiting = logging.getLogger("SHWorker_Waiting")
logger_waiting.setLevel(__logging_level)
logger_waiting_ch = logging.StreamHandler()
logger_waiting_ch.setLevel(__logging_level)
logger_waiting_ch.terminator = ""
logger_waiting_form = logging.Formatter('%(asctime)s %(levelname)s: %(message)s', datefmt='%d/%m/%Y %H:%M:%S')
logger_waiting_ch.setFormatter(logger_waiting_form)
logger_waiting.addHandler(logger_waiting_ch)

logger_finished = logging.getLogger("SHWorker_Finished")
logger_finished.setLevel(__logging_level)
logger_finished_ch = logging.StreamHandler()
logger_finished_ch.setLevel(__logging_level)
logger_finished_form = logging.Formatter('%(message)s')
logger_finished_ch.setFormatter(logger_finished_form)
logger_finished.addHandler(logger_finished_ch)