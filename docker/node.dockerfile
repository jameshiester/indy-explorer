FROM bcgovimages/von-image:node-1.12-3

ADD scripts scripts/
ADD bin bin/

ADD --chown=indy:indy ./indy_config.py /etc/indy/
ADD --chown=indy:indy ./scripts ./scripts/
ADD --chown=indy:indy ./bin ./bin/