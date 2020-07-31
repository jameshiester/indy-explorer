FROM bcgovimages/von-image:node-1.12-3

USER root
RUN apt-get update && \
      apt-get -y install sudo
RUN sudo apt-get install -y git cmake gcc build-essential curl python
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
ENV NODE_VERSION=12.6.0
ENV NVM_DIR="$HOME/.nvm"
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="$HOME/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version
ENV NODE_ENV="production"
ENV LOG_LEVEL ${LOG_LEVEL:-info}
ENV RUST_LOG ${RUST_LOG:-warning}
RUN npm install -g node-gyp

ADD packages/model/build packages/model/build/
COPY packages/model/package.json packages/model/package.json
ADD scripts scripts/
ADD bin bin/
COPY packages/server/package.json packages/server/package.json
ADD packages/server/build packages/server/build/
RUN cd ./packages/server && npm install --production

USER indy

ADD --chown=indy:indy ./indy_config.py /etc/indy/
ADD --chown=indy:indy ./scripts ./scripts/
ADD --chown=indy:indy ./bin ./bin/
