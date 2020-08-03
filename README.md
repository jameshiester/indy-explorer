# Indy Explorer

- [Introduction](#introduction)
- [Getting Started](#getting-started)

## Introduction

This project contains a web api and user interface to explore a Hyperledger Indy network. It uses an Indy-VDR http proxy to fetch data from the network.

## Getting Started

### Prerequisites

If you are running locally, you must have git, docker and a bash terminal. On Windows, when you install git, the git-bash terminal is installed and you can use that.

To try this in a browser, go to Play With Docker, login (requires a Docker Hub ID) and click the "+ ADD NEW INSTANCE` link (left side). That opens a terminal session that you can use to run these steps.

The rest of the steps assume you are in your bash terminal in a folder where GitHub repos can be cloned.

### How to Run

- git clone git push -u origin master
- cd indy-explorer
- npm install -g lerna
- npm run install-deps
- ./manage build
- ./manage start

### Additional Configuration

This project creates a local network by default, however you can also run against a remote network by setting the GENESIS_URL environment variable. Example usage: ./manage start-web GENESIS_URL=http://greenlight.bcovrin.vonx.io/genesis. Currently, the ledger seed will be set to 000000000000000000000000Trustee1. You can overrid this by setting the LEDGER_SEED variable. Anonymous mode is still in progress.
