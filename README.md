# Setting up DEV environment

```sh
export JAVA_BUILDER_IMAGE="registry.access.redhat.com/redhat-openjdk-18/openjdk18-openshift:1.5"
export NODEJS_BUILDER_IMAGE="nodejs:12"
export DEV_PROJECT=gramola-dev

export DB_SERVICE_NAME=events-database
export DB_SERVICE_PORT=5432
export DB_NAME=events
export DB_USERNAME=events
export DB_PASSWORD=secret

export REGISTRY_USERNAME=<QUAY_USER>
export REGISTRY_PASSWORD=<QUAY_USER>
```

# Create development project in OpenShift

```sh
oc new-project ${DEV_PROJECT}
```

# Deploy PostgreSQL Database in DEV

```sh
oc new-app postgresql-persistent \
  -p DATABASE_SERVICE_NAME=${DB_SERVICE_NAME} \
  -p POSTGRESQL_USER=${DB_USERNAME} -p POSTGRESQL_PASSWORD=${DB_PASSWORD} \
  -p POSTGRESQL_DATABASE=${DB_NAME} \
  -n ${DEV_PROJECT}

oc label dc/${DB_SERVICE_NAME} app.kubernetes.io/part-of=gramola-app app.openshift.io/runtime=postgresql --overwrite -n ${DEV_PROJECT}
```

# Deploy Events API

> **NOTE:** Although we set quarkus profile to `test` with `-Dquarkus.profile=test` this just means that we don't want to recreate tables in the DEV environment we all share...

```sh
mvn clean package -Dquarkus.profile=test -DskipTests -f ./events

oc new-build ${JAVA_BUILDER_IMAGE} --binary --name=events -l app=gramola-app -n ${DEV_PROJECT}

oc start-build bc/events --from-file=./events/target/events-1.0.0-SNAPSHOT-runner.jar --follow -n ${DEV_PROJECT}

oc new-app events:latest -e DB_SERVICE_NAME=${DB_SERVICE_NAME} -e DB_SERVICE_PORT=${DB_SERVICE_PORT} -e DB_NAME=${DB_NAME} -e DB_USERNAME=${DB_USERNAME} -e DB_PASSWORD=${DB_PASSWORD} -n ${DEV_PROJECT} && \
oc expose svc/events -n ${DEV_PROJECT} && \
oc label dc/events app.kubernetes.io/part-of=gramola-app app.openshift.io/runtime=java --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/events app.openshift.io/vcs-uri=https://github.com/cvicens/gramola.git --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/events app.openshift.io/vcs-ref=master --overwrite -n ${DEV_PROJECT}
```
 
# Deploy Gateway

```sh
oc create secret docker-registry quay-registry \
  --docker-username=${REGISTRY_USERNAME} \
  --docker-password=${REGISTRY_PASSWORD} \
  --docker-server=quay.io -n ${DEV_PROJECT}

oc secrets link builder quay-registry --for=pull -n ${DEV_PROJECT}

oc new-build ${JAVA_BUILDER_IMAGE} --binary --name=gateway -l app=gramola-app \
  --push-secret='quay-registry' \
  --to=quay.io/cvicensa/gramola-gateway:latest --to-docker=true -n ${DEV_PROJECT}

mvn clean package -Dquarkus.profile=test -DskipTests -f ./gateway

oc start-build bc/gateway --from-file=./gateway/target/gateway-1.0.0-runner.jar --follow -n ${DEV_PROJECT}

oc import-image gateway:latest --from=quay.io/cvicensa/gramola-gateway:latest --confirm --scheduled=true -n ${DEV_PROJECT}

oc new-app gateway:latest --name gateway -n ${DEV_PROJECT} && \
oc expose svc/gateway -n ${DEV_PROJECT} && \
oc label dc/gateway app.kubernetes.io/part-of=gramola-app app.openshift.io/runtime=java --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/gateway app.openshift.io/vcs-uri=https://github.com/cvicens/gramola.git --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/gateway app.openshift.io/vcs-ref=master --overwrite -n ${DEV_PROJECT}
```

# Deploy Frontend

```sh
oc new-app -n ${DEV_PROJECT} ${NODEJS_BUILDER_IMAGE}~https://github.com/cvicens/gramola.git \
  --context-dir=frontend --name frontend && \
oc expose svc/frontend -n ${DEV_PROJECT} && \
oc label dc/frontend app.kubernetes.io/part-of=gramola-app app.openshift.io/runtime=nodejs --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/frontend app.openshift.io/vcs-uri=https://github.com/cvicens/gramola.git --overwrite -n ${DEV_PROJECT} && \
oc annotate dc/frontend app.openshift.io/vcs-ref=master --overwrite -n ${DEV_PROJECT}
```

# Connections in DEV

```sh
oc annotate dc/frontend app.openshift.io/connects-to=gateway --overwrite -n ${DEV_PROJECT}
oc annotate dc/gateway app.openshift.io/connects-to=events --overwrite -n ${DEV_PROJECT}
oc annotate dc/events app.openshift.io/connects-to='events-database,postgresql-persistent' --overwrite -n ${DEV_PROJECT}
```

# Deploy Jenkins

```sh
oc new-app jenkins-ephemeral -p MEMORY_LIMIT=3Gi -p JENKINS_IMAGE_STREAM_TAG=jenkins:2 -n ${DEV_PROJECT}
oc label dc/jenkins app.openshift.io/runtime=jenkins --overwrite -n ${DEV_PROJECT}
```

# Setting up TEST environment

```sh
export TEST_PROJECT=gramola-test
```

# Create TEST project in OpenShift

```sh
oc new-project ${TEST_PROJECT}
```

# Deploy PostgreSQL Database in TEST

```sh
oc new-app postgresql-persistent \
  -p DATABASE_SERVICE_NAME=${DB_SERVICE_NAME} \
  -p POSTGRESQL_USER=${DB_USERNAME} -p POSTGRESQL_PASSWORD=${DB_PASSWORD} \
  -p POSTGRESQL_DATABASE=${DB_NAME} \
  -n ${TEST_PROJECT}

oc label dc/${DB_SERVICE_NAME} app.kubernetes.io/part-of=gramola-app app.openshift.io/runtime=postgresql --overwrite -n ${TEST_PROJECT}
```

# Adjust permissions

```sh
oc policy add-role-to-user edit system:serviceaccount:${DEV_PROJECT}:jenkins -n ${TEST_PROJECT}
oc policy add-role-to-user view system:serviceaccount:${DEV_PROJECT}:jenkins -n ${TEST_PROJECT}

oc policy add-role-to-user system:image-puller system:serviceaccount:${TEST_PROJECT}:default -n ${DEV_PROJECT}
```

# Deploying pipelines

TODO
```sh
cat << EOF | oc -n ${DEV_PROJECT} apply -f -
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: jenkins-m2
  labels:
    app: jenkins
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: gp2
  volumeMode: Filesystem  
EOF
BAD: oc set volume bc/gramola-events-pipeline-complex --add --name=m2 --type=persistentVolumeClaim \
  --claim-name=jenkins-m2 --mount-path=/home/jenkins/.m2 --containers=jenkins -n ${DEV_PROJECT}
```

```sh
oc apply -n ${DEV_PROJECT} -f ./events/gramola-events-pipeline-complex.yaml
oc start-build bc/gramola-events-pipeline-complex -n ${DEV_PROJECT}

oc apply -n ${DEV_PROJECT} -f ./gateway/gramola-gateway-pipeline-complex.yaml
oc start-build bc/gramola-gateway-pipeline-complex -n ${DEV_PROJECT}

oc apply -n ${DEV_PROJECT} -f ./frontend/gramola-frontend-pipeline-complex.yaml
oc start-build bc/gramola-frontend-pipeline-complex -n ${DEV_PROJECT}
```

# Useful queries

```sh
psql -U $POSTGRESQL_USER $POSTGRESQL_DATABASE -c "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE';"

psql -U $POSTGRESQL_USER $POSTGRESQL_DATABASE -c 'select name from Event;'
```