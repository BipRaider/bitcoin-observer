#!/bin/sh
# The name from https://hub.docker.com/
docker=bipus

# Apps servieses
api=api
client=client

servicesList="$client $api"

for server in $servicesList; do
  echo ["Need to build $server server? [y\n]"]
  read build
  if [ "${build}" == "y" ]; then
    echo [Build the $server latest]:
    docker build -t $docker/$server ./$server
    echo [Push the $server latest]:
    docker push $docker/$server
  fi
done

echo [List all images]:
docker images --filter=reference="$docker/*"