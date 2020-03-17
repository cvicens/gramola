#!/bin/sh

export GIT_REPO_URL="https://github.com/cvicens/gramola#master"

export EVENTS_VERSION=0.0.1
export EVENTS_CONTEXT_DIR="events"
export EVENTS_SERVICE_NAME="gramola-events"
export EVENTS_IMAGE=${EVENTS_SERVICE_NAME}:${EVENTS_VERSION}

export GATEWAY_VERSION=0.0.1
export GATEWAY_CONTEXT_DIR="gateway"
export GATEWAY_SERVICE_NAME="gramola-gateway"
export GATEWAY_IMAGE=${GATEWAY_SERVICE_NAME}:${GATEWAY_VERSION}

export USERNAME=<USERNAME>

