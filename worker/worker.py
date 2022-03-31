#!/usr/bin/env python3

import sys
import signal
from threading import enumerate
from models.worker import Worker
from tools.db import validateDatabase
from tools.log import *


def signal_handler(sig, frame):
    for t in enumerate():
        if (not isinstance(t, Worker)):
            continue
        t.stop()


if __name__ == "__main__":
    if ((len(sys.argv) > 1) and (sys.argv[1] == "--ping")):
        print("pong")
        exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    validateDatabase()

    w = Worker(checks_delay=30, entries_nb=10)
    w.start()
