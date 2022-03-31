#!/usr/bin/env bash

EXEC_PATH=$(cd $(dirname "$0") && pwd)

echo "-> Executing directory is [$EXEC_PATH]"

if [[ "$WORKER_PING_ONLY" == true ]] ; 
then
    python3 worker.py --ping
else
    python3 worker.py
fi