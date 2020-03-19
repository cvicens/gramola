#!/bin/sh

export GIT_REPO_URL="https://github.com/cvicens/gramola#master"

export EVENTS_DATABASE_SERVICE_NAME="events-database"
export EVENTS_DATABASE_SERVICE_PORT="5432"
export EVENTS_DATABASE_NAME="eventsdb"
export EVENTS_DATABASE_USERNAME="luke"
export EVENTS_DATABASE_PASSWORD="secret"

export EVENTS_VERSION=0.0.1
export EVENTS_CONTEXT_DIR="events"
export EVENTS_SERVICE_NAME="events"
export EVENTS_IMAGE=${EVENTS_SERVICE_NAME}:${EVENTS_VERSION}

export GATEWAY_VERSION=0.0.1
export GATEWAY_CONTEXT_DIR="gateway"
export GATEWAY_SERVICE_NAME="gateway"
export GATEWAY_IMAGE=${GATEWAY_SERVICE_NAME}:${GATEWAY_VERSION}

export FRONTEND_VERSION=0.0.1
export FRONTEND_CONTEXT_DIR="frontend"
export FRONTEND_SERVICE_NAME="frontend"
export FRONTEND_IMAGE=${FRONTEND_SERVICE_NAME}:${FRONTEND_VERSION}

export QUARKUS_BUILDER_IMAGE="registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift"
#export QUARKUS_BUILDER_IMAGE="registry.redhat.io/openjdk/openjdk-11-rhel7:latest"
#export QUARKUS_BUILDER_IMAGE="quay.io/quarkus/ubi-quarkus-native-s2i:19.3.1-java11"
export QUARKUS_IMAGESTREAM="redhat-openjdk-18/openjdk18-openshift"

export NODEJS_BUILDER_IMAGE="registry.redhat.io/rhel8/nodejs-12:latest"
export NODEJS_IMAGESTREAM="nodejs:10"

export USERNAME=cvicensa

