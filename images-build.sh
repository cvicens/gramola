#!/bin/sh

. ./settings.sh

docker pull ${QUARKUS_BUILDER_IMAGE}
docker pull ${NODEJS_BUILDER_IMAGE}

s2i build ${GIT_REPO_URL} ${QUARKUS_BUILDER_IMAGE} --context-dir=${EVENTS_CONTEXT_DIR} ${EVENTS_IMAGE}
docker tag ${EVENTS_IMAGE} quay.io/${USERNAME}/${EVENTS_IMAGE}
docker push quay.io/${USERNAME}/${EVENTS_IMAGE}

s2i build ${GIT_REPO_URL} ${QUARKUS_BUILDER_IMAGE} --context-dir=${GATEWAY_CONTEXT_DIR} ${GATEWAY_IMAGE}
docker tag ${GATEWAY_IMAGE} quay.io/${USERNAME}/${GATEWAY_IMAGE}
docker push quay.io/${USERNAME}/${GATEWAY_IMAGE}

s2i build ${GIT_REPO_URL} ${NODEJS_BUILDER_IMAGE} --context-dir=${FRONTEND_CONTEXT_DIR} ${FRONTEND_IMAGE}
docker tag ${FRONTEND_IMAGE} quay.io/${USERNAME}/${FRONTEND_IMAGE}
docker push quay.io/${USERNAME}/${FRONTEND_IMAGE}

#docker logs $(docker ps | grep ${QUARKUS_BUILDER_IMAGE} | awk -F ' ' '{print $1}')

