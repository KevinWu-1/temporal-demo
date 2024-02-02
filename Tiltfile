# -*- mode: Python -*-

# NOTE: Currently Tilt does not support building images via URL when using docker-compose.
local("docker build -t temporalite https://github.com/temporalio/temporalite.git#main")

docker_compose("docker-compose.yaml")