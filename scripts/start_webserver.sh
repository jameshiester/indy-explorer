#!/bin/bash

set -e

if [ ! -z "${GENESIS_URL}" ]; then
    curl $GENESIS_URL -o "genesis.txn"
    indy-vdr-proxy -g genesis.txn -p 4000 &
elif [ -f "/home/indy/ledger/sandbox/pool_transactions_genesis" ]; then
    indy-vdr-proxy -g /home/indy/ledger/sandbox/pool_transactions_genesis -p 4000 &
else
    echo "NO GENESIS FILE FOUND"
fi

node packages/server/build/index.js
