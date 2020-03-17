#!/bin/sh

. ./settings.sh

s2i build https://github.com/cvicens/gramola#master registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift --context-dir=events ${EVENTS_IMAGE}
docker tag ${EVENTS_IMAGE} quay.io/${USERNAME}/${EVENTS_IMAGE}
docker push quay.io/${USERNAME}/${EVENTS_IMAGE}

s2i build https://github.com/cvicens/gramola#master registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift --context-dir=gateway ${GATEWAY_IMAGE}
docker tag ${GATEWAY_IMAGE} quay.io/${USERNAME}/${GATEWAY_IMAGE}
docker push quay.io/${USERNAME}/${GATEWAY_IMAGE}


#docker logs $(docker ps | grep registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift | awk -F ' ' '{print $1}')

