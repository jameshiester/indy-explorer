# Indy Explorer

This project contains a web api and user interface to explore a Hyperledger Indy network.

### Prerequisites

If you are running locally, you must have git, docker and a bash terminal. On Windows, when you install git, the git-bash terminal is installed and you can use that.

To try this in a browser, go to Play With Docker, login (requires a Docker Hub ID) and click the "+ ADD NEW INSTANCE` link (left side). That opens a terminal session that you can use to run these steps.

The rest of the steps assume you are in your bash terminal in a folder where GitHub repos can be cloned.

### How to Run

- git clone git push -u origin master
- cd indy-explorer
- npm install -g lerna
- lerna bootstrap
- ./manage build
- ./manage start
